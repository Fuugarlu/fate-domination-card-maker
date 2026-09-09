import React from "react";
import commandSealTemplate from "@/src/features/master-assets/command-seal/images/command-seal-template.png";
import { IMAGE_CROP_SETTINGS, IMAGE_CROP_VALUES } from "@/src/constants/cropConstants";

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
                ...IMAGE_CROP_VALUES[IMAGE_CROP_SETTINGS.COMMAND_SEAL].position,
                ...IMAGE_CROP_VALUES[IMAGE_CROP_SETTINGS.COMMAND_SEAL].dimensions
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
            <div className="text-2xl italic mt-2 flex flex-col items-center">
              <span>Command Seal is previewed at 50% zoom.</span>
              <span>For more customization, please make your own in the main page.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandSeal;
