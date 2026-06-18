"use client";

import { ClearFormButton } from "@/src/pages/MasterCardCreation/FormComponents/header/ClearFormButton";
import { PageName } from "@/src/pages/MasterCardCreation/FormComponents/header/PageName";
import ImageCropper from "@/src/pages/MasterCardCreation/ImageCropper";
import { PicsToSave } from "@/src/types/formTypes";
import React, { useState } from "react";
import { MasterBox } from "./Canvas";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { DownloadButton } from "@/src/pages/MasterCardCreation/FormComponents/download/DownloadButton";
import shirouBox from "./shirou-box.png";
import { MasterBoxPreview } from "./MasterBoxPreview";

export type tokenFormInput = {
  pic: string | null;
  tokenColor: any;
};

const emptyState: tokenFormInput = {
  pic: shirouBox.src,
  tokenColor: "#3a638a",
};

const MasterBoxCreation = () => {
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
          cropSettings={IMAGE_CROP_SETTINGS.MASTER_BOX}
        />
        <h2 className="field-header">Box sides Color</h2>
        <input 
        type="color"
        className="cursor-pointer"
        onChange={(e) => setForm((prev) => ({...prev, tokenColor: e.target.value}))}
        />
      </div>
      <MasterBox form={form} isPreview={false} />
      <MasterBoxPreview form={form}/>
      {/* <MasterBox form={form} isPreview={false} /> */}
      <DownloadButton idToSave={PicsToSave.MASTER_BOX} name={null} />

    </div>
  );
};

export default MasterBoxCreation;
