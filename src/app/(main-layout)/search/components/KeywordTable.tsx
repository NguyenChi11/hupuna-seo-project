"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faArrowTrendUp,
  faArrowTrendDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { SortButton } from "./SortButton";
import {
  KeywordItem,
  SortConfig,
  SortKey,
} from "@/app/(main-layout)/search/components/type";

interface KeywordTableProps {
  data: KeywordItem[];
  sortConfig: SortConfig | null;
  onSort: (key: SortKey) => void;
}

export function KeywordTable({ data, sortConfig, onSort }: KeywordTableProps) {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Toggle chọn 1 hàng
  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Toggle chọn tất cả
  const toggleSelectAll = () => {
    if (selectedRows.length === data.length && data.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };

  const generateChartData = (item: KeywordItem) => {
    const dates = [];
    const positions = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(`${date.getDate()}/${date.getMonth() + 1}`);
      // eslint-disable-next-line react-hooks/purity
      const variation = Math.floor(Math.random() * 5) - 2;
      const pos = Math.max(1, Math.min(100, item.position + variation));
      positions.push(pos);
    }
    return { dates, positions };
  };

  const renderChart = (item: KeywordItem) => {
    const { dates, positions } = generateChartData(item);
    const change = item.position - item.oldPosition;
    const isUp = change < 0;
    const isDown = change > 0;

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="text-xs font-medium text-blue-700">Hiện tại</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {item.position}
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <div className="text-xs font-medium text-gray-700">Vị trí cũ</div>
            <div className="text-2xl font-bold text-gray-600 mt-1">
              {item.oldPosition}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="text-xs font-medium text-green-700">Tốt nhất</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {item.bestPosition}
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <div className="text-xs font-medium text-purple-700">Thay đổi</div>
            <div className="flex items-center gap-1 mt-1">
              {isUp ? (
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  className="h-5 w-5 text-green-600"
                />
              ) : isDown ? (
                <FontAwesomeIcon
                  icon={faArrowTrendDown}
                  className="h-5 w-5 text-red-600"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faMinus}
                  className="h-5 w-5 text-gray-500"
                />
              )}
              <span
                className={`text-2xl font-bold ${
                  isUp
                    ? "text-green-600"
                    : isDown
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {Math.abs(change)}
              </span>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Lịch sử 30 ngày
          </h4>
          <div className="relative h-64">
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-500 -ml-10">
              {[1, 25, 50, 75, 100].map((val) => (
                <span key={val}>{val}</span>
              ))}
            </div>
            <svg
              className="w-full h-full"
              viewBox="0 0 600 240"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((val, i) => (
                <line
                  key={i}
                  x1="40"
                  y1={240 - val * 2.4}
                  x2="600"
                  y2={240 - val * 2.4}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              {/* Line */}
              <polyline
                points={positions
                  .map(
                    (pos, i) =>
                      `${40 + (i / (positions.length - 1)) * 560},${
                        240 - pos * 2.4
                      }`
                  )
                  .join(" ")}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                className="drop-shadow-sm"
              />
              {/* Dots */}
              {positions.map((pos, i) => (
                <circle
                  key={i}
                  cx={40 + (i / (positions.length - 1)) * 560}
                  cy={240 - pos * 2.4}
                  r="4"
                  fill="#6366f1"
                  className="hover:r-5 transition-all"
                />
              ))}
            </svg>
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-10">
              <span>{dates[0]}</span>
              <span>{dates[Math.floor(dates.length / 2)]}</span>
              <span>{dates[dates.length - 1]}</span>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-2 text-sm">
          <p>
            <strong className="text-gray-700">Từ khóa:</strong> {item.keyword}
          </p>
          <p>
            <strong className="text-gray-700">Liên kết:</strong>{" "}
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              {item.link}
            </a>
          </p>
          <p>
            <strong className="text-gray-700">Cập nhật:</strong>{" "}
            {item.updatedAt}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === data.length && data.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                {[
                  { key: "id", label: "STT" },
                  { key: "keyword", label: "Từ khóa" },
                  { key: "position", label: "Vị trí", align: "center" },
                  { key: "oldPosition", label: "Vị trí cũ", align: "center" },
                  { key: "bestPosition", label: "Tốt nhất", align: "center" },
                  { key: "updatedAt", label: "Cập nhật", align: "center" },
                  { key: "link", label: "Liên kết" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      col.align === "center" ? "text-center" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      <SortButton
                        colKey={col.key as SortKey}
                        sortConfig={sortConfig}
                        onSort={onSort}
                      />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biểu đồ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    selectedRows.includes(item.id)
                      ? "bg-indigo-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRow(item.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {item.keyword}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    {item.position}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {item.oldPosition}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-green-600 font-medium">
                    {item.bestPosition}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500">
                    {item.updatedAt}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline break-all"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedKeyword(item)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                      title="Xem biểu đồ"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Count */}
      {selectedRows.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Đã chọn{" "}
          <span className="font-semibold text-indigo-600">
            {selectedRows.length}
          </span>{" "}
          / {data.length} từ khóa
        </div>
      )}

      {/* Chart Modal */}
      {selectedKeyword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Biểu đồ thứ hạng - {selectedKeyword.keyword}
              </h2>
              <button
                onClick={() => setSelectedKeyword(null)}
                className="p-2 text-gray-400 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">{renderChart(selectedKeyword)}</div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
              <button
                onClick={() => setSelectedKeyword(null)}
                className="w-full cursor-pointer inline-flex justify-center items-center gap-2 h-10 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-98"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
