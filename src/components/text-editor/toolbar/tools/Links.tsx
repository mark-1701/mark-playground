import { useCallback } from 'react';
import { PiLink, PiLinkBreak } from 'react-icons/pi';
import ToolBarButton from '../components/ToolbarButton';
import type { ToolProps } from '../../types';

const Links = ({ editor, toolbarState, iconSize }: ToolProps) => {
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
        <PiLink size={iconSize} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!toolbarState.isLink}
      >
        <PiLinkBreak
          size={iconSize}
          className={toolbarState.isLink ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
    </>
  );
};

export default Links;
