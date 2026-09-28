"use client";

import { useState } from "react";
import { DownloadButton } from "@/src/components/buttons/DownloadButton";
import defaultCommandSeal from "./images/default-command-seal.png";
import SimpleMasterForm from "@/src/features/master-assets/components/SimpleMasterForm";
import CommandSeal from "./components/CommandSeal";
import { IMAGE_CROP_SETTINGS } from "@/src/constants/cropConstants";
import CustomCommandSealNameOptions from "./components/CustomCommandSealNameOptions";
import { NAME_FIELD_SIZES } from "@/src/constants/formConstants";

const emptyState: { pic: string; name: string, nameFieldSize: NAME_FIELD_SIZES } = {
  pic: defaultCommandSeal.src,
  name: "Command Seal",
  nameFieldSize: NAME_FIELD_SIZES.short, 
};

const CommandSealCreation = () => {
  const [form, setForm] = useState<{ pic: string; name: string, nameFieldSize: NAME_FIELD_SIZES }>(emptyState);
  return (
    <div>
      <SimpleMasterForm
        emptyState={emptyState}
        setForm={setForm}
        imageCropSettings={IMAGE_CROP_SETTINGS.COMMAND_SEAL}
      />

      <CustomCommandSealNameOptions setForm={setForm} defaultName={form.name} nameFieldSize={form.nameFieldSize} />

      <CommandSeal form={form} isPreview={true} />
      <CommandSeal form={form} isPreview={false} />
      
      <DownloadButton idToSave={IMAGE_CROP_SETTINGS.COMMAND_SEAL} name={IMAGE_CROP_SETTINGS.COMMAND_SEAL} />
    </div>
  );
};

export default CommandSealCreation;
