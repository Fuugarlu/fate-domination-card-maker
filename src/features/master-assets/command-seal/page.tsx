"use client";

import { useState } from "react";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import { DownloadButton } from "@/src/components/buttons/DownloadButton";
import defaultCommandSeal from "./images/default-command-seal.png";
import SimpleMasterForm from "@/src/features/master-assets/components/SimpleMasterForm";
import CommandSeal from "./components/CommandSeal";

const emptyState: { pic: string } = {
  pic: defaultCommandSeal.src
};

const CommandSealCreation = () => {
  const [form, setForm] = useState<{ pic: string }>(emptyState);
  return (
    <div>
      <SimpleMasterForm
        emptyState={emptyState}
        setForm={setForm}
        form={form}
        imageCropSettings={IMAGE_CROP_SETTINGS.COMMAND_SEAL}
      />

      <CommandSeal form={form} isPreview={true} />
      <CommandSeal form={form} isPreview={false} />
      
      <DownloadButton idToSave={IMAGE_CROP_SETTINGS.COMMAND_SEAL} name={"command-seal"} />
    </div>
  );
};

export default CommandSealCreation;
