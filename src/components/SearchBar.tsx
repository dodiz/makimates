import { useEffect, useState } from "react";

type SearchBarProps = {
  onSearch: (search: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const delayed = setTimeout(() => onSearch(value), 200);
    return () => clearTimeout(delayed);
  }, [onSearch, value]);

  return (
    <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between bg-gray-700 p-4 text-gray-900">
      <input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        type="text"
        placeholder="Search for a dish ..."
        className="h-11 w-full rounded-sm bg-gray-600 p-2 text-slate-300 placeholder-gray-400 outline-none"
      />
    </div>
  );
};
