import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { MasterPicAndColorForm } from "../types/formTypes";

type props = {
  form: MasterPicAndColorForm;
  isPreview: boolean;
  assetType: IMAGE_CROP_SETTINGS;
};

const BORDER_THICKNESS = 40;

export const MasterAsset = ({ form, isPreview, assetType }: props) => {
  const tokenAssetSettings = {
    width: 876,
    height: 876,
    borderRadius: "9999px",
    padding: BORDER_THICKNESS + "px",
    //   background: `
    //   linear-gradient(to bottom, ${form.colorMode == "solid" ? form.borderColor : form.gradientColors.join(",")}}) border-box
    // `,
    background: `linear-gradient(to bottom, ${form.colorMode == "solid" ? form.borderColor : form.gradientColors.join(",")})`,
  };
  const standeeAssetSettings = {
    width: 876,
    height: 1433,
    borderRadius: "0px",
    padding: BORDER_THICKNESS + "px",
    background: `linear-gradient(to bottom, ${form.colorMode == "solid" ? form.borderColor : form.gradientColors.join(",")})`,
  };

  const assetSettings =
    assetType == IMAGE_CROP_SETTINGS.STANDEE
      ? standeeAssetSettings
      : tokenAssetSettings;

  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={`
        ${!isPreview ? "absolute left-[-9999px] top-[-9999px]" : "flex flex-col items-center"}
      `}
    >
      <div>
        <div
          id={isPreview ? "card-preview" : assetType + "-to-save"}
          className={`relative overflow-hidden`}
          style={{
            width: assetSettings.width,
            height: assetSettings.height,
          }}
        >
          {/* Character image */}
          {form.pic && (
            <img
              src={form.pic}
              alt=""
              className={`absolute object-cover`}
              style={assetSettings}
            />
          )}

          {/* Black background */}
          {form.pic && (
            <div
              className="bg-black absolute"
              style={{
                width: assetSettings.width - BORDER_THICKNESS * 2,
                height: assetSettings.height - BORDER_THICKNESS * 2,
                top: BORDER_THICKNESS,
                left: BORDER_THICKNESS,
                borderRadius: assetSettings.borderRadius
              }}
            ></div>
          )}

          {/* Character image */}
          {form.pic && (
            <img
              src={form.pic}
              alt=""
              className={`absolute object-cover`}
              style={{
                width: assetSettings.width - BORDER_THICKNESS * 2,
                height: assetSettings.height - BORDER_THICKNESS * 2,
                top: BORDER_THICKNESS,
                left: BORDER_THICKNESS,
                borderRadius: assetSettings.borderRadius
              }}
            />
          )}
        </div>

        <div className="flex justify-center">
          <div className="text-2xl italic mt-3">Previewed at 50% zoom.</div>
        </div>
      </div>
    </div>
  );
};
