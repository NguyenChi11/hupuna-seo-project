import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClipboard,
  faFileCsv,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderButtonsProps {
  onShowGuide: () => void;
  onCopyAll: () => void;
  onExportExcel: () => void;
  showCopySuccess: boolean;
}

export function HeaderButtons({
  onShowGuide,
  onCopyAll,
  onExportExcel,
  showCopySuccess,
}: HeaderButtonsProps) {
  return (
    <div className="flex items-center gap-2 sm:flex-row flex-col">
      {/* Hướng dẫn */}
      <button
        onClick={onShowGuide}
        className="
          inline-flex items-center sm:justify-center justify-start gap-2
          h-9 px-3 py-2 rounded-md
          bg-white text-gray-700 text-sm font-medium
          border border-gray-300
          hover:bg-gray-50 hover:text-gray-900
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 sm:w-auto w-full cursor-pointer
        "
      >
        <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
        Hướng dẫn
      </button>

      {/* Copy All */}
      <button
        onClick={onCopyAll}
        className="
          inline-flex items-center sm:justify-center justify-start gap-2
          h-9 px-3 py-2 rounded-md
          bg-white text-gray-700 text-sm font-medium
          border border-gray-300
          hover:bg-gray-50 hover:text-gray-900
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 sm:w-auto w-full cursor-pointer
          relative
        "
      >
        {showCopySuccess ? (
          <>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="h-4 w-4 text-green-600"
            />
            <span className="text-green-600">Đã sao chép!</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faClipboard} className="h-4 w-4" />
            Sao chép
          </>
        )}
      </button>

      {/* Xuất CSV */}
      <button
        onClick={onExportExcel}
        className="
          inline-flex items-center sm:justify-center justify-start gap-2
          h-9 px-3 py-2 rounded-md
          bg-indigo-600 text-white text-sm font-medium
          hover:bg-indigo-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 active:scale-98 sm:w-auto w-full cursor-pointer
        "
      >
        <FontAwesomeIcon icon={faFileCsv} className="h-4 w-4" />
        Xuất CSV
      </button>
    </div>
  );
}
