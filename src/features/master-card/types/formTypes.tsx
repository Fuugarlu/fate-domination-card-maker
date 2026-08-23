import { Color } from "@/src/types/colorTypes";
import { attackTypesType, servantCardType } from "../../../types/servantTypes";

export type AttackTypes = Record<attackTypesType, boolean>;

export const enum MASTER_NAME_FIELD_SIZES {
  short = 'short',
  medium = 'medium',
  long = 'long',
}

export type CardColorSettings = {
  settings: string;
  colorType: "default" | "base" | "custom";
  hue: number;
  brightness: number;
  saturation: number;
};

export type formInput = {
  pic: string | null;
  masterName: string;
  masterNameColor: Color;
  masterNameFontSize: number;
  objectiveValue: number | null;
  eventMana: number | null;
  cardAttack: string | null;
  cardMana: string | null;
  attackTypes: AttackTypes;
  masterAbility: string;
  grayscaleFilter: boolean;
  servantClass: string | null;
  servantCards: servantCardType[] | null;
  servantCardsSpecialFontSize: number;
  hasCardAbility: boolean;
  revealServantName: boolean;
  timesPerGame: number | null;
  cardColorSettings: CardColorSettings;
  masterNameFieldSize: MASTER_NAME_FIELD_SIZES;
};