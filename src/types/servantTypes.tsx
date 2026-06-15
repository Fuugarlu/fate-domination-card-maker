import { ATTACK_TYPES } from "../constants/servantConstants";

type attackTypesType = (typeof ATTACK_TYPES)[number];

export type servantCardType = {
  index: number;
  cardType: attackTypesType;
  values: string;
  showIcon: boolean;
};