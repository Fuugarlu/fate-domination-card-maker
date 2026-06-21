"use client";

import { useState } from "react";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { DownloadButton } from "@/src/components/buttons/DownloadButton";
import shirouStandee from "./images/shirou-standee.png";
import SimpleMasterForm from "@/src/features/master-assets/components/SimpleMasterForm";
import { MasterAsset } from "../components/MasterAsset";
import { MasterPicAndColorForm } from "../types/formTypes";
import ColorInput from "../components/ColorInput";

const emptyState: MasterPicAndColorForm = {
  pic: shirouStandee.src,
  borderColor: "#000000",
};

const assetType = IMAGE_CROP_SETTINGS.STANDEE;

const MasterStandeeCreation = () => {
  const [form, setForm] = useState<MasterPicAndColorForm>(emptyState);
  return (
    <div>
      <SimpleMasterForm
        emptyState={emptyState}
        setForm={setForm}
        form={form}
        imageCropSettings={assetType}
      />
      <ColorInput form={form} setForm={setForm}/>
      <MasterAsset form={form} isPreview={true} assetType={assetType}/>
      <MasterAsset form={form} isPreview={false} assetType={assetType}/>
      <DownloadButton idToSave={assetType} name={"master-standee"} />
    </div>
  );
};

export default MasterStandeeCreation;
