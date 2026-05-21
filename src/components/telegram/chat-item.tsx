
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VolumeX, Pin, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"

interface ChatItemProps {
  id: string
  avatar: string
  name: string
  preview: string
  time: string
  unreadCount?: number
  isMuted?: boolean
  isPinned?: boolean
  isRead?: boolean
  senderPrefix?: string
  avatarColor?: string
}

function formatUnreadCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export function ChatItem({
  id,
  avatar,
  name,
  preview,
  time,
  unreadCount,
  isMuted = false,
  isPinned = false,
  isRead = false,
  senderPrefix,
  avatarColor = "bg-primary",
}: ChatItemProps) {
  return (
    <Link to="/chat/$chatId" params={{ chatId: id }} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 cursor-pointer transition-colors">
      <Avatar className="h-12 w-12 shrink-0">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className={cn(avatarColor, "text-primary-foreground font-medium")}>
          {name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-medium text-foreground truncate">{name}</span>
            {isMuted && (
              <VolumeX className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {isRead && !unreadCount && (
              <CheckCheck className="h-4 w-4 text-sky-400" />
            )}
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-sm text-muted-foreground truncate">
            {senderPrefix && (
              <span className="text-primary">{senderPrefix}: </span>
            )}
            {preview}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {isPinned && !unreadCount && (
              <Pin className="h-4 w-4 text-muted-foreground" />
            )}
            {unreadCount && unreadCount > 0 && (
              <span
                className={cn(
                  "min-w-[22px] h-[22px] rounded-full text-xs font-medium flex items-center justify-center px-1.5",
                  isMuted
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {formatUnreadCount(unreadCount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
