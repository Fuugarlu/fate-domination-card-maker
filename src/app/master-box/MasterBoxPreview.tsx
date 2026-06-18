import React from "react";
import { tokenFormInput } from "./page";
import shadowPieceForPreview from "./shadow-piece-for-preview.png";

type props = {
  form: tokenFormInput;
};

export const MasterBoxPreview = ({ form }: props) => {
  return (
    <div style={{ zoom: 0.5 }} className="flex flex-col items-center">
      {form.pic && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <img src={form.pic} style={{ width: 1300, height: 1000 }} />
            <div className="relative" style={{ width: 250, height: 1000 }}>
            <div
              className="absolute"
              style={{
                width: 250,
                height: 1000,
                backgroundColor: form.tokenColor,
              }}
            ></div>
            <img
              className="absolute"
              src={shadowPieceForPreview.src}
              style={{ width: 250, height: 1000 }}
            />
          </div>
          </div>
          <div className="relative" style={{ width: 1300, height: 250 }}>
            <div
              className="absolute"
              style={{
                width: 1300,
                height: 250,
                backgroundColor: form.tokenColor,
              }}
            ></div>
            <img
              className="absolute"
              src={shadowPieceForPreview.src}
              style={{ width: 1300, height: 250 }}
            />
          </div>
          <span className="italic self-center text-3xl">
            (The master-box.png download will look a bit different from the preview, but
            it works on Tabletop Simulator!)
          </span>
        </div>
      )}
    </div>
  );
};
