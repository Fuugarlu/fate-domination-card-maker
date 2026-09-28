import React from "react";
import commandSealTemplateShort from "@/src/features/master-card/images/master-template-short.png";
import commandSealTemplateMedium from "@/src/features/master-card/images/master-template-medium.png";
import commandSealTemplateLong from "@/src/features/master-card/images/master-template-long.png";
import {
  IMAGE_CROP_SETTINGS,
  IMAGE_CROP_VALUES,
} from "@/src/constants/cropConstants";
import { StaticImageData } from "next/image";
import { NAME_FIELD_SIZES } from "@/src/constants/formConstants";

type props = {
  form: { pic: string; name: string; nameFieldSize: NAME_FIELD_SIZES };
  isPreview: boolean;
};

const CommandSeal = ({ form, isPreview }: props) => {
  function handleTemplate(
    masterNameFieldSize: NAME_FIELD_SIZES,
  ): StaticImageData {
    switch (masterNameFieldSize) {
      case NAME_FIELD_SIZES.short:
        return commandSealTemplateShort;
      case NAME_FIELD_SIZES.medium:
        return commandSealTemplateMedium;
      case NAME_FIELD_SIZES.long:
        return commandSealTemplateLong;
    }
  }

  return (
    <div>
      <div
        style={isPreview ? { zoom: 0.5 } : {}}
        className={`
        ${!isPreview ? "absolute left-[-9999px] top-[-9999px]" : "flex flex-col items-center"}
      `}
      >
        <div>
          <div
            id={
              isPreview
                ? "card-preview"
                : IMAGE_CROP_SETTINGS.COMMAND_SEAL + "-to-save"
            }
            className={`relative`}
            style={{
              width: 750,
              height: 1050,
            }}
          >
            {/* Character image */}
            <img
              src={form.pic}
              alt=""
              className="absolute object-cover bg-black"
              style={{
                ...IMAGE_CROP_VALUES[IMAGE_CROP_SETTINGS.COMMAND_SEAL].position,
                ...IMAGE_CROP_VALUES[IMAGE_CROP_SETTINGS.COMMAND_SEAL]
                  .dimensions,
              }}
            />

            {/* Template frame */}
            <img
              src={handleTemplate(form.nameFieldSize).src}
              alt=""
              className="absolute inset-0 pointer-events-none"
              style={{
                width: 750,
                height: 1050,
              }}
            />
            <div
              className="absolute flex flex-col top-[778px] left-[30px] text-[32px] w-[680px] text-[50px]"
              style={{
                fontFamily: '"Times New Roman"',
                lineHeight: 1.1,
              }}
            >
              {form.name}
            </div>
            <div
              className="absolute flex flex-col top-[845px] left-[33px] text-[32px] w-[680px]"
              style={{
                fontFamily: '"Times New Roman"',
                lineHeight: 1.1,
              }}
            >
              <span>
                <span className="font-semibold">Action</span>: Gain +4 Mana
              </span>
              <span>
                <span className="font-semibold">Action</span>: Gain +2 total
                power. Gain 2 VP if you win combat this round.
              </span>
              <span>
                <span className="font-semibold">Action</span>: Move anywhere
                from Miyama or Shinto ignoring engagement.
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-2xl italic mt-2 flex flex-col items-center">
              <span>Command Seal is previewed at 50% zoom.</span>
              <span>
                For more customization, please make your own in the main page.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandSeal;
