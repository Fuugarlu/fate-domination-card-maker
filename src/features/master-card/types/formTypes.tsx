import { Color } from "@/src/types/colorTypes";
import { attackTypesType, servantCardType } from "../../../types/servantTypes";

export type AttackTypes = Record<attackTypesType, boolean>;

export const enum MASTER_NAME_FIELD_SIZES {
  short = 'short',
  medium = 'medium',
  long = 'long',
}

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
  // cardColorHue: string;
  // enableCardColorHueInput: boolean;
  masterNameFieldSize: MASTER_NAME_FIELD_SIZES;
};