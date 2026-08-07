import type { Editor } from '@tiptap/react';

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

export type InsertImage = (
  editor: Editor,
  file: File,
  position?: number
) => void;
