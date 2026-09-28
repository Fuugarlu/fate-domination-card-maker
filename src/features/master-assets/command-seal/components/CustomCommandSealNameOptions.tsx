import NameLength from "@/src/components/form/NameLength";
import { NAME_FIELD_SIZES } from "@/src/constants/formConstants";
import React, { useState } from "react";

const CustomCommandSealNameOptions = ({
  setForm,
  defaultName,
  nameFieldSize,
}: {
  setForm: React.Dispatch<
    React.SetStateAction<{
      pic: string;
      name: string;
      nameFieldSize: NAME_FIELD_SIZES;
    }>
  >;
  defaultName: string;
  nameFieldSize: NAME_FIELD_SIZES;
}) => {
  const [customName, setCustomName] = useState(defaultName);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomName(e.target.value);
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleNameFieldSizeChange = (
    value: NAME_FIELD_SIZES
  ) => {
    setForm((prev) => ({ ...prev, nameFieldSize: value }));
  };

  return (
    <div>
      <NameLength nameFieldSize={nameFieldSize} updateForm={handleNameFieldSizeChange} />

      <label>
        <div className="flex flex-col gap-1 text-bold">
          Command Seal Name:
          <input
            type="text"
            name="customName"
            value={customName}
            onChange={(e) => handleNameChange(e)}
          />
        </div>
      </label>
    </div>
  );
};

export default CustomCommandSealNameOptions;
