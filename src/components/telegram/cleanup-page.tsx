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
      style={{ zIndex: 70 }}
      className={cn(
        "fixed top-0 right-0 h-screen w-full max-w-md bg-[#17212b] flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-3 bg-[#17212b] border-b border-white/10">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-medium text-white">Cleanup</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Question Header */}
        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-base font-semibold text-white flex items-center gap-3">
            <Trash2 className="h-5 w-5 text-[#2AABEE]" />
            What would you like to clean?
          </p>
        </div>

        {/* Cleanup Items List */}
        <div className="flex-1">
          <ul role="list">
            {cleanupItems.map(({ icon: Icon, label, description }) => (
              <li key={label} className="border-b border-white/10">
                <button
                  onClick={() => handleCleanupAction(label)}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors group"
                >
                  <Icon className="h-6 w-6 text-[#2AABEE] transition-colors flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <span className="text-[15px] font-semibold block text-white">{label}</span>
                    <span className="text-[13px] text-gray-400">{description}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning Footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#2AABEE]/10 border border-[#2AABEE]/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-[#2AABEE] flex-shrink-0" />
            <p className="text-sm text-[#2AABEE] font-medium">
              These actions cannot be undone!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
