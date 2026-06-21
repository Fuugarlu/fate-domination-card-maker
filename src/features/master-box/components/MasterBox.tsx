import boxTopRightBlack from "../images/box-top-right.png";
import boxBottomLeftShadows from "../images/box-bottom-left.png";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import BoxImage from "./BoxImage";
import { MasterPicAndColorForm } from "../../master-assets/types/formTypes";

type props = {
  form: MasterPicAndColorForm;
  isPreview: boolean;
};

const boxSettings = {
  outputWidth: 2990,
  outputHeight: 2990,
  topRightBlackOverlayWidth: 1990,
  topRightBlackOverlayHeight: 2001,
  bottomLeftShadowsOverlayWidth: 2001,
  bottomLeftShadowsOverlayHeight: 1990,
  imageWidth: 1000,
  imageHeight: 1000,
};

export const MasterBox = ({ form, isPreview }: props) => {
  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={`
        ${!isPreview ? "absolute left-[-9999px] top-[-9999px]" : "flex flex-col items-center"}
      `}
    >
      <div className="xl:fixed">
        <div
          id={
            isPreview
              ? "card-preview"
              : IMAGE_CROP_SETTINGS.MASTER_BOX + "-to-save"
          }
          className={`relative overflow-hidden`}
          style={{
            width: boxSettings.outputWidth,
            height: boxSettings.outputHeight,
          }}
        >
          {/* Bottom layer (colors) */}
          <div
            style={{
              width: boxSettings.outputWidth,
              height: boxSettings.outputHeight,
              backgroundColor: form.borderColor,
            }}
          ></div>

          {/* Top right dark part */}
          <img
            src={boxTopRightBlack.src}
            style={{
              width: boxSettings.topRightBlackOverlayWidth,
              height: boxSettings.topRightBlackOverlayHeight,
            }}
            className="absolute w-full right-0 top-0"
          />

          {/* Bottom left shadows over colors */}
          <img
            src={boxBottomLeftShadows.src}
            style={{
              width: boxSettings.bottomLeftShadowsOverlayWidth,
              height: boxSettings.bottomLeftShadowsOverlayHeight,
            }}
            className="absolute w-full left-0 bottom-0"
          />

          {/* Character images */}
          {form.pic && <BoxImage pic={form.pic} rotate={false} width={boxSettings.imageWidth} height={boxSettings.imageHeight}/>}
          {form.pic && <BoxImage pic={form.pic} rotate={true} width={boxSettings.imageWidth} height={boxSettings.imageHeight}/>}

        </div>
        <div className="flex justify-center">
          <div className="text-2xl italic mt-2">
            Token is previewed at 50% zoom.
          </div>
        </div>
      </div>
    </div>
  );
};
