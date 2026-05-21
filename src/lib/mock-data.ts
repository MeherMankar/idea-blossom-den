export interface Chat {
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
  username?: string
  lastSeen?: string
  userId?: string
  birthday?: string
}

export const chats: Chat[] = [
  { id: "1", avatar: "", name: "Saved Messages", preview: "Photo", time: "Sat", isPinned: true, isRead: true, avatarColor: "bg-sky-500", lastSeen: "you" },
  { id: "2", avatar: "", name: "HubNews Discussion!!!", preview: "6002", time: "Wed", unreadCount: 121, isMuted: true, avatarColor: "bg-emerald-600", lastSeen: "last seen recently" },
  { id: "3", avatar: "", name: "Random Mirror Area", preview: "REMOVE STREAM SETTINGS ~...", time: "Wed", unreadCount: 282, isMuted: true, avatarColor: "bg-violet-500", lastSeen: "last seen recently" },
  { id: "4", avatar: "", name: "Stark Music Hub", preview: "scloudhorizonmusicbot: Do...", time: "Wed", unreadCount: 236600, isMuted: true, avatarColor: "bg-sky-600", lastSeen: "last seen recently" },
  { id: "5", avatar: "", name: "Sharayu", preview: "Ky he", time: "Wed", unreadCount: 1, senderPrefix: "You", isRead: true, avatarColor: "bg-amber-500", username: "@ItzSharayu_Mokalekar", lastSeen: "last seen yesterday at 10:25 PM", userId: "1697623567", birthday: "2003-08-23" },
  { id: "6", avatar: "", name: "TempNum Official Chat", preview: "Koi proxxy bata do??", time: "Wed", unreadCount: 38000, isMuted: true, avatarColor: "bg-rose-500", lastSeen: "last seen recently" },
  { id: "7", avatar: "", name: "HubNews!!!", preview: "Dorohedoro 2026 — S0...", time: "Wed", unreadCount: 34, isMuted: true, avatarColor: "bg-indigo-500", lastSeen: "last seen recently" },
  { id: "8", avatar: "", name: "DDoSia Project", preview: "Ну по-моему тебе на aifory pro ну...", time: "Wed", avatarColor: "bg-slate-600", lastSeen: "last seen recently" },
]

export interface ChatMessage {
  id: string
  type: "text" | "image" | "video" | "reply"
  content: string
  time: string
  isOutgoing: boolean
  isRead?: boolean
  imageUrl?: string
  videoDuration?: string
  videoSize?: string
  replyTo?: { name: string; content: string; nameColor?: string }
}

export const chatMessages: Record<string, ChatMessage[]> = {
  "5": [
    { id: "m1", type: "image", content: "", time: "8:01 PM", isOutgoing: false, imageUrl: "photo1" },
    { id: "m2", type: "video", content: "", time: "8:02 PM", isOutgoing: false, videoDuration: "0:39", videoSize: "4.8 MB", imageUrl: "video1" },
    { id: "m3", type: "reply", content: "Ky he", time: "10:24 PM", isOutgoing: false, replyTo: { name: "मेहर मानकर", content: "Video", nameColor: "text-orange-400" } },
    { id: "m4", type: "text", content: "Are te husban le sodun bf sang geli", time: "10:25 PM", isOutgoing: true, isRead: true },
  ],
}
