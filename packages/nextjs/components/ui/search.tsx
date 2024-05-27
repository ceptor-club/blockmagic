import { Input } from "./input";
import { SearchIcon } from "lucide-react";

interface SearchProps {
  placeholder: string;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 right-0 flex items-center p-3 pointer-events-none border-0 border-l">
        <SearchIcon className="w-5 h-5 text-black" />
      </div>
      <Input
        className="py-2 pl-4 pr-10 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        type="search"
      />
    </div>
  );
};

export default Search;
