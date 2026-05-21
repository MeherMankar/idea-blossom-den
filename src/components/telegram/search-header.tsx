
import { Menu, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchHeaderProps {
  isLoading?: boolean
  searchValue: string
  onSearchChange: (value: string) => void
  onMenuClick?: () => void
}

export function SearchHeader({
  isLoading = false,
  searchValue,
  onSearchChange,
  onMenuClick,
}: SearchHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors"
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <Input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-input border-0 rounded-full h-10 placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}
