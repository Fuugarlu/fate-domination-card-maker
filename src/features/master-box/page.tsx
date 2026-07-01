"use client";

import { useState } from "react";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { DownloadButton } from "@/src/components/buttons/DownloadButton";
import shirouBox from "./images/shirou-box.png";
import SimpleMasterForm from "@/src/features/master-assets/components/SimpleMasterForm";
import { BoxPicAndColorForm } from "../master-assets/types/formTypes";
import { MasterBox } from "./components/MasterBox";
import { MasterBoxPreview } from "./components/MasterBoxPreview";
import ColorInput from "../master-assets/components/ColorInput";
import { Color } from "@/src/types/colorTypes";

const emptyState: BoxPicAndColorForm = {
  pic: shirouBox.src,
  borderColor: "#3a638a",
};

const MasterBoxCreation = () => {
  const [form, setForm] = useState<BoxPicAndColorForm>(emptyState);
  return (
    <div>
      <SimpleMasterForm
        emptyState={emptyState}
        setForm={setForm}
        form={form}
        imageCropSettings={IMAGE_CROP_SETTINGS.MASTER_BOX}
      />
      <ColorInput
        label={"Box Sides Color"}
        value={form.borderColor}
        handleValue={(color: string) =>
          setForm((prev) => ({
            ...prev,
            borderColor: color as Color,
          }))
        }
      />
      <MasterBox form={form} isPreview={false} />
      <MasterBoxPreview form={form} />
      <DownloadButton
        idToSave={IMAGE_CROP_SETTINGS.MASTER_BOX}
        name={"master-box"}
      />
    </div>
  );
};

export default MasterBoxCreation;
