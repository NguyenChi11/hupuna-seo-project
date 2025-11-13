"use client";

import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLightbulb,
  faGlobe,
  faNewspaper,
  faPenNib,
  faCopy,
  faBookOpen,
  faCommentDots,
  faChartLine,
  faArrowTrendUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "@/app/(main-layout)/_components/SidebarContext";

const routes = [
  { label: "Tài khoản", href: "/account", icon: faUser },
  { label: "Gợi ý từ khóa", href: "/keyword-suggestion", icon: faLightbulb },
  { label: "Kiểm tra tên miền", href: "/domain-check", icon: faGlobe },
  { label: "Xem tin nhanh", href: "/news", icon: faNewspaper },
  { label: "Viết bài", href: "/write", icon: faPenNib },
  { label: "KT sao chép nội dung", href: "/plagiarism", icon: faCopy },
  { label: "Đăng lên Blogger", href: "/post-blogger", icon: faBookOpen },
  { label: "Đăng trên Forum", href: "/post-forum", icon: faCommentDots },
  { label: "Thứ hạng từ khóa", href: "/search", icon: faChartLine },
  { label: "Tăng Traffic", href: "/increase-traffic", icon: faArrowTrendUp },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, toggle } = useSidebar();

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-30 flex h-screen flex-col border-r bg-white shadow-sm
        transition-all duration-300 ease-in-out overflow-hidden
        ${collapsed ? "w-16" : "sm:w-64 w-full"}
      `}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
              <FontAwesomeIcon icon={faPenNib} className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-indigo-700">SEO Panel</h1>
              <p className="text-xs text-gray-500">Quản lý nội dung</p>
            </div>
          </div>
        )}

        <button
          onClick={toggle}
          className="
            rounded-lg p-1.5 transition-all hover:bg-gray-100
            text-gray-600 hover:text-indigo-700
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer
          "
          aria-label={collapsed ? "Mở sidebar" : "Thu gọn sidebar"}
        >
          <FontAwesomeIcon
            icon={collapsed ? faChevronRight : faChevronLeft}
            className="h-4 w-4"
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {routes.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
              className={`
                group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium
                transition-all duration-200 relative
                ${
                  isActive
                    ? "bg-linear-to-r from-indigo-600 to-indigo-700 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-700 cursor-pointer"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <div
                className={`
                  flex h-9 w-9 items-center justify-center rounded-lg
                  ${
                    isActive
                      ? "bg-white/20"
                      : "bg-gray-100 group-hover:bg-gray-200"
                  }
                `}
              >
                <FontAwesomeIcon
                  icon={icon}
                  className={`
                    h-5 w-5
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-indigo-700"
                    }
                  `}
                />
              </div>

              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
