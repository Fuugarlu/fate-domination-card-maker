import { Color } from "@/src/types/colorTypes";
import { useEffect, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { BiColorFill } from "react-icons/bi";

type SimpleMasterFormInput = {
  label: string;
  handleValue: (color: Color) => void;
  value: Color;
  shape?: "rectangle" | "circle";
  additionalOnCloseFunction?: any;
};

const cover = {
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
};

const BASE_PRESET_COLORS: PresetColorObject[] = [
  { color: "#ff3f24", title: "#ff3f24" },
  { color: "#ff8c00", title: "#ff8c00" },
  { color: "#ebcb3d", title: "#ebcb3d" },
  { color: "#58ff6c", title: "#58ff6c" },
  { color: "#58c2ff", title: "#58c2ff" },
  { color: "#7240d0", title: "#7240d0" },
  { color: "#ffffff", title: "#ffffff" },
  { color: "#000000", title: "#000000" },
];

type PresetColorObject = {
  color: string;
  title: string;
};

const PRESET_COLOR_LOCAL_STORAGE_NAME = "fate-dom-preset-values";

const shapesStyling: Record<string, string> = {
  rectangle: "w-12 h-8 rounded-none",
  circle: "color-circle rounded-full",
};

function isBrightColor(hex: string) {
  let color = hex.replace("#", "");

  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128;
}

const ColorInput = ({
  label,
  handleValue,
  value,
  shape = "rectangle",
  additionalOnCloseFunction = null,
}: SimpleMasterFormInput) => {
  const [showColor, setShowColor] = useState<boolean>(false);
  const [background, setBackground] = useState<string>("#000000");
  const [presetColors, setPresetColors] =
    useState<PresetColorObject[]>(BASE_PRESET_COLORS);

  useEffect(() => {
    if (presetColors != BASE_PRESET_COLORS) saveColorsToLocalStorage();
  }, [presetColors]);

  function saveColorsToLocalStorage(
    colors: PresetColorObject[] = presetColors,
  ) {
    localStorage.setItem(
      PRESET_COLOR_LOCAL_STORAGE_NAME,
      JSON.stringify(colors),
    );
  }

  function handleShowColorPicker() {
    setShowColor(true);
    setBackground(value);
    const localStoragePresetColors = localStorage.getItem(
      PRESET_COLOR_LOCAL_STORAGE_NAME,
    );
    if (!localStoragePresetColors) return BASE_PRESET_COLORS;
    const presetColors = JSON.parse(localStoragePresetColors);
    setPresetColors(presetColors);
  }

  function handleChangeColor(color: Color) {
    setBackground(color.toLowerCase());
    handleValue(color);
  }

  function handleClose() {
    additionalOnCloseFunction?.(background);
    setShowColor(false);
  }

  function savePresetColor() {
    const colorAlreadySaved = presetColors.some(
      (presetColor: PresetColorObject) => presetColor.color === background,
    );
    if (colorAlreadySaved) return;
    setPresetColors((presetColors) => [
      ...presetColors,
      {
        color: background,
        title: background,
      },
    ]);
  }

  function resetPresetColors() {
    setPresetColors(BASE_PRESET_COLORS);
    saveColorsToLocalStorage(BASE_PRESET_COLORS);
  }

  const isColorInPresetList = presetColors.some(
    (presetColor: PresetColorObject) => presetColor.color === background,
  );

  return (
    <div className="">
      {label && <h2 className="field-header">{label}</h2>}
      <div className="flex items-center gap-2 h-10">
        <button onClick={() => handleShowColorPicker()} className="relative">
          <div
            style={{ backgroundColor: value || background }}
            className={`border border-white cursor-pointer ${shapesStyling[shape]}`}
          ></div>
          <BiColorFill
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            fontSize={20}
            style={{
              color: value && isBrightColor(String(value)) ? "black" : "white",
            }}
          />
        </button>

        {showColor && (
          <>
            <div
              style={cover}
              className="z-10 fixed"
              onClick={() => handleClose()}
            />
            <div className="z-20">
              <SketchPicker
                presetColors={presetColors}
                disableAlpha={true}
                onChange={(e: ColorResult) => handleChangeColor(e.hex as Color)}
                color={background}
                styles={{
                  default: {
                    picker: {
                      color: "#000",
                      borderRadius: 0,
                    },
                  },
                }}
              />
              <div className="w-full bg-white p-1" style={{ color: "black" }}>
                <div className="flex gap-1 flex-col">
                  <div className="flex gap-1 w-full h-1/2">
                    <button
                      className={`p-1 w-1/2 h-1/2 bg-gray-300 rounded flex flex-grow justify-center ${isColorInPresetList ? "opacity-50" : "cursor-pointer"}`}
                      onClick={() => savePresetColor()}
                      disabled={isColorInPresetList}
                    >
                      {isColorInPresetList ? "Saved" : "Save color"}
                    </button>
                    <button
                      className="p-1 w-1/2 bg-gray-300 rounded flex flex-grow justify-center cursor-pointer"
                      onClick={() => resetPresetColors()}
                    >
                      Reset colors
                    </button>
                  </div>
                  <button
                    className="p-1 bg-blue-500 rounded cursor-pointer hover:bg-blue-400"
                    onClick={() => handleClose()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => handleChangeColor(e.target.value as Color)}
          maxLength={7}
          style={{ width: "100px" }}
        />
      </div>
    </div>
  );
};

export default ColorInput;
