import { Editor } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";
import { BiColorFill } from "react-icons/bi";
import { MenuBarState } from "../MenuBarState";

import "./styles/color-picker.scss";
import { Color } from "react-color";

type props = {
  editorState: MenuBarState;
  editor: Editor;
};

const MyColorPicker = ({ editorState, editor }: props) => {
  const [chosenColor, setChosenColor] = useState<Color>();
  const [customButtonColor, setCustomButtonColor] = useState<Color>();

  useEffect(() => {
    setChosenColor(editorState.color);
  }, [editorState.color]);

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

    // return brightness > 128;
    // 128 is the best threshold option to change icon color based on the brightness but I like that the main 4 colors all have the same icon color if I set it to 110
    return brightness > 110;
  }

  const colorInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-row items-center">
      <div className="flex justify-center items-center w-10 h-10 relative menu-bar-button no-left-border">
        <input
          ref={colorInputRef}
          type="color"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            editor.chain().focus().setColor(event.currentTarget.value).run();
            setChosenColor(event.target.value);
          }}
          value={String(chosenColor) ?? "#000000"}
          data-testid="setColor"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0 rounded-full cursor-pointer"
          style={{ width: 32, height: 32 }}
        />
        <BiColorFill
          onClick={() => colorInputRef.current?.click()}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          fontSize={20}
          style={{
            color:
              chosenColor && isBrightColor(String(chosenColor)) ? "black" : "white",
          }}
        />
      </div>
      <input
        type="text"
        value={String(chosenColor) ?? ""}
        onChange={(e) => {
          editor.chain().setColor(e.currentTarget.value).run();
          setChosenColor(e.target.value);
        }}
        maxLength={7}
        className="color-picker-hex-input no-left-border"
      />
      <div
        onClick={() => setCustomButtonColor(chosenColor)}
        className="flex flex-col w-10 h-10 menu-bar-button no-left-border text-sm"
      >
        <span>Save</span>
        <span>Color</span>
      </div>
      {customButtonColor && (
        <button
          onClick={() =>
            editor.chain().focus().setColor(String(customButtonColor)).run()
          }
          className={`menu-bar-button no-left-border`}
          data-testid="setGreen"
        >
          <div
            className="rounded-full color-circle"
            style={{ backgroundColor: String(customButtonColor) }}
          ></div>
        </button>
      )}
    </div>
  );
};

export default MyColorPicker;
