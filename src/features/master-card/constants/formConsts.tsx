import { CardColorSettings } from "../types/formTypes";

export const CARD_COLORS: Record<string, CardColorSettings> = {
  default: {
    settings: "default",
    colorType: "default",
    hue: 0,
    saturation: 1,
    brightness: 1,
  },

  red: {
    settings: "red",
    colorType: "base",
    hue: 127,
    saturation: 0.7,
    brightness: 0.7,
  },

  green: {
    settings: "green",
    colorType: "base",
    hue: 260,
    saturation: 0.7,
    brightness: 0.7,
  },

  blue: {
    settings: "blue",
    colorType: "base",
    hue: 10,
    saturation: 0.7,
    brightness: 0.7,
  },

  yellow: {
    settings: "yellow",
    colorType: "custom",
    hue: 180,
    saturation: 0.9,
    brightness: 1.3,
  },
  
  purple: {
    settings: "purple",
    colorType: "custom",
    hue: 50,
    saturation: 0.8,
    brightness: 1,
  },
};
