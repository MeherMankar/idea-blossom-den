
import { useEffect } from "react"
import {
  X,
  UserCircle2,
  Users,
  BookMarked,
  Phone,
  Settings,
  Megaphone,
  Plus,
  Wallet,
  Folder,
  Shield,
  Skull,
  Trash2,
  MessageSquare,
  Bot,
  Send,
  AlertCircle,
  Mail,
  LogOut,
  Radio,
  Flame,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onProfileClick: () => void
  onAddAccountClick: () => void
  onSettingsClick: () => void
  onContactsClick: () => void
  onProtectionManagerClick: () => void
  onSpamMasterClick: () => void
  onCleanupClick: (cleanupType: string) => void
}

const navItems = [
  { icon: Plus, label: "Add Account", badge: null },
  { icon: UserCircle2, label: "My Profile", badge: null },
  { icon: Wallet, label: "Wallet", badge: null },
  { icon: Users, label: "New Group", badge: null },
  { icon: Megaphone, label: "New Channel", badge: null },
  { icon: UserCircle2, label: "Contacts", badge: null },
  { icon: Folder, label: "Chat Folders", badge: null },
  { icon: BookMarked, label: "Saved Messages", badge: null },
  { icon: Phone, label: "Calls", badge: null },
  { icon: Settings, label: "Settings", badge: null },
  { icon: Shield, label: "Protection Manager", badge: null },
  { icon: Skull, label: "Spam Master", badge: null },
]

const cleanupItems = [
  { icon: MessageSquare, label: "personal", description: "Direct messages with users" },
  { icon: Bot, label: "bots", description: "Conversations with bots" },
  { icon: Send, label: "telegram", description: "Telegram service chats" },
  { icon: AlertCircle, label: "spambot", description: "@spambot conversations" },
  { icon: Mail, label: "my_messages", description: "Delete your sent messages from groups" },
  { icon: LogOut, label: "channels", description: "Leave all channels" },
  { icon: Users, label: "groups", description: "Leave all groups" },
  { icon: Trash2, label: "owned_groups", description: "Delete groups you own" },
  { icon: Radio, label: "owned_channels", description: "Delete channels you own" },
  { icon: Flame, label: "all", description: "Everything above" },
]

export function Sidebar({ isOpen, onClose, onProfileClick, onAddAccountClick, onSettingsClick, onContactsClick, onProtectionManagerClick, onSpamMasterClick, onCleanupClick }: SidebarProps) {
  const { profile } = useUser()

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/70 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      {/* Drawer - Overlaps Content */}
      <aside
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-80 flex flex-col bg-card text-card-foreground shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Profile Header */}
        <div className="relative bg-primary px-6 pt-8 pb-6">
          {/* Close button - X icon */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-5 right-5 p-1 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-3xl font-bold text-white mb-4 flex-shrink-0 overflow-hidden">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{profile.name.charAt(0)}</span>
            )}
          </div>

          {/* User info */}
          <p className="font-semibold text-primary-foreground text-lg leading-tight">{profile.name}</p>
          <p className="text-primary-foreground/70 text-sm mt-1">{profile.username}</p>

          {/* Online status */}
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-primary-foreground/70">Online</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-1">
          <ul role="list">
            {navItems.map(({ icon: Icon, label, badge }) => (
              <li key={label}>
                <button
                  onClick={() => {
                    if (label === "My Profile") {
                      onClose()
                      onProfileClick()
                    } else if (label === "Add Account") {
                      onClose()
                      onAddAccountClick()
                    } else if (label === "Settings") {
                      onClose()
                      onSettingsClick()
                    } else if (label === "Contacts") {
                      onClose()
                      onContactsClick()
                    } else if (label === "Protection Manager") {
                      onClose()
                      onProtectionManagerClick()
                    } else if (label === "Spam Master") {
                      onClose()
                      onSpamMasterClick()
                    }
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-secondary/50 transition-colors group active:bg-secondary/70"
                >
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                  <span className="flex-1 text-left text-[15px] text-foreground font-medium">{label}</span>
                  {badge && (
                    <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Cleanup Section */}
          <div className="mt-4 border-t border-border/50 pt-4">
            <div className="px-6 pb-3">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-destructive" />
                What would you like to clean?
              </p>
            </div>
            <ul role="list">
              {cleanupItems.map(({ icon: Icon, label, description }) => (
                <li key={label}>
                  <button
                    onClick={() => {
                      onClose()
                      onCleanupClick(label)
                    }}
                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-destructive/10 transition-colors group active:bg-destructive/20"
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors flex-shrink-0",
                      label === "all" ? "text-destructive" : "text-muted-foreground group-hover:text-destructive"
                    )} />
                    <div className="flex-1 text-left">
                      <span className={cn(
                        "text-[14px] font-medium block",
                        label === "all" ? "text-destructive" : "text-foreground"
                      )}>{label}</span>
                      <span className="text-[12px] text-muted-foreground">{description}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-6 py-3 mt-2 mx-4 bg-destructive/10 rounded-lg">
              <p className="text-xs text-destructive font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                These actions cannot be undone!
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
