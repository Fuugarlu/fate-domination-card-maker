"use client";

import servantCardTemplate from "../images/servant-card-template.png";
import { ATTACK_TYPES } from "@/src/constants/servantConstants";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { ServantCardForm } from "../types/formTypes";
import PrimaryTrait from "./PrimaryTrait";

type ServantSummonProps = {
  form: ServantCardForm;
  isPreview: boolean;
};

export const ServantSummon = ({ form, isPreview }: ServantSummonProps) => {
  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={`
        ${!isPreview ? "absolute left-[-9999px]" : "flex flex-col items-center"}
      `}
    >
      <div className="xl:fixed">
        <div
          id={
            isPreview ? "card-preview" : IMAGE_CROP_SETTINGS.SERVANT_SUMMON + "-to-save"
          }
          className={`relative overflow-hidden`}
          style={{
            width: 750,
            height: 1050,
          }}
        >
          {/* Character image */}
          {form.pic && (
            <img
              src={form.pic}
              alt=""
              className="absolute object-cover"
              style={{
                left: 25,
                top: 25,
                width: 700,
                height: 836,
              }}
            />
          )}

          {/* Template frame */}
          <img
            src={servantCardTemplate.src}
            alt=""
            className="absolute inset-0 pointer-events-none"
            style={{
              width: 750,
              height: 1050,
            }}
          />

          <div
            className="absolute w-full flex flex-col"
            style={{ top: 860, left: "50%", transform: "translateX(-50%)", lineHeight: 1 }}
          >
            {/* Name & Servant class */}
            <div
              className=" flex justify-center mb-3 gap-1"
              style={{
                fontSize: 56,
                fontFamily: '"Times New Roman"',
              }}
            >
              {form.class && (
                <img
                  src={"./servant-class-icons/" + form.class + ".png"}
                  className="block w-[60px] h-[60px]"
                />
              )}
              <div className="text-white">{form.name}</div>
            </div>

            {/* Primary Trait */}
            <div
              className=" flex justify-center mb-3"
              style={{
                fontSize: 32,
                fontFamily: '"Times New Roman"',
              }}
            >
              <PrimaryTrait separatorType={form.primaryTrait} />
            </div>

            {/* Traits */}
            <div
              className=" flex justify-center mb-3"
              style={{
                fontSize: 32,
                fontFamily: '"Times New Roman"',
              }}
            >
              <div className="text-white">
                {form.traits.length == 1
                  ? form.traits[0]
                  : form.traits.join(" " + "\u00B7" + " ")}
              </div>
            </div>

            {/* Drawbacks */}
            <div
              className=" flex justify-center italic"
              style={{
                fontSize: 32,
                fontFamily: '"Times New Roman"',
              }}
            >
              <div className="text-[#a6a6a6]">
                {form.drawbacks.length == 1
                  ? form.drawbacks[0]
                  : form.drawbacks.join(" " + "\u00B7" + " ")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-2xl italic mt-2">
            Card is previewed at 50% zoom.
          </div>
        </div>
      </div>
    </div>
  );
};
