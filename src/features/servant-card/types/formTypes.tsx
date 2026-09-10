import { SERVANT_TYPES } from "@/src/constants/servantConstants"
import { BasicCardTypes } from "@/src/types/cardTypes"
import { Color } from "@/src/types/colorTypes"

export type ServantCardForm = {
    class: typeof SERVANT_TYPES.STANDARD[number] | typeof SERVANT_TYPES.EXTRA[number],
    name: string,
    servantNameColor: Color,
    primaryTrait: BasicCardTypes,
    traits: string[],
    drawbacks: string[]
    pic: string | null
}

