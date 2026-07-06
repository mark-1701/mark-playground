import type { Editor } from '@tiptap/core';
import { PiPrinter } from 'react-icons/pi';
import { publishPost } from '@/actions/post/publish-post';
import Headings from './groups/Headings';
import InsertImage from './groups/InsertImage';
import Links from './groups/Links';
import Lists from './groups/Lists';
import Marks from './groups/Marks';
import TextAlign from './groups/TextAlign';
import UndoRedo from './groups/UndoRedo';
import ToolBarButton from './ui/ToolbarButton';
import ToolBarGroup from './ui/ToolbarGroup';
import { useToolbarState } from './useToolbarState';

type MenuBarProps = {
  editor: Editor;
};

const groups = [UndoRedo, Marks, Headings, Lists, TextAlign, Links];

export const ToolBar = ({ editor }: MenuBarProps) => {
  const editorState = useToolbarState(editor);

  return (
    <>
      <div
        className="flex flex-wrap items-center justify-center divide-x
          divide-gray-200 border-b-2 border-b-gray-200 p-3"
      >
        {groups.map(Group => (
          <ToolBarGroup key={Group.name}>
            <Group editor={editor} toolbarState={editorState} />
          </ToolBarGroup>
        ))}

        <ToolBarGroup>
          <InsertImage editor={editor} />
          <ShowDocument editor={editor} />
        </ToolBarGroup>
      </div>
    </>
  );
};

const ShowDocument = ({ editor }: { editor: Editor }) => {
  return (
    <ToolBarButton
      onClick={async () => {
        const mediaKeys = new Set<string>();

        editor.state.doc.descendants(node => {
          if (node.type.name === 'image' && node.attrs['data-r2-key']) {
            mediaKeys.add(node.attrs['data-r2-key']);
          }
        });

        const postId = '0f2f61af-915d-422d-98f5-74583eab6941';
        const title = `título + ${new Date().toISOString()}`;
        const content = JSON.stringify(editor.getJSON());

        const resp = await publishPost(postId, title, content, [...mediaKeys]);

        if (!resp.ok) {
          // TODO: FALTA RETROALIMENTACIÓN VISUAL AL USUARIO
          console.log('Ocurrió un error');
        }
      }}
      className="flex gap-2"
    >
      <PiPrinter size={24} className="text-gray-700" />
      Print
    </ToolBarButton>
  );
};
