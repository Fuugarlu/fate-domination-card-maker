import React from "react";
import { formInput } from "../../types/formTypes";
import { CARD_COLORS } from "../../constants/formConsts";
import "./card-color-input.scss";

type Props = {
  form: formInput;
  setForm: React.Dispatch<React.SetStateAction<formInput>>;
};

const CardColorInput = ({ form, setForm }: Props) => {
  const handleColorSettingsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = e.target.value;

    if (selectedValue === "custom") {
      setForm((prev) => ({
        ...prev,
        cardColorSettings: {
          ...prev.cardColorSettings,
          settings: "custom",
        },
      }));
      return;
    }

    const selectedColor =
      CARD_COLORS[selectedValue as keyof typeof CARD_COLORS];
    const selectedColorName = selectedColor.settings;

    if (!selectedColorName) return;

    setForm((prev) => ({
      ...prev,
      cardColorSettings: selectedColor,
    }));
  };

  const handleCustomHSLChange = (
    field: "hue" | "saturation" | "brightness",
    value: number,
  ) => {
    setForm((prev) => ({
      ...prev,
      cardColorSettings: {
        ...prev.cardColorSettings,
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col">
      <label className="field-header" htmlFor="cardColorSettings">
        Card Color
      </label>

      <select
        id="cardColorSettings"
        name="cardColorSettings"
        value={form.cardColorSettings?.settings ?? ""}
        onChange={handleColorSettingsChange}
      >
        <option value="default">Default</option>
        <option value="" disabled>
          &#10022; BASE
        </option>
        {CARD_COLORS &&
          Object.keys(CARD_COLORS)
            .filter((key) => CARD_COLORS[key].colorType === "base")
            .map((colorKey) => (
              <option key={colorKey} value={colorKey}>
                {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
              </option>
            ))}
        <option value="" disabled>
          &#10022; CUSTOM
        </option>
        {CARD_COLORS &&
          Object.keys(CARD_COLORS)
            .filter((key) => CARD_COLORS[key].colorType === "custom")
            .map((colorKey) => (
              <option key={colorKey} value={colorKey}>
                {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
              </option>
            ))}
        <option value="custom">Custom</option>
      </select>

      {form.cardColorSettings?.settings === "custom" && (
        <div className="mt-3 flex flex-col gap-2">
          {/* Hue */}
          <label className="flex items-center gap-2">
            <input
              type="range"
              className="card-color-slider"
              min="0"
              max="360"
              id="hueSlider"
              value={form.cardColorSettings.hue ?? 0}
              onChange={(e) =>
                handleCustomHSLChange("hue", Number(e.target.value))
              }
            />

            <input
              type="number"
              min="0"
              max="360"
              value={form.cardColorSettings.hue ?? 0}
              onChange={(e) =>
                handleCustomHSLChange("hue", Number(e.target.value))
              }
              className="card-color-input"
            />
            <span className="input-symbol">°</span>
          </label>

          {/* Saturation */}
          <label className="flex items-center gap-2">
            <input
              type="range"
              className="card-color-slider"
              min="0"
              max="200"
              id="saturationSlider"
              value={(form.cardColorSettings.saturation ?? 0.7) * 100}
              style={{
                background: `linear-gradient(
                to right,
                hsl(${(form.cardColorSettings.hue + 240) % 360}, 0%, 50%),
                hsl(${(form.cardColorSettings.hue + 240) % 360}, 100%, 50%)
            )`,
              }}
              onChange={(e) =>
                handleCustomHSLChange(
                  "saturation",
                  Number(e.target.value) / 100,
                )
              }
            />

            <input
              type="number"
              min="0"
              max="200"
              value={Math.round(
                (form.cardColorSettings.saturation ?? 0.7) * 100,
              )}
              onChange={(e) =>
                handleCustomHSLChange(
                  "saturation",
                  Number(e.target.value) / 100,
                )
              }
              className="card-color-input"
            />
            <span className="input-symbol">%</span>
          </label>

          {/* Brightness */}
          <label className="flex items-center gap-2">
            <input
              type="range"
              className="card-color-slider"
              min="0"
              max="200"
              id="brightnessSlider"
              style={{
                background: `linear-gradient(
                to right,
                #000000 0%,
                hsl(
                    ${(form.cardColorSettings.hue + 240) % 360},
                    ${Math.min(form.cardColorSettings.saturation * 100, 100)}%,
                    50%
                ) 50%,
                #ffffff 100%
                )`,
              }}
              value={(form.cardColorSettings.brightness ?? 0.7) * 100}
              onChange={(e) =>
                handleCustomHSLChange(
                  "brightness",
                  Number(e.target.value) / 100,
                )
              }
            />
            <input
              type="number"
              min="0"
              max="200"
              value={Math.round(
                (form.cardColorSettings.brightness ?? 0.7) * 100,
              )}
              onChange={(e) =>
                handleCustomHSLChange(
                  "brightness",
                  Number(e.target.value) / 100,
                )
              }
              className="card-color-input"
            />
            <span className="input-symbol">%</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default CardColorInput;
