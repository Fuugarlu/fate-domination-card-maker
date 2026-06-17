import { formInput } from "@/src/types/formTypes";
import React, { ChangeEvent, useRef } from "react";

type Props = {
  form: formInput;
  setForm: React.Dispatch<React.SetStateAction<formInput>>;
};

import { FaFileDownload } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";

export const ExportImportFeature = (prop: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleExport = () => {
    const jsonString = JSON.stringify(prop.form, null, 2);
    console.log(jsonString);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    const cardName = prop.form.masterName;
    link.download = cardName ? cardName + ".json" : "card.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(
          event.target?.result as string,
        ) as formInput;

        // Basic validation to ensure keys match
        if (importedData && typeof importedData === "object") {
          prop.setForm(importedData);
        }
      } catch (error) {
        console.error("Invalid JSON file:", error);
        alert("Failed to parse JSON file");
      }
    };
    reader.readAsText(file);

    // Reset input so the same file can be re-uploaded if changed externally
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="import-export-button bg-blue-500 hover:bg-blue-400"
      >
        <FaFileDownload />
        Export
      </button>
      <button onClick={() => fileInputRef.current?.click()}>
        <span className="import-export-button bg-blue-500 hover:bg-blue-400">
          <FaFileUpload />
          Import
        </span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleImport}
        style={{ display: "none" }}
      />
    </div>
  );
};
