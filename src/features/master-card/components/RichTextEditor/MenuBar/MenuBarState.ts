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

    color: ctx.editor.getAttributes('textStyle').color,
    isRed: ctx.editor.isActive('textStyle', { color: '#F98181' }),
    isYellow: ctx.editor.isActive('textStyle', { color: '#FAF594' }),
    isBlue: ctx.editor.isActive('textStyle', { color: '#70CFF8' }),
    isGreen: ctx.editor.isActive('textStyle', { color: '#B9F18D' }),
  }
}


export type MenuBarState = ReturnType<typeof menuBarStateSelector>