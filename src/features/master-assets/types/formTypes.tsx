type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

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