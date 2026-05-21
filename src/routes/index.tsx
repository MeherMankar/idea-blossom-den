import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { SearchHeader } from "@/components/telegram/search-header"
import { FilterTabs } from "@/components/telegram/filter-tabs"
import { ArchivedChats } from "@/components/telegram/archived-chats"
import { ChatItem } from "@/components/telegram/chat-item"
import { FabButton } from "@/components/telegram/fab-button"
import { Sidebar } from "@/components/telegram/sidebar"
import { ProfilePage } from "@/components/telegram/profile-page"
import { AuthFlow } from "@/components/telegram/auth/auth-flow"
import { SettingsPage } from "@/components/telegram/settings-page"
import { UserProvider } from "@/contexts/user-context"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Telegram Chat" },
      { name: "description", content: "Telegram-style chat list webapp" },
    ],
  }),
  component: IndexPage,
})

const tabs = [
  { id: "all", label: "All", count: 122 },
  { id: "people", label: "People", count: 2 },
  { id: "bots", label: "Bots", count: 14 },
]

interface Chat {
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

const chats: Chat[] = [
  { id: "1", avatar: "", name: "Saved Messages", preview: "Photo", time: "Sat", isPinned: true, isRead: true, avatarColor: "bg-sky-500" },
  { id: "2", avatar: "", name: "HubNews Discussion!!!", preview: "6002", time: "Wed", unreadCount: 121, isMuted: true, avatarColor: "bg-emerald-600" },
  { id: "3", avatar: "", name: "Random Mirror Area", preview: "REMOVE STREAM SETTINGS ~...", time: "Wed", unreadCount: 282, isMuted: true, avatarColor: "bg-violet-500" },
  { id: "4", avatar: "", name: "Stark Music Hub", preview: "scloudhorizonmusicbot: Do...", time: "Wed", unreadCount: 236600, isMuted: true, avatarColor: "bg-sky-600" },
  { id: "5", avatar: "", name: "UMM", preview: "ARe tu tya bot madhe ja a...", time: "Wed", unreadCount: 1, senderPrefix: "You", isRead: true, avatarColor: "bg-amber-500" },
  { id: "6", avatar: "", name: "TempNum Official Chat", preview: "Koi proxxy bata do??", time: "Wed", unreadCount: 38000, isMuted: true, avatarColor: "bg-rose-500" },
  { id: "7", avatar: "", name: "HubNews!!!", preview: "Dorohedoro 2026 — S0...", time: "Wed", unreadCount: 34, isMuted: true, avatarColor: "bg-indigo-500" },
  { id: "8", avatar: "", name: "DDoSia Project", preview: "Ну по-моему тебе на aifory pro ну...", time: "Wed", avatarColor: "bg-slate-600" },
]

function IndexPage() {
  return (
    <UserProvider>
      <TelegramChatList />
    </UserProvider>
  )
}

function TelegramChatList() {
  const [searchValue, setSearchValue] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAuthFlowOpen, setIsAuthFlowOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onProfileClick={() => setIsProfileOpen(true)}
          onAddAccountClick={() => setIsAuthFlowOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />
        <SettingsPage isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        <ProfilePage isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <AuthFlow
          isOpen={isAuthFlowOpen}
          onClose={() => setIsAuthFlowOpen(false)}
          onSuccess={() => setIsAuthFlowOpen(false)}
        />

        <SearchHeader
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="divide-y divide-border/30">
          <ArchivedChats preview="Rss, MP3 320kbps, Lossless Music Co..." />
          {chats.map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </div>

        <FabButton onClick={() => console.log("Compose new message")} />
      </div>
    </div>
  )
}
