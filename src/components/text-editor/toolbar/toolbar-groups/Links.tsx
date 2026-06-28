import { MenuBarEditorState } from '@/types';
import type { Editor } from '@tiptap/core';
import { useCallback } from 'react';
import { PiLink, PiLinkBreak } from 'react-icons/pi';
import ToolBarButton from '../ToolbarButton';

const Links = ({
  editor,
  editorState
}: {
  editor: Editor;
  editorState: MenuBarEditorState;
}) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);
  return (
    <>
      <ToolBarButton onClick={setLink}>
        <PiLink size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editorState.isLink}
      >
        <PiLinkBreak
          size={24}
          className={editorState.isLink ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
    </>
  );
};

export default Links;