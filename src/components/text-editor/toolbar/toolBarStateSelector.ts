import type { ToolbarState } from '@/types';
import { Editor, EditorStateSnapshot } from '@tiptap/react';

export const toolBarStateSelector = ({
  editor
}: EditorStateSnapshot<Editor>): ToolbarState => {
  return {
    isBold: editor.isActive('bold') ?? false,
    isItalic: editor.isActive('italic') ?? false,
    isStrike: editor.isActive('strike') ?? false,
    isUnderline: editor.isActive('underline') ?? false,
    isHighlight: editor.isActive('highlight') ?? false,

    isHeading1: editor.isActive('heading', { level: 1 }) ?? false,
    isHeading2: editor.isActive('heading', { level: 2 }) ?? false,
    isHeading3: editor.isActive('heading', { level: 3 }) ?? false,
    isHeading4: editor.isActive('heading', { level: 4 }) ?? false,
    isHeading5: editor.isActive('heading', { level: 5 }) ?? false,
    isHeading6: editor.isActive('heading', { level: 6 }) ?? false,

    isLeft: editor.isActive({ textAlign: 'left' }) ?? false,
    isCenter: editor.isActive({ textAlign: 'center' }) ?? false,
    isRight: editor.isActive({ textAlign: 'right' }) ?? false,

    isBulletList: editor.isActive('bulletList') ?? false,
    isOrderedList: editor.isActive('orderedList') ?? false,

    canUndo: editor.can().chain().focus().undo().run(),
    canRedo: editor.can().chain().focus().redo().run(),

    isLink: editor.isActive('link')
  };
};
