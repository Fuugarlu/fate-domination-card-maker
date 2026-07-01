import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import React, { useEffect, useState } from "react";

import { FaBold, FaItalic } from "react-icons/fa";
import { MenuBarState, menuBarStateSelector } from "./MenuBarState";

import { MdTextIncrease, MdTextDecrease } from "react-icons/md";

import {
  strength,
  agility,
  magic,
  special,
  noblephantasm,
} from "@/public/attack-types-text";
import { capitalizeString } from "@/src/utils/TextUtils";
import ColorInput from "@/src/features/master-assets/components/ColorInput";

const emojiList = [
  { name: "strength", image: strength },
  { name: "agility", image: agility },
  { name: "magic", image: magic },
  { name: "special", image: special },
  { name: "noblephantasm", image: noblephantasm },
];

const DEFAULT_TEXT_SIZE = 30;

export const MenuBar = ({
  editor,
  setLastFontUsed,
}: {
  editor: Editor | null;
  setLastFontUsed: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (!editor) {
    return null;
  }
  const editorState: MenuBarState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  const [fontSizeInput, setFontSizeInput] = useState<number>(DEFAULT_TEXT_SIZE);

  function handleFontSizeInput(editor: Editor, newFontSize: any): void {
    const newSizeString = newFontSize + "px";
    editor
      .chain()
      .selectAll()
      .setFontSize(`${newSizeString}`)
      .setLineHeight("1.1")
      .setTextSelection(editor.state.doc.content.size)
      .run();
    setLastFontUsed(newSizeString);
  }

  useEffect(() => {
    const currentFontSizeString = editor.getAttributes("textStyle").fontSize || DEFAULT_TEXT_SIZE + "px";
    const currentFontSize = currentFontSizeString.slice(0, -2) as number;
    setFontSizeInput(currentFontSize);
  }, [editor.getAttributes("textStyle").fontSize]);

  function incrementFontSize(editor: Editor, increment: boolean): void {
    const currentSize =
      editor.getAttributes("textStyle").fontSize || DEFAULT_TEXT_SIZE;
    const numericSize = parseFloat(currentSize);
    const newSize = increment ? numericSize + 2 : numericSize - 2;
    const newSizeString = newSize + "px";
    const end = editor.state.doc.content.size;
    editor
      .chain()
      .focus()
      .selectAll()
      .setFontSize(`${newSizeString}`)
      .setLineHeight("1.1")
      .setTextSelection(editor.state.doc.content.size)
      .run();
    setLastFontUsed(newSizeString);
  }

  function addEmoji(editor: Editor, emojiName: string): void {
    const currentSize =
      editor.getAttributes("textStyle").fontSize || DEFAULT_TEXT_SIZE;
    editor
      .chain()
      .focus()
      .insertContent({
        type: "emoji",
        attrs: {
          name: emojiName,
        },
      })
      .run();

    const currentSelection = editor.state.selection.to;
    editor
      .chain()
      .focus()
      .selectAll()
      .setFontSize(currentSize)
      .setColor("#ffffff")
      .setTextSelection(currentSelection)
      .run();
  }

 /**
  * Sets the I-Beam to the position it was before opening the color picker.
  */
  const setIBeamPosition = (color: string) => {
    const isTextSelected = editor.state.selection.$to.pos != editor.state.selection.$from.pos;
    const selectedText = editor.state.selection;
    const cursorPosition = editor.state.selection.$to.pos;
    editor
      .chain()
      .focus()
      .setTextSelection(
        isTextSelected? selectedText : cursorPosition
      )
      .setColor(color)
      .run();
  };

  return (
    // <div className="w-full flex overflow-x-auto">
    <div className="w-full flex overflow-visible">
      <nav className="flex flex-col w-full p-2 bg-gray-700 rounded-t">
        {/* Text style buttons */}
        <div className="flex items-center gap-3 py-2 bg-gray-700 rounded-t">
          <div className="flex items-center gap-0">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editorState.canBold}
              className={`menu-bar-button ${editorState.isBold ? "is-active bg-blue-500 hover:bg-blue-400" : ""}`}
              title="Bold"
            >
              <FaBold />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editorState.canItalic}
              className={`menu-bar-button ${editorState.isItalic ? "is-active bg-blue-500 hover:bg-blue-400" : ""}`}
              title="Italic"
              style={{ marginLeft: -1 }}
            >
              <FaItalic />
            </button>
          </div>

          {/* Font size controls */}
          <div className="flex items-center gap-0">
            <button
              type="button"
              onClick={() => incrementFontSize(editor, false)}
              className="menu-bar-button text-xl"
              title="Decrease font"
            >
              <MdTextDecrease />
            </button>

            <div className="border border-black w-12 h-10 ">
              <input
                type="number"
                className="w-12 h-full flex items-center justify-center bg-primary-dark-blue border-0 text-center"
                style={{ marginLeft: -1 }}
                value={fontSizeInput}
                onChange={(e) => handleFontSizeInput(editor, e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={() => incrementFontSize(editor, true)}
              className="menu-bar-button text-xl"
              title="Increase font"
              style={{ marginLeft: -1 }}
            >
              <MdTextIncrease />
            </button>
          </div>

          {/* Emoji buttons */}
          <div className="flex items-center gap-0">
            {emojiList.map(({ name, image }, idx) => (
              <button
                key={name}
                type="button"
                onClick={() => addEmoji(editor, name)}
                className="menu-bar-button"
                title={capitalizeString(name)}
                style={{ marginLeft: idx === 0 ? 0 : -1 }}
              >
                <img
                  src={image.src}
                  alt={capitalizeString(name)}
                  className="w-8 h-8 object-contain"
                />
              </button>
            ))}
          </div>
        </div>
        {/* Colors */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => editor.chain().focus().setColor("#ff3f24").run()}
            className={`menu-bar-button ${editorState.isRed ? "is-active" : ""}`}
            data-testid="setRed"
          >
            <div
              className="color-circle"
              style={{ backgroundColor: "#ff3f24" }}
            ></div>
          </button>

          <button
            onClick={() => editor.chain().focus().setColor("#58ff6c").run()}
            className={`menu-bar-button no-left-border ${editorState.isGreen ? "is-active" : ""}`}
            data-testid="setGreen"
          >
            <div
              className="color-circle"
              style={{ backgroundColor: "#58ff6c" }}
            ></div>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#58c2ff").run()}
            className={`menu-bar-button no-left-border ${editorState.isBlue ? "is-active" : ""}`}
            data-testid="setBlue"
          >
            <div
              className="color-circle"
              style={{ backgroundColor: "#58c2ff" }}
            ></div>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#ebcb3d").run()}
            className={`menu-bar-button no-left-border ${editorState.isYellow ? "is-active" : ""}`}
            data-testid="setYellow"
          >
            <div
              className="color-circle"
              style={{ backgroundColor: "#ebcb3d" }}
            ></div>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#ffffff").run()}
            className={`menu-bar-button no-left-border`}
            data-testid="setWhite"
          >
            <div
              className="color-circle"
              style={{ backgroundColor: "#ffffff" }}
            ></div>
          </button>
          <span className="flex items-center border border-black no-left-border h-10">
            <div className="mx-2">
              <ColorInput
                label=""
                value={editorState.color}
                handleValue={(color: string) =>
                  editor.chain().setColor(color).run()
                }
                shape={"circle"}
                additionalOnCloseFunction={(color: string) => setIBeamPosition(color)}
              />
            </div>
          </span>
        </div>
      </nav>
    </div>
  );
};
