import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { ArrowLeft, Search, MoreVertical, Smile, Paperclip, Mic, Play, Download, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { chats, chatMessages } from "@/lib/mock-data"
import { ContactProfilePage } from "@/components/telegram/contact-profile-page"

export const Route = createFileRoute("/chat/$chatId")({
  component: ChatPage,
})

function ChatPage() {
  const { chatId } = Route.useParams()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const chat = chats.find((c) => c.id === chatId)
  const messages = chatMessages[chatId] ?? []

  if (!chat) {
    return (
      <div className="dark">
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <button onClick={() => navigate({ to: "/" })} className="text-primary">Back to chats</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative flex flex-col">
        <ContactProfilePage isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} chat={chat} />

        {/* Header */}
        <div className="sticky top-0 z-30 flex items-center gap-3 px-2 py-2 bg-card/95 backdrop-blur border-b border-border/40">
          <button onClick={() => navigate({ to: "/" })} aria-label="Back" className="p-1.5 text-foreground">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-3 flex-1 min-w-0 text-left"
          >
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shrink-0", chat.avatarColor ?? "bg-primary")}>
              {chat.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-foreground truncate">{chat.name}</p>
              <p className="text-xs text-muted-foreground truncate">{chat.lastSeen ?? "last seen recently"}</p>
            </div>
          </button>
          <button aria-label="Search" className="p-2 text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="More" className="p-2 text-foreground">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 px-3 py-4 space-y-2 bg-[oklch(0.18_0.02_260)] relative overflow-hidden">
          {messages.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-10">No messages yet</p>
          )}
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {/* Scroll-to-bottom button */}
          <button className="fixed bottom-20 right-4 md:right-[calc(50%-13rem)] w-10 h-10 rounded-full bg-card border border-border/40 flex items-center justify-center text-muted-foreground shadow-lg">
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>

        {/* Input bar */}
        <div className="sticky bottom-0 z-30 bg-card border-t border-border/40 px-2 py-2 flex items-center gap-2">
          <button className="p-2 text-muted-foreground">
            <Smile className="h-6 w-6" />
          </button>
          <input
            type="text"
            placeholder="Message"
            className="flex-1 bg-transparent text-foreground text-[15px] outline-none placeholder:text-muted-foreground py-2"
          />
          <button className="p-2 text-muted-foreground">
            <Paperclip className="h-6 w-6" />
          </button>
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message: m }: { message: import("@/lib/mock-data").ChatMessage }) {
  const outgoing = m.isOutgoing
  return (
    <div className={cn("flex", outgoing ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl overflow-hidden",
          outgoing ? "bg-sky-600 text-white rounded-br-md" : "bg-card text-foreground rounded-bl-md"
        )}
      >
        {m.type === "image" && (
          <div className="w-64 h-72 bg-gradient-to-br from-stone-600 to-stone-800 relative">
            <div className="absolute bottom-1.5 right-2 flex items-center gap-1 text-[11px] text-white bg-black/40 px-1.5 py-0.5 rounded">
              {m.time}
              <svg viewBox="0 0 16 16" className="h-3 w-3"><path fill="currentColor" d="M2 8l3 3 4-5M7 11l3-5"/></svg>
            </div>
          </div>
        )}
        {m.type === "video" && (
          <div className="w-64 h-80 bg-gradient-to-br from-emerald-700 to-emerald-900 relative flex items-center justify-center border-2 border-primary/60 rounded-2xl">
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              <Download className="h-3.5 w-3.5" />
              <div className="flex flex-col leading-tight">
                <span>{m.videoDuration}</span>
                <span className="text-[10px] opacity-80">{m.videoSize}</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center">
              <Play className="h-7 w-7 text-white fill-white" />
            </div>
            <div className="absolute bottom-1.5 right-2 flex items-center gap-1 text-[11px] text-white bg-black/40 px-1.5 py-0.5 rounded">
              {m.time}
            </div>
          </div>
        )}
        {m.type === "reply" && (
          <div className="px-3 py-2 min-w-[140px]">
            <div className="border-l-2 border-orange-400 pl-2 pb-1 mb-1 flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-700 shrink-0" />
              <div className="min-w-0">
                <p className={cn("text-xs font-medium", m.replyTo?.nameColor ?? "text-primary")}>{m.replyTo?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{m.replyTo?.content}</p>
              </div>
            </div>
            <p className="text-[15px]">{m.content}</p>
            <p className="text-[11px] text-muted-foreground text-right mt-0.5">{m.time}</p>
          </div>
        )}
        {m.type === "text" && (
          <div className="px-3 py-2">
            <p className="text-[15px] whitespace-pre-wrap">{m.content}</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[11px] text-white/80">{m.time}</span>
              {m.isRead && (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white/90"><path fill="currentColor" d="M2 8l3 3 4-5M7 11l3-5"/></svg>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
