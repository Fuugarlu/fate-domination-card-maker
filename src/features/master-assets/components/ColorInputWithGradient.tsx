import React, { SetStateAction } from "react";
import { MdSwapHoriz } from "react-icons/md";
import ColorInput from "./ColorInput";
import { MasterPicAndColorForm } from "../types/formTypes";
import GradientColor from "./GradientColor";
import { Color } from "@/src/types/colorTypes";

type props = {
  form: MasterPicAndColorForm,
  setForm: React.Dispatch<SetStateAction<MasterPicAndColorForm>>
}

const ColorInputWithGradient = ({form, setForm}: props) => {
  return (
    <div>
      {form.colorMode == "solid" && (
        <div className="mb-2">
          <ColorInput
            label={"Border Color"}
            value={form.borderColor}
            handleValue={(color: string) =>
              setForm((prev) => ({
                ...prev,
                borderColor: color as Color,
              }))
            }
          />
        </div>
      )}
      {form.colorMode == "gradient" && (
        <GradientColor
          colors={form.gradientColors}
          setColors={(colors) =>
            setForm((prev) => ({
              ...prev,
              gradientColors: colors,
            }))
          }
        />
      )}
      <button
        onClick={() =>
          setForm((prev) => ({
            ...prev,
            colorMode: prev.colorMode === "solid" ? "gradient" : "solid",
          }))
        }
        className="bg-gray-700 py-1 px-2 cursor-pointer rounded"
      >
        <span className="flex items-center gap-1">
          <MdSwapHoriz />{" "}
          {form.colorMode === "solid"
            ? "Use gradient colors"
            : "Use a solid color"}
        </span>
      </button>
    </div>
  );
};

export default ColorInputWithGradient;
