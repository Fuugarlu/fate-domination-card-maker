import { servantCardType } from "./servantTypes";

export type formInput = {
  pic: string | null;
  masterName: string;
  masterNameFontSize: number;
  objectiveValue: number | null;
  eventMana: number | null;
  cardAttack: string | null;
  cardMana: string | null;
  attackTypes: boolean[];
  masterAbility: string;
  grayscaleFilter: boolean;
  servantClass: string | null;
  servantCards: servantCardType[] | null;
};