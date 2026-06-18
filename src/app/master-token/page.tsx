"use client";

import { ClearFormButton } from "@/src/pages/MasterCardCreation/FormComponents/header/ClearFormButton";
import { PageName } from "@/src/pages/MasterCardCreation/FormComponents/header/PageName";
import ImageCropper from "@/src/pages/MasterCardCreation/ImageCropper";
import { PicsToSave } from "@/src/types/formTypes";
import React, { useState } from "react";
import { Token } from "./Canvas";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { DownloadButton } from "@/src/pages/MasterCardCreation/FormComponents/download/DownloadButton";
import shirouToken from "./shirou-token.png";

type HEX = `#${string}`;

export type tokenFormInput = {
  pic: string | null;
  tokenColor: any;
};

const emptyState: tokenFormInput = {
  pic: shirouToken.src,
  tokenColor: "#000000",
};

const MasterTokenCreation = () => {
  const [form, setForm] = useState<tokenFormInput>(emptyState);
  return (
    <div>
      <div className="flex flex-row justify-between gap-2">
        <PageName />
        <span className="flex gap-2">
          <ClearFormButton setForm={setForm} emptyState={emptyState} />
        </span>
      </div>
      <div className="input-block w-full">
        <h2 className="field-header">Card Picture</h2>
        <ImageCropper
          croppedImage={form.pic}
          setCroppedImage={(croppedPic) =>
            setForm({ ...form, pic: croppedPic })
          }
          cropSettings={IMAGE_CROP_SETTINGS.TOKEN}
        />
        <h2 className="field-header">Border Color</h2>
        <input 
        type="color"
        className="cursor-pointer"
        onChange={(e) => setForm((prev) => ({...prev, tokenColor: e.target.value}))}
        />
      </div>
      <Token form={form} isPreview={true} />
      <Token form={form} isPreview={false} />
      <DownloadButton idToSave={PicsToSave.TOKEN} name={null} />

    </div>
  );
};

export default MasterTokenCreation;
