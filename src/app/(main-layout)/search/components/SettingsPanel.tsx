"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCog,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

// Custom Dropdown Component (giống select)
function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative ">
        {/* Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="
            w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md
            text-sm text-left text-gray-900 flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition-all duration-200 hover:border-gray-400 cursor-pointer
          "
        >
          <span>{selected?.label || "Chọn..."}</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`h-4 w-4 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Menu */}
            <ul
              className="
                absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md
                shadow-lg max-h-60 overflow-auto py-1 text-sm
                focus:outline-none
              "
            >
              {options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`
                    px-3 py-2 cursor-pointer flex items-center justify-between
                    hover:bg-indigo-50 hover:text-indigo-600
                    ${
                      value === opt.value
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-900"
                    }
                  `}
                >
                  <span>{opt.label}</span>
                  {value === opt.value && (
                    <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

// Main SettingsPanel
interface SettingsPanelProps {
  onCheckRank: () => void;
}

export function SettingsPanel({ onCheckRank }: SettingsPanelProps) {
  const [device, setDevice] = useState("desktop");
  const [domain, setDomain] = useState("vn");
  const [language, setLanguage] = useState("vi");
  const [rankLimit, setRankLimit] = useState("30");

  return (
    <div className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
      {/* Thiết bị */}
      <Dropdown
        label="Thiết bị"
        value={device}
        onChange={setDevice}
        options={[
          { value: "desktop", label: "Desktop" },
          { value: "mobile", label: "Mobile" },
        ]}
      />

      {/* Google Domain */}
      <Dropdown
        label="Google Domain"
        value={domain}
        onChange={setDomain}
        options={[
          { value: "vn", label: "https://www.google.com.vn" },
          { value: "com", label: "https://www.google.com" },
          { value: "co.uk", label: "https://www.google.co.uk" },
          { value: "ca", label: "https://www.google.ca" },
        ]}
      />

      {/* Ngôn ngữ kết quả */}
      <Dropdown
        label="Ngôn ngữ kết quả"
        value={language}
        onChange={setLanguage}
        options={[
          { value: "vi", label: "Tiếng Việt" },
          { value: "en", label: "English" },
          { value: "ja", label: "日本語" },
          { value: "es", label: "Español" },
        ]}
      />

      {/* Thứ hạng */}
      <Dropdown
        label="Kiểm tra đến thứ hạng"
        value={rankLimit}
        onChange={setRankLimit}
        options={[
          { value: "30", label: "Top 30" },
          { value: "50", label: "Top 50" },
          { value: "100", label: "Top 100" },
          { value: "200", label: "Top 200" },
        ]}
      />

      {/* Nút kiểm tra */}
      <button
        onClick={onCheckRank}
        className="
          w-full inline-flex items-center justify-center gap-2
          h-10 px-4 py-2 rounded-md
          bg-indigo-600 text-white text-sm font-medium
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 active:scale-98 cursor-pointer
        "
      >
        <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
        Kiểm tra thứ hạng
      </button>

      {/* Nút cài đặt */}
      <div className="flex justify-end">
        <button
          className="
          p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100
          rounded-md transition-all duration-200 cursor-pointer
        "
        >
          <FontAwesomeIcon icon={faCog} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
