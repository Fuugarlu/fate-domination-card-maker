import "./styles/rich-text-editor.scss";

import {
  Color,
  FontSize,
  LineHeight,
  TextStyle,
} from "@tiptap/extension-text-style";
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
import { useEffect, useMemo, useState } from "react";
import FontFamily from "@tiptap/extension-text-style/font-family";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import { UndoRedo } from "@tiptap/extensions";
import attackIconCustomEmojis from "./consts/attackIconCustomEmojis";
import { MenuBar } from "./MenuBar/MenuBar";

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
    content: masterAbility,
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

        const currentFontSize =
          editor.getAttributes("textStyle").fontSize || "30px";

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

  const [lastFontUsed, setLastFontUsed] = useState<string>("30px");

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      if (editor.isEmpty) {

        editor
          .chain()
          .focus()
          .selectAll()
          .setTextSelection(editor.state.doc.content.size)
          .setFontSize(lastFontUsed)
          .run();
      }
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, lastFontUsed]);

  useEffect(() => {
    if (editor && masterAbility == "") {
      editor.commands.clearContent();
    }

  }, [editor, masterAbility])
  
  
  return (
    <div className="flex flex-col w-full overflow-scroll">
      {editor && (
        <>
          <MenuBar editor={editor} setLastFontUsed={setLastFontUsed} />
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
};

export default RichTextEditor;
