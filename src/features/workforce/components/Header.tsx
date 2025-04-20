import { SearchIcon, PlusIcon } from "@/components/icons/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { NewWorkforceDialog } from "@/features/workforce/components/NewWorkforceDialog";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function WorkforceHeader({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="flex gap-3 items-center px-4 py-3 bg-white rounded-xl max-sm:flex-col">
      <h1 className="flex-1 text-base font-semibold text-neutral-800">
        My Agents
      </h1>
       
      <div className="relative">
        <Search  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          className="pl-10 w-[300px]"
          type="text"
          placeholder="Search by name"
        />
      </div>
                   <NewWorkforceDialog> Create new </NewWorkforceDialog>
       
    </header>
  );
}
