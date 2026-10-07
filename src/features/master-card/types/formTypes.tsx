import { Color } from "@/src/types/colorTypes";
import { attackTypesType, servantCardType } from "../../../types/servantTypes";
import { NAME_FIELD_SIZES } from "@/src/constants/formConstants";

export type AttackTypes = Record<attackTypesType, boolean>;

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
  objectiveValue: number | 'X' | null;
  eventMana: number | 'X' | null;
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
  masterNameFieldSize: NAME_FIELD_SIZES;
  cardToMake: mainCardType;
  blackTextlessTypes: AttackTypes;
};

export const enum MAIN_CARD {
  general = 'card',
  servant = 'servant',
  textless = 'textless',
  textlessBlack = 'textless (black)',
  all = 'all'
}

export type mainCardType = MAIN_CARD.general | MAIN_CARD.servant | MAIN_CARD.textless | MAIN_CARD.textlessBlack | MAIN_CARD.all;