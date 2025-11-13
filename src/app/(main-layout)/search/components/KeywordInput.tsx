"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faTimes,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export interface Project {
  id: string;
  name: string;
  domain: string;
}

interface KeywordInputProps {
  projects: Project[];
  selectedProject: string;
  onProjectChange: (projectId: string) => void;
  onAddProject: (project: Omit<Project, "id">) => void;
  onUpdate: () => void;
  onDeleteProject: (projectId: string) => void;
}

// Custom Dropdown - giống shadcn Select
function ProjectDropdown({
  projects,
  selectedProject,
  onProjectChange,
}: {
  projects: Project[];
  selectedProject: string;
  onProjectChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = projects.find((p) => p.id === selectedProject);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-auto">
      <button
        onClick={() => setOpen(!open)}
        className="
          inline-flex items-center justify-between w-full min-w-60 h-9 px-3 py-2
          bg-white border border-gray-300 rounded-md
          text-sm text-gray-900 font-medium
          hover:bg-gray-50 hover:border-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          transition-all duration-200 cursor-pointer
        "
      >
        <span className="truncate">
          {selected ? `${selected.name} - ${selected.domain}` : "Chọn dự án"}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            className="
              absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md
              shadow-lg max-h-60 overflow-auto py-1 text-sm
            "
          >
            {projects.length === 0 ? (
              <li className="px-3 py-2 text-gray-500">Chưa có dự án</li>
            ) : (
              projects.map((project) => (
                <li
                  key={project.id}
                  onClick={() => {
                    onProjectChange(project.id);
                    setOpen(false);
                  }}
                  className={`
                    px-3 py-2 cursor-pointer flex items-center justify-between
                    hover:bg-indigo-50 hover:text-indigo-600
                    ${
                      selectedProject === project.id
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-900"
                    }
                  `}
                >
                  <span className="truncate">
                    {project.name} - {project.domain}
                  </span>
                  {selectedProject === project.id && (
                    <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                  )}
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}

// Main Component
export function KeywordInput({
  projects,
  selectedProject,
  onProjectChange,
  onAddProject,
  onUpdate,
  onDeleteProject,
}: KeywordInputProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showKeywordInput, setShowKeywordInput] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [keywords, setKeywords] = useState("");

  const selected = projects.find((p) => p.id === selectedProject);

  // ============ Add Project ============
  const handleSaveProject = () => {
    if (projectName.trim() && projectDomain.trim()) {
      onAddProject({
        name: projectName.trim(),
        domain: projectDomain.trim(),
      });
      setProjectName("");
      setProjectDomain("");
      setShowAddModal(false);
    }
  };

  // ============ Delete Project ============
  const handleDeleteConfirm = () => {
    if (selectedProject) {
      onDeleteProject(selectedProject);
      setShowDeleteConfirm(false);
    }
  };

  // ============ Add Keywords ============
  const handleSaveKeywords = () => {
    if (keywords.trim()) {
      const keywordList = keywords
        .split("\n")
        .map((k) => k.trim())
        .filter(Boolean);
      console.log("Danh sách từ khóa:", keywordList);
      setKeywords("");
      setShowKeywordInput(false);
    }
  };

  return (
    <>
      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 w-full sm:w-auto">
        {/* Dropdown */}
        <ProjectDropdown
          projects={projects}
          selectedProject={selectedProject}
          onProjectChange={onProjectChange}
        />
        <div className="flex sm:flex-row flex-col gap-2 text-center justify-center sm:w-auto w-full">
          {/* Buttons */}
          <button
            onClick={() => setShowAddModal(true)}
            className="
            inline-flex items-center justify-center gap-2
            h-9 px-3 py-2 rounded-md
            bg-indigo-600 text-white text-sm font-medium
            hover:bg-indigo-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            transition-all duration-200 active:scale-98 sm:w-auto w-full cursor-pointer
          "
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            Thêm dự án
          </button>

          <button
            onClick={() => setShowKeywordInput(true)}
            disabled={!selectedProject}
            className="
            inline-flex items-center justify-center gap-2
            h-9 px-3 py-2 rounded-md
            bg-green-600 text-white text-sm font-medium
            hover:bg-green-700
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            transition-all duration-200 active:scale-98
            disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full cursor-pointer
          "
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            Thêm từ khóa
          </button>

          <button
            onClick={onUpdate}
            disabled={!selectedProject}
            className="
            inline-flex items-center justify-center gap-2
            h-9 px-3 py-2 rounded-md
            bg-yellow-500 text-white text-sm font-medium
            hover:bg-yellow-600
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
            transition-all duration-200 active:scale-98
            disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full cursor-pointer
          "
          >
            <FontAwesomeIcon icon={faPen} className="h-4 w-4" />
            Cập nhật
          </button>

          <button
            onClick={() => selectedProject && setShowDeleteConfirm(true)}
            disabled={!selectedProject}
            className="
            inline-flex items-center justify-center gap-2
            h-9 px-3 py-2 rounded-md
            bg-red-600 text-white text-sm font-medium
            hover:bg-red-700
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            transition-all duration-200 active:scale-98
            disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full cursor-pointer
          "
          >
            <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
            Xóa
          </button>
        </div>
      </div>

      {/* Keyword Input Area */}
      {showKeywordInput && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhập danh sách từ khóa (mỗi dòng 1 từ khóa)
          </label>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            rows={6}
            className="
              w-full px-3 py-2 border border-gray-300 rounded-md
              text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              resize-none transition-all duration-200
            "
            placeholder={`VD:\nHộp carton\nThùng carton giá rẻ\nBao bì giấy`}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowKeywordInput(false)}
              className="
                px-4 py-2 border border-gray-300 rounded-md
                text-sm font-medium text-gray-700
                hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                transition-all duration-200 cursor-pointer
              "
            >
              Hủy
            </button>
            <button
              onClick={handleSaveKeywords}
              disabled={!keywords.trim()}
              className="
                px-4 py-2 bg-indigo-600 text-white rounded-md
                text-sm font-medium
                hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                transition-all duration-200 active:scale-98
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
              "
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Thêm dự án mới
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tên dự án <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="
                    w-full h-10 px-3 py-2 border border-gray-300 rounded-md
                    text-sm text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition-all duration-200
                  "
                  placeholder="VD: LeFooBox"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Domain <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectDomain}
                  onChange={(e) => setProjectDomain(e.target.value)}
                  className="
                    w-full h-10 px-3 py-2 border border-gray-300 rounded-md
                    text-sm text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition-all duration-200
                  "
                  placeholder="VD: https://lefoobox.vn"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="
                  px-4 py-2 border border-gray-300 rounded-md
                  text-sm font-medium text-gray-700
                  hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  transition-all duration-200 cursor-pointer
                "
              >
                Hủy
              </button>
              <button
                onClick={handleSaveProject}
                disabled={!projectName.trim() || !projectDomain.trim()}
                className="
                  px-4 py-2 bg-indigo-600 text-white rounded-md
                  text-sm font-medium
                  hover:bg-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  transition-all duration-200 active:scale-98
                  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                "
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Xác nhận xóa
              </h2>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-gray-700">
              <p>
                Bạn có chắc chắn muốn xóa dự án{" "}
                <strong>{selected?.name ?? "đang chọn"}</strong> không?
              </p>
              <p className="text-sm text-gray-500">
                Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="
                  px-4 py-2 border border-gray-300 rounded-md
                  text-sm font-medium text-gray-700
                  hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  transition-all duration-200 cursor-pointer
                "
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="
                  px-4 py-2 bg-red-600 text-white rounded-md
                  text-sm font-medium
                  hover:bg-red-700
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  transition-all duration-200 active:scale-98 cursor-pointer
                "
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
