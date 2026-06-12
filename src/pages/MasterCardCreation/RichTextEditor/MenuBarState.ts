import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

/**
 * State selector for the MenuBar component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    // Text formatting
    isBold: ctx.editor.isActive('bold') ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive('italic') ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
  }
}


export type MenuBarState = ReturnType<typeof menuBarStateSelector>