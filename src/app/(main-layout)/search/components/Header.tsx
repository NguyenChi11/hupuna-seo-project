"use client";

import { useState } from "react";
import { KeywordItem } from "@/app/(main-layout)/search/components/type";
import { HeaderButtons } from "@/app/(main-layout)/search/components/HeaderButton";
import { GuideModal } from "@/app/(main-layout)/search/components/GuidePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  data: KeywordItem[];
}

export function Header({ data }: HeaderProps) {
  const [showGuide, setShowGuide] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Copy toàn bộ dữ liệu
  const handleCopyAll = async () => {
    const headers =
      "STT\tTừ khóa\tVị trí\tVị trí cũ\tVị trí tốt nhất\tCập nhật\tLiên kết";
    const rows = data
      .map(
        (item, index) =>
          `${index + 1}\t${item.keyword}\t${item.position}\t${
            item.oldPosition
          }\t${item.bestPosition}\t${item.updatedAt}\t${item.link}`
      )
      .join("\n");

    const textToCopy = `${headers}\n${rows}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Xuất CSV
  const handleExportExcel = () => {
    const headers = [
      "STT",
      "Từ khóa",
      "Vị trí",
      "Vị trí cũ",
      "Vị trí tốt nhất",
      "Cập nhật",
      "Liên kết",
    ];
    const rows = data.map((item, index) => [
      index + 1,
      item.keyword,
      item.position,
      item.oldPosition,
      item.bestPosition,
      item.updatedAt,
      item.link,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `thu-hang-tu-khoa-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Header Container - giống shadcn Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 bg-white">
        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Thứ Hạng Từ Khóa
        </h1>

        {/* Action Buttons */}
        <HeaderButtons
          onShowGuide={() => setShowGuide(true)}
          onCopyAll={handleCopyAll}
          onExportExcel={handleExportExcel}
          showCopySuccess={showCopySuccess}
        />
      </div>

      {/* Copy Success Toast - giống shadcn Toast */}
      {showCopySuccess && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-md shadow-lg">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="h-5 w-5 text-green-600"
            />
            <span className="text-sm font-medium text-gray-900">
              Đã sao chép toàn bộ dữ liệu!
            </span>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
    </>
  );
}
