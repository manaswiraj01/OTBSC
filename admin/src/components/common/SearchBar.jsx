import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";

export function SearchBar({
  search,
  setSearch,
  placeholder = "Search..."
}) {
  return (
    <div className="relative">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>

      <SidebarInput
        id="search"
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-9 pl-7 border-zinc-700"
      />

      <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50" />
    </div>
  );
}