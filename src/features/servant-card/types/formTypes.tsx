import { SERVANT_TYPES, ATTACK_TYPES } from "@/src/constants/servantConstants"
import { BasicCardTypes } from "@/src/types/cardTypes"

export type ServantCardForm = {
    class: typeof SERVANT_TYPES.STANDARD[number] | typeof SERVANT_TYPES.EXTRA[number],
    name: string,
    primaryTrait: BasicCardTypes,
    traits: string[],
    drawbacks: string[]
    pic: string | null
}

