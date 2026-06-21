import React from "react";
import { Color, MasterPicAndColorForm } from "../types/formTypes";

type SimpleMasterFormInput = {
    setForm: React.Dispatch<React.SetStateAction<MasterPicAndColorForm>>,
    form: MasterPicAndColorForm,
}

const ColorInput = ({setForm, form}: SimpleMasterFormInput) => {
  return (
    <div>
      <h2 className="field-header">Border Color</h2>
      <input
      value={form.borderColor}
        type="color"
        className="cursor-pointer"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, borderColor: e.target.value as Color }))
        }
      />
    </div>
  );
};

export default ColorInput;
