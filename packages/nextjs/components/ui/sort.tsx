import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import { ArrowUpDown } from "lucide-react";

export default function Sort() {
  return (
    <Select>
      <SelectTrigger className="w-[295px]">
        <SelectValue>
          <div className="flex items-center justify-between">
            <span className="pr-1">Sort by</span>
            <ArrowUpDown className="w-4 h-4" />
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="featured">Featured</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
