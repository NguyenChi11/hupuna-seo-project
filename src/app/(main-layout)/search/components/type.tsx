export interface KeywordItem {
  id: number;
  keyword: string;
  position: number;
  oldPosition: number;
  bestPosition: number;
  updatedAt: string;
  link: string;
}

export type SortKey = keyof KeywordItem;

export interface SortConfig {
  key: SortKey;
  direction: "asc" | "desc";
}
