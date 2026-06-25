import React from "react";
import shadowPieceForPreview from "../images/shadow-piece-for-preview.png";
import { BoxPicAndColorForm } from "../../master-assets/types/formTypes";

type props = {
  form: BoxPicAndColorForm;
};

const boxPreviewSettings = {
  imageWidth: 1300,
  imageHeight: 1000,
  shadowLongSide: 1000,
  shadowShortSide: 250,
}

export const MasterBoxPreview = ({ form }: props) => {
  return (
    <div style={{ zoom: 0.5 }} className="flex flex-col items-center">
      {form.pic && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <img src={form.pic} style={{ width: boxPreviewSettings.imageWidth, height: boxPreviewSettings.imageHeight }} />
            <div className="relative" style={{ width: boxPreviewSettings.shadowShortSide, height: boxPreviewSettings.shadowLongSide }}>
              <div
                className="absolute"
                style={{
                  width: boxPreviewSettings.shadowShortSide,
                  height: boxPreviewSettings.shadowLongSide,
                  backgroundColor: form.borderColor,
                }}
              ></div>
              <img
                className="absolute"
                src={shadowPieceForPreview.src}
                style={{ width: boxPreviewSettings.shadowShortSide, height: boxPreviewSettings.shadowLongSide }}
              />
            </div>
          </div>
          <div className="relative" style={{ width: boxPreviewSettings.imageWidth, height: boxPreviewSettings.shadowShortSide }}>
            <div
              className="absolute"
              style={{
                width: boxPreviewSettings.imageWidth,
                height: boxPreviewSettings.shadowShortSide,
                backgroundColor: form.borderColor,
              }}
            ></div>
            <img
              className="absolute"
              src={shadowPieceForPreview.src}
              style={{ width: boxPreviewSettings.imageWidth, height: boxPreviewSettings.shadowShortSide }}
            />
          </div>
          <span className="italic self-center text-3xl">
            (The master-box.png download will look a bit different from the
            preview, but it works on Tabletop Simulator!)
          </span>
        </div>
      )}
    </div>
  );
};
