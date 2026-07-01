import { Color } from "@/src/types/colorTypes";

export type BoxPicAndColorForm = {
  pic: string | null;
  borderColor: Color;
};

export type MasterPicAndColorForm = {
  pic: string | null;
  colorMode: "solid" | "gradient";
  borderColor: Color;
  gradientColors: Color[];
};