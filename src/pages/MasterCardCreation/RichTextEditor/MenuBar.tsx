import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import React from "react";

import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { MenuBarState, menuBarStateSelector } from "./MenuBarState";

import { MdTextIncrease } from "react-icons/md";
import { MdTextDecrease } from "react-icons/md";

import { strength, agility, magic, special, noblephantasm } from "@/public/attack-types-text";
import { capitalizeString } from "@/src/app/utils/TextUtils";

const emojiList = [
  { name: "strength", image: strength },
  { name: "agility", image: agility },
  { name: "magic", image: magic },
  { name: "special", image: special },
  { name: "noblephantasm", image: noblephantasm },
];

const DEFAULT_TEXT_SIZE = "30px";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
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
    const newSize = increment ? numericSize + 2 : numericSize - 2; // Increments or decrements by 2px
    const end = editor.state.doc.content.size;
    editor
      .chain()
      .focus()
      .selectAll()
      .setFontSize(`${newSize}px`)
      .setLineHeight("1.1")
      .setTextSelection(editor.state.doc.content.size)
      .run();
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

    // TODO: put this in a util function? or edit all of them
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
    <div className="w-full overflow-x-auto">
      <nav className="flex items-center gap-8 p-2 bg-gray-700 rounded-t">
        {/* Text style buttons */}
        <div className="flex items-center gap-0">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            className={`w-10 h-10 flex items-center justify-center border border-black cursor-pointer ${editorState.isBold ? "is-active bg-blue-500" : ""}`}
            title="Bold"
          >
            <FaBold />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            className={`w-10 h-10 flex items-center justify-center border border-black cursor-pointer ${editorState.isItalic ? "is-active bg-blue-500" : ""}`}
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
            className="w-10 h-10 flex items-center justify-center border border-black cursor-pointer text-xl"
            title="Decrease font"
          >
            <MdTextDecrease />
          </button>

          <div
            className="w-10 h-10 flex items-center justify-center border border-black bg-blue-500 text-center"
            style={{ marginLeft: -1 }}
          >
            <div className="text-sm">
              {editor.getAttributes("textStyle").fontSize || DEFAULT_TEXT_SIZE}
            </div>
          </div>

          <button
            type="button"
            onClick={() => changeFontSize(editor, true)}
            className="w-10 h-10 flex items-center justify-center border border-black cursor-pointer text-xl"
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
              className="w-10 h-10 flex items-center justify-center border border-black cursor-pointer"
              title={capitalizeString(name)}
              style={{ marginLeft: idx === 0 ? 0 : -1 }}
            >
              <img src={image.src} alt={capitalizeString(name)} className="w-8 h-8 object-contain" />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
