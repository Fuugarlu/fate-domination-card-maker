"use client";

import { useState } from "react";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { DownloadButton } from "@/src/components/buttons/DownloadButton";
import shirouBox from "./images/shirou-box.png";
import SimpleMasterForm from "@/src/features/master-assets/components/SimpleMasterForm";
import { MasterPicAndColorForm } from "../master-assets/types/formTypes";
import { MasterBox } from "./components/MasterBox";
import { MasterBoxPreview } from "./components/MasterBoxPreview";
import ColorInput from "../master-assets/components/ColorInput";

const emptyState: MasterPicAndColorForm = {
  pic: shirouBox.src,
  borderColor: "#3a638a",
};

const MasterBoxCreation = () => {
  const [form, setForm] = useState<MasterPicAndColorForm>(emptyState);
  return (
    <div>
      <SimpleMasterForm
        emptyState={emptyState}
        setForm={setForm}
        form={form}
        imageCropSettings={IMAGE_CROP_SETTINGS.MASTER_BOX}
      />
      <ColorInput setForm={setForm} form={form}/>
      <MasterBox form={form} isPreview={false} />
      <MasterBoxPreview form={form} />
      <DownloadButton idToSave={IMAGE_CROP_SETTINGS.MASTER_BOX} name={"master-box"} />
    </div>
  );
};

export default MasterBoxCreation;
