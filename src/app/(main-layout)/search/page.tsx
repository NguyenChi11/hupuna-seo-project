"use client";

import { Header } from "@/app/(main-layout)/search/components/Header";
import { KeywordInput } from "@/app/(main-layout)/search/components/KeywordInput";
import { KeywordTable } from "@/app/(main-layout)/search/components/KeywordTable";
import { SettingsPanel } from "@/app/(main-layout)/search/components/SettingsPanel";
import {
  KeywordItem,
  SortConfig,
  SortKey,
} from "@/app/(main-layout)/search/components/type";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  domain: string;
}

export default function SeoRankPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "LeFooBox",
      domain: "https://lefoobox.vn",
    },
  ]);

  const [selectedProject, setSelectedProject] = useState("1");

  const [data, setData] = useState<KeywordItem[]>([
    {
      id: 1,
      keyword: "Hộp carton",
      position: 12,
      oldPosition: 12,
      bestPosition: 12,
      updatedAt: "12/11/2025",
      link: "https://lefoobox.vn/thung-carton",
    },
    {
      id: 2,
      keyword: "Thùng carton",
      position: 5,
      oldPosition: 8,
      bestPosition: 4,
      updatedAt: "10/11/2025",
      link: "https://lefoobox.vn/thung-carton",
    },
    {
      id: 3,
      keyword: "Bao bì carton",
      position: 20,
      oldPosition: 15,
      bestPosition: 10,
      updatedAt: "11/11/2025",
      link: "https://lefoobox.vn/thung-carton",
    },
  ]);

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // ✅ Sắp xếp cột
  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      return direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setData(sorted);
  };

  // ✅ Thêm dự án mới
  const handleAddProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...project,
    };
    setProjects((prev) => [...prev, newProject]);
    setSelectedProject(newProject.id);
  };

  // ✅ Cập nhật từ khóa (demo)
  const handleUpdateKeyword = () => {
    console.log("Update keyword");
  };

  // ✅ Xóa dự án (được gọi từ KeywordInput)
  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    // Nếu xóa project hiện tại => reset chọn
    if (selectedProject === projectId) {
      setSelectedProject(projects.length > 1 ? projects[0].id : "");
    }
  };

  // ✅ Kiểm tra thứ hạng (demo)
  const handleCheckRank = () => {
    console.log("Check rank");
  };

  return (
    <div className="min-h-screen bg-white sm:p-6 p-2">
      <Header data={data} />

      <KeywordInput
        projects={projects}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        onAddProject={handleAddProject}
        onUpdate={handleUpdateKeyword}
        onDeleteProject={handleDeleteProject}
      />

      <KeywordTable data={data} sortConfig={sortConfig} onSort={handleSort} />

      <div className="mt-8 flex flex-col sm:flex-row gap-6">
        <SettingsPanel onCheckRank={handleCheckRank} />
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
