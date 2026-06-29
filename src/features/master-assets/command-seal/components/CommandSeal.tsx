import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import React from "react";
import commandSealTemplate from "@/src/features/master-assets/command-seal/images/command-seal-template.png";

type props = {
  form: { pic: string };
  isPreview: boolean;
};

const CommandSeal = ({ form, isPreview }: props) => {
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
                left: 25,
                top: 25,
                width: 700,
                height: 800,
              }}
            />

            {/* Template frame */}
            <img
              src={commandSealTemplate.src}
              alt=""
              className="absolute inset-0 pointer-events-none"
              style={{
                width: 750,
                height: 1050,
              }}
            />
          </div>
          <div className="flex justify-center">
            <div className="text-2xl italic mt-2">
              Token is previewed at 50% zoom.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandSeal;
