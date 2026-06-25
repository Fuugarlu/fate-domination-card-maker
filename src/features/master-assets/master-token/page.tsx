"use client";

import { useState } from "react";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { DownloadButton } from "@/src/components/buttons/DownloadButton";
import shirouToken from "./images/shirou-token.png";
import SimpleMasterForm from "@/src/features/master-assets/components/SimpleMasterForm";
import { MasterAsset } from "../components/MasterAsset";
import { Color, MasterPicAndColorForm } from "../types/formTypes";
import ColorInput from "../components/ColorInput";
import GradientColor from "../components/GradientColor";
import { IoSwapHorizontal } from "react-icons/io5";
import { MdSwapHoriz } from "react-icons/md";
import ColorInputWithGradient from "../components/ColorInputWithGradient";

const emptyState: MasterPicAndColorForm = {
  pic: shirouToken.src,
  borderColor: "#000000",
  colorMode: "solid",
  gradientColors: ["#ffffff", "#000000"],
};
const assetType = IMAGE_CROP_SETTINGS.TOKEN;

const MasterTokenCreation = () => {
  const [form, setForm] = useState<MasterPicAndColorForm>(emptyState);
  return (
    <div>
      <SimpleMasterForm
        emptyState={emptyState}
        setForm={setForm}
        form={form}
        imageCropSettings={assetType}
      />
      <ColorInputWithGradient form={form} setForm={setForm} />
      <MasterAsset form={form} isPreview={true} assetType={assetType} />
      <MasterAsset form={form} isPreview={false} assetType={assetType} />
      <DownloadButton idToSave={assetType} name={"master-token"} />
    </div>
  );
};

export default MasterTokenCreation;
