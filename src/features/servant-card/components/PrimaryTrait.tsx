import React from 'react'
import strengthSeparator from "../images/primary-trait-separators/Strength.png";
import agilitySeparator from "../images/primary-trait-separators/Agility.png";
import magicSeparator from "../images/primary-trait-separators/Magic.png";
import specialSeparator from "../images/primary-trait-separators/Special.png";
import { StaticImageData } from 'next/image';
import { BasicCardTypes } from '../types/formTypes';

const separatorMap: Record<BasicCardTypes, StaticImageData> = {
  strength: strengthSeparator,
  agility: agilitySeparator,
  magic: magicSeparator,
  special: specialSeparator,
};

type Props = {
  separatorType: BasicCardTypes;
};

const PrimaryTrait = ({separatorType}: Props) => {
  return (
    <div><img src={separatorMap[separatorType].src}/></div>
  )
}

export default PrimaryTrait