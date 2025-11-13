"use client";

interface GuideModalProps {
  onClose: () => void;
}

export function GuideModal({ onClose }: GuideModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Hướng dẫn cài đặt và sử dụng
          </h2>
          <button
            onClick={onClose}
            className="
              p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100
              rounded-md transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer
            "
            aria-label="Đóng"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Section
            title="1. Thêm từ khóa"
            items={[
              "Nhập từ khóa cần theo dõi vào ô input",
              'Nhấn nút "Thêm từ khóa" để thêm vào danh sách',
              "Có thể thêm nhiều từ khóa cùng lúc, mỗi từ khóa trên một dòng",
            ]}
          />

          <Section
            title="2. Cài đặt tìm kiếm"
            items={[
              "Thiết bị: Chọn Desktop hoặc Mobile để kiểm tra thứ hạng",
              "Ngôn ngữ: Chọn Google.com.vn cho thị trường Việt Nam",
              "Công cụ tìm kiếm: Chọn ngôn ngữ hiển thị kết quả",
              "Thứ hạng cần tìm: Chọn Top 30, 50 hoặc 100",
            ]}
          />

          <Section
            title="3. Kiểm tra thứ hạng"
            items={[
              'Nhấn nút "Kiểm tra thứ hạng" để cập nhật vị trí mới nhất',
              "Hệ thống sẽ tự động cập nhật vị trí hiện tại và lịch sử",
              "Vị trí tốt nhất sẽ được lưu lại tự động",
            ]}
          />

          <Section
            title="4. Quản lý dữ liệu"
            items={[
              "Sắp xếp: Click vào mũi tên ở header bảng để sắp xếp",
              "Copy All: Sao chép toàn bộ dữ liệu vào clipboard",
              "Xuất Excel: Tải xuống file CSV để xử lý trong Excel",
              "Xóa từ khóa: Chọn từ khóa và nhấn nút Xóa",
            ]}
          />

          <Section
            title="5. Đọc biểu đồ"
            items={[
              "Click vào icon biểu đồ để xem lịch sử thay đổi thứ hạng",
              "Màu xanh: Thứ hạng tăng (tốt hơn)",
              "Màu đỏ: Thứ hạng giảm (kém hơn)",
            ]}
          />

          {/* Alert Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-yellow-800">
                  Lưu ý quan trọng
                </h3>
                <ul className="mt-2 text-sm text-yellow-900 space-y-1 list-disc list-inside">
                  <li>
                    Không nên kiểm tra quá thường xuyên để tránh bị Google chặn
                  </li>
                  <li>
                    Thứ hạng có thể dao động theo thời gian, vị trí và thiết bị
                  </li>
                  <li>Nên kiểm tra 1-2 lần/ngày vào các khung giờ khác nhau</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="
              w-full inline-flex justify-center items-center gap-2
              h-10 px-4 py-2 bg-indigo-600 text-white text-sm font-medium
              rounded-md hover:bg-indigo-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
              transition-all duration-200 active:scale-98
            "
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component
function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-2">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <ul className="space-y-1.5 text-sm text-gray-600 list-disc list-inside ml-1">
        {items.map((text, i) => (
          <li key={i} className="pl-1">
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
