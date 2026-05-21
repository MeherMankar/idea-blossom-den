import { useEffect } from "react"
import {
  ArrowLeft,
  Trash2,
  MessageSquare,
  Bot,
  Send,
  AlertCircle,
  Mail,
  LogOut,
  Users,
  Radio,
  Flame,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CleanupPageProps {
  isOpen: boolean
  onClose: () => void
}

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

export function CleanupPage({ isOpen, onClose }: CleanupPageProps) {
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

  const handleCleanupAction = (type: string) => {
    // Handle cleanup action - this would trigger the actual cleanup
    console.log(`Cleanup action triggered: ${type}`)
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-background transition-transform duration-300 ease-in-out max-w-md mx-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary px-4 py-4 flex items-center gap-4">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-primary-foreground">Cleanup</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col h-[calc(100%-64px)]">
        {/* Question Header */}
        <div className="px-4 py-4 border-b border-border/50">
          <p className="text-base font-semibold text-foreground flex items-center gap-3">
            <Trash2 className="h-5 w-5 text-destructive" />
            What would you like to clean?
          </p>
        </div>

        {/* Cleanup Items List */}
        <div className="flex-1 overflow-y-auto">
          <ul role="list">
            {cleanupItems.map(({ icon: Icon, label, description }) => (
              <li key={label} className="border-b border-border/30">
                <button
                  onClick={() => handleCleanupAction(label)}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-secondary/50 transition-colors group active:bg-secondary/70"
                >
                  <Icon className={cn(
                    "h-6 w-6 transition-colors flex-shrink-0",
                    label === "all" ? "text-destructive" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <div className="flex-1 text-left">
                    <span className={cn(
                      "text-[15px] font-semibold block",
                      label === "all" ? "text-destructive" : "text-foreground"
                    )}>{label}</span>
                    <span className="text-[13px] text-muted-foreground">{description}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning Footer */}
        <div className="px-4 py-4 border-t border-border/50 bg-card">
          <div className="flex items-center gap-3 px-4 py-3 bg-destructive/10 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive font-medium">
              These actions cannot be undone!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
