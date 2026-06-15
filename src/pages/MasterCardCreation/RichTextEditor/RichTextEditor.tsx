import "./rich-text-editor.scss";

import { Color, FontSize, LineHeight, TextStyle } from "@tiptap/extension-text-style";
import {
  EditorContent,
  EditorContext,
  Mark,
  markPasteRule,
  Tiptap,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import { useMemo } from "react";
import FontFamily from "@tiptap/extension-text-style/font-family";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import { UndoRedo } from "@tiptap/extensions";
import { MenuBar } from "./MenuBar";
import attackIconCustomEmojis from "./attackIconCustomEmojis";

const RichTextEditor = ({
  masterAbility,
  setMasterAbility,
}: {
  masterAbility: string;
  setMasterAbility: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      // Underline, // TODO: maybe? check if needed feature
      Color,
      TextStyle,
      FontSize,
      LineHeight,
      UndoRedo,
      Emoji.configure({
        emojis: [...attackIconCustomEmojis],
        HTMLAttributes: {
          class: "tiptap-emoji",
        },
      }),
    ],
    content: `<p><span style="font-size: 30px; line-height: 1.1;"><em>Example</em> - Add some abilities!</span></p>
    <p><span style="font-size: 30px; line-height: 1.1;"><em>Other example</em> - <strong>Passive/Combat:</strong> Pay 1 Mana to [cry on command].</span></p>`,
    editorProps: {
      attributes: {
        class: "h-40 rounded p-2 border border-gray-300 bg-blue-900 w-full",
      },
      handlePaste(view, event) {
        const text = event.clipboardData?.getData("text/plain");

        if (!text || !editor) {
          return false;
        }

        event.preventDefault();

        const currentFontSize = editor.getAttributes("textStyle").fontSize || "30px";

        editor
          .chain()
          .focus()
          .insertContent({
            type: "text",
            text,
            marks: [
              {
                type: "textStyle",
                attrs: {
                  fontSize: currentFontSize,
                  lineHeight: `1.1`,
                },
              },
            ],
          })
          .run();

        return true;
      },
    },
    onUpdate: ({ editor }) => {
      setMasterAbility(editor.getHTML());
    },
    immediatelyRender: false,
    enablePasteRules: false,
  });

  return (
    <div className="flex flex-col w-full overflow-scroll">
      {editor && (
        <>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
};

export default RichTextEditor;
