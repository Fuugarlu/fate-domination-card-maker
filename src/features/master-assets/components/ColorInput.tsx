import React from "react";
import { Color, MasterPicAndColorForm } from "../types/formTypes";

type SimpleMasterFormInput = {
  setForm: React.Dispatch<React.SetStateAction<MasterPicAndColorForm>>;
  form: MasterPicAndColorForm;
};

const ColorInput = ({ setForm, form }: SimpleMasterFormInput) => {
  return (
    <div className="mb-2">
      <h2 className="field-header">Border Color</h2>
      <div className="flex items-center gap-2 h-10">
        <input
          value={form.borderColor}
          type="color"
          className="cursor-pointer h-full"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              borderColor: e.target.value as Color,
            }))
          }
        />
        <input
          type="text"
          value={form.borderColor ?? ""}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              borderColor: e.target.value as Color,
            }));
          }}
          maxLength={7}
          style={{ width: "100px" }}
        />
      </div>
    </div>
  );
};

export default ColorInput;
