import { useEffect, useState } from "react"
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
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CleanupPageProps {
  isOpen: boolean
  cleanupType: string | null
  onClose: () => void
}

const cleanupDetails: Record<string, {
  icon: typeof Trash2
  title: string
  description: string
  warning: string
}> = {
  personal: {
    icon: MessageSquare,
    title: "Clean Personal Messages",
    description: "This will delete all direct messages with other users. Your chat history will be permanently removed.",
    warning: "All your personal conversations will be deleted!",
  },
  bots: {
    icon: Bot,
    title: "Clean Bot Conversations",
    description: "This will delete all conversations with bots. Any saved data in bot chats will be lost.",
    warning: "All bot conversations will be deleted!",
  },
  telegram: {
    icon: Send,
    title: "Clean Telegram Service Chats",
    description: "This will delete all Telegram service chats including notifications and updates from Telegram.",
    warning: "All Telegram service chats will be deleted!",
  },
  spambot: {
    icon: AlertCircle,
    title: "Clean @spambot Conversations",
    description: "This will delete your conversations with @spambot including any spam reports you have made.",
    warning: "Your spambot chat history will be deleted!",
  },
  my_messages: {
    icon: Mail,
    title: "Delete Your Messages from Groups",
    description: "This will delete all messages you have sent in groups. Other members will no longer see your messages.",
    warning: "All your messages in groups will be deleted!",
  },
  channels: {
    icon: LogOut,
    title: "Leave All Channels",
    description: "This will leave all channels you are subscribed to. You will stop receiving updates from these channels.",
    warning: "You will leave all channels!",
  },
  groups: {
    icon: Users,
    title: "Leave All Groups",
    description: "This will leave all groups you are a member of. You will lose access to group chats and files.",
    warning: "You will leave all groups!",
  },
  owned_groups: {
    icon: Trash2,
    title: "Delete Owned Groups",
    description: "This will permanently delete all groups you own. All members will lose access and all data will be lost.",
    warning: "All groups you own will be permanently deleted!",
  },
  owned_channels: {
    icon: Radio,
    title: "Delete Owned Channels",
    description: "This will permanently delete all channels you own. All subscribers will lose access and all content will be lost.",
    warning: "All channels you own will be permanently deleted!",
  },
  all: {
    icon: Flame,
    title: "Clean Everything",
    description: "This will perform all cleanup actions above. Your entire Telegram data will be wiped clean.",
    warning: "ALL your Telegram data will be permanently deleted!",
  },
}

export function CleanupPage({ isOpen, cleanupType, onClose }: CleanupPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [confirmText, setConfirmText] = useState("")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setConfirmText("")
      setIsProcessing(false)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!cleanupType || !cleanupDetails[cleanupType]) return null

  const details = cleanupDetails[cleanupType]
  const Icon = details.icon
  const isConfirmValid = confirmText.toLowerCase() === "delete"

  const handleCleanup = () => {
    if (!isConfirmValid) return
    setIsProcessing(true)
    // Simulate cleanup process
    setTimeout(() => {
      setIsProcessing(false)
      onClose()
    }, 2000)
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
      <div className="p-6 space-y-6">
        {/* Icon and Title */}
        <div className="flex flex-col items-center text-center">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-4",
            cleanupType === "all" ? "bg-destructive/20" : "bg-destructive/10"
          )}>
            <Icon className={cn(
              "h-10 w-10",
              cleanupType === "all" ? "text-destructive" : "text-destructive/80"
            )} />
          </div>
          <h2 className="text-xl font-bold text-foreground">{details.title}</h2>
        </div>

        {/* Description */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {details.description}
          </p>
        </div>

        {/* Warning */}
        <div className="bg-destructive/10 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-destructive font-semibold text-sm">Warning</p>
            <p className="text-destructive/80 text-sm mt-1">{details.warning}</p>
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground block">
            Type <span className="text-destructive font-bold">DELETE</span> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE here"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:border-destructive transition-colors"
            disabled={isProcessing}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCleanup}
            disabled={!isConfirmValid || isProcessing}
            className={cn(
              "flex-1 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2",
              isConfirmValid && !isProcessing
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-destructive/30 text-destructive-foreground/50 cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Trash2 className="h-5 w-5" />
                Clean Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
