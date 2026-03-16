import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";

export function SearchBar({ search, setSearch }) {

  return (
    <form onSubmit={(e) => e.preventDefault()}>

      <div className="relative">

        <Label htmlFor="search" className="sr-only">
          Search
        </Label>

        <SidebarInput
          id="search"
          placeholder="Search places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 pl-7"
        />

        <Search
          className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50"
        />

      </div>

    </form>
  );

}