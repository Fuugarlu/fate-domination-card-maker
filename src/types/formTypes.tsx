import { attackTypesType, servantCardType } from "./servantTypes";

export type AttackTypes = Record<attackTypesType, boolean>;

export const enum MASTER_NAME_FIELD_SIZES {
  short = 'short',
  medium = 'medium',
  long = 'long',
}

export type formInput = {
  pic: string | null;
  masterName: string;
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
  cardColorHue: string;
  enableCardColorHueInput: boolean;
  masterNameFieldSize: MASTER_NAME_FIELD_SIZES;
};

export enum PicsToSave {
    CARD = "card-to-save",
    TOKEN = "token-to-save",
    MASTER_BOX = "master-box-to-save"
} 