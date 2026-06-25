import ColorInput from "./ColorInput";
import { Color } from "../types/formTypes";

type SimpleMasterFormInput = {
  setColors: (colors: Color[]) => void;
  colors: Color[];
};

const GradientColor = ({ setColors, colors }: SimpleMasterFormInput) => {
  function addColor() {
    setColors([...colors, "#000000" as Color]);
  }

  function updateColor(color: Color, index: number) {
    setColors(colors.map((c, i) => (i === index ? (color as Color) : c)));
  }

  function deleteColor(index: number) {
    setColors(colors.filter((c, i) => i != index));
  }

  return (
    <div className="flex flex-col max-w-[400px]">
      {colors &&
        colors.map((color, i) => (
          <div className="flex flex-row items-end mb-2 gap-2" key={i}>
            <ColorInput
              handleValue={(color: Color) => updateColor(color, i)}
              label={`Add Gradient Color ${i + 1}`}
              value={color}
            />
            <button disabled={colors.length <= 1} onClick={() => deleteColor(i)} className="h-10 bg-gray-700 rounded-lg p-1 cursor-pointer">DELETE</button>
          </div>
        ))}
        <button onClick={addColor} className="bg-blue-500 rounded p-1 cursor-pointer mb-2">Add Gradient</button>
    </div>
  );
};

export default GradientColor;
