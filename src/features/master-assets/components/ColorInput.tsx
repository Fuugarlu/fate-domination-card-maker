import { Color, MasterPicAndColorForm } from "../types/formTypes";

type SimpleMasterFormInput = {
  label: string;
  handleValue: (color: Color) => void;
  value: Color;
};

const ColorInput = ({ label, handleValue, value }: SimpleMasterFormInput) => {
  return (
    <div>
      <h2 className="field-header">{label}</h2>
      <div className="flex items-center gap-2 h-10">
        <input
          value={value ?? ""}
          type="color"
          className="cursor-pointer h-full"
          onChange={(e) => handleValue(e.target.value as Color)}
        />
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => handleValue(e.target.value as Color)}
          maxLength={7}
          style={{ width: "100px" }}
        />
      </div>
    </div>
  );
};

export default ColorInput;
