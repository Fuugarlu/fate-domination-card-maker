import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import React from "react";

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
import ColorPicker from "./components/ColorPicker";

const emojiList = [
  { name: "strength", image: strength },
  { name: "agility", image: agility },
  { name: "magic", image: magic },
  { name: "special", image: special },
  { name: "noblephantasm", image: noblephantasm },
];

const DEFAULT_TEXT_SIZE = "30px";

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

  function changeFontSize(editor: Editor, increment: boolean): void {
    const currentSize =
      editor.getAttributes("textStyle").fontSize || DEFAULT_TEXT_SIZE;
    const numericSize = parseInt(currentSize, 10);
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

    const end = editor.state.doc.content.size;
    editor
      .chain()
      .focus()
      .selectAll()
      .setFontSize(currentSize)
      .setTextSelection(end)
      .run();
  }

  return (
    <div className="w-full flex overflow-x-auto">
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
              onClick={() => changeFontSize(editor, false)}
              className="menu-bar-button text-xl"
              title="Decrease font"
            >
              <MdTextDecrease />
            </button>

            <div
              className="w-10 h-10 flex items-center justify-center border border-black bg-blue-500 hover:bg-blue-400 text-center"
              style={{ marginLeft: -1 }}
            >
              <div className="text-sm">
                {editor.getAttributes("textStyle").fontSize ||
                  DEFAULT_TEXT_SIZE}
              </div>
            </div>

            <button
              type="button"
              onClick={() => changeFontSize(editor, true)}
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
              className="rounded-full color-circle"
              style={{ backgroundColor: "#ff3f24" }}
            ></div>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#ebcb3d").run()}
            className={`menu-bar-button no-left-border ${editorState.isYellow ? "is-active" : ""}`}
            data-testid="setYellow"
          >
            <div
              className="rounded-full color-circle"
              style={{ backgroundColor: "#ebcb3d" }}
            ></div>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#58c2ff").run()}
            className={`menu-bar-button no-left-border ${editorState.isBlue ? "is-active" : ""}`}
            data-testid="setBlue"
          >
            <div
              className="rounded-full color-circle"
              style={{ backgroundColor: "#58c2ff" }}
            ></div>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#58ff6c").run()}
            className={`menu-bar-button no-left-border ${editorState.isGreen ? "is-active" : ""}`}
            data-testid="setGreen"
          >
            <div
              className="rounded-full color-circle"
              style={{ backgroundColor: "#58ff6c" }}
            ></div>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#ffffff").run()}
            className={`menu-bar-button no-left-border`}
            data-testid="setWhite"
          >
            <div
              className="rounded-full color-circle"
              style={{ backgroundColor: "#ffffff" }}
            ></div>
          </button>
          <ColorPicker editor={editor} editorState={editorState} />
        </div>
      </nav>
    </div>
  );
};
