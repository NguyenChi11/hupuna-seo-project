"use client";

import {
  SortConfig,
  SortKey,
} from "@/app/(main-layout)/search/components/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

interface SortButtonProps {
  colKey: SortKey;
  sortConfig: SortConfig | null;
  onSort: (key: SortKey) => void;
}

export function SortButton({ colKey, sortConfig, onSort }: SortButtonProps) {
  const isActive = sortConfig?.key === colKey;
  const direction = sortConfig?.direction;

  return (
    <button
      type="button"
      onClick={() => onSort(colKey)}
      className={`
        inline-flex items-center justify-center
        w-5 h-5 rounded
        text-gray-400
        hover:text-indigo-600
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        transition-colors duration-200 cursor-pointer
        ${isActive ? "text-indigo-600" : ""}
      `}
      aria-label={`Sort by ${colKey}`}
    >
      <FontAwesomeIcon
        icon={isActive ? (direction === "asc" ? faSortUp : faSortDown) : faSort}
        className="h-3.5 w-3.5"
      />
    </button>
  );
}
