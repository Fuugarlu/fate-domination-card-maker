import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import React from "react";

import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { MenuBarState, menuBarStateSelector } from "./MenuBarState";

import { MdTextIncrease } from "react-icons/md";
import { MdTextDecrease } from "react-icons/md";
import { IconContext } from "react-icons/lib";

import { strength, agility, magic, special } from "@/pics/attack-types";
import { FontSize } from "@tiptap/extension-text-style";

const emojiList = [
  { name: "strength", image: strength },
  { name: "agility", image: agility },
  { name: "magic", image: magic },
  { name: "special", image: special },
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
    editor
      .chain()
      .focus()
      .selectAll()
      .setFontSize(`${newSize}px`)
      .setLineHeight("1.1")
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
    <div className="control-group mb-3">
      <div className="button-group flex gap-2">
        <div>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            className={`p-2 border-1 border-black cursor-pointer ${editorState.isBold ? "is-active bg-blue-500" : ""}`}
          >
            <FaBold />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            className={`p-2 border-1 border-black cursor-pointer ${editorState.isItalic ? "is-active bg-blue-500" : ""}`}
          >
            <FaItalic />
          </button>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => changeFontSize(editor, false)}
            className="p-1 border-1 border-black cursor-pointer text-2xl"
          >
            <MdTextDecrease />
          </button>
          <div className="px-1 bg-blue-500 h-full text-center flex items-center border-1 border-black">
            <div>
              {editor.getAttributes("textStyle").fontSize || DEFAULT_TEXT_SIZE}
            </div>
          </div>
          <button
            onClick={() => changeFontSize(editor, true)}
            className="p-1 border-1 border-black cursor-pointer text-2xl"
          >
            <MdTextIncrease />
          </button>
        </div>

        <div className="flex items-center">
          {emojiList.map(({ name, image }) => (
            <button
              key={name}
              type="button"
              onClick={() => addEmoji(editor, name)}
              className="p-1 border-1 border-black cursor-pointer"
              title={name}
            >
              <img src={image.src} alt={name} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
