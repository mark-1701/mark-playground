import type { Editor } from '@tiptap/core';
import { HandleInsertImage } from '../types';
import { useToolbarState } from '../useToolbarState';
import ToolBarGroup from './components/ToolbarGroup';
import Headings from './tools/Headings';
import InsertImage from './tools/InsertImage';
import Links from './tools/Links';
import Lists from './tools/Lists';
import Marks from './tools/Marks';
import TextAlign from './tools/TextAlign';
import UndoRedo from './tools/UndoRedo';

const tools = [UndoRedo, Marks, Headings, Lists, TextAlign, Links, InsertImage];

type ToolbarProps = {
  editor: Editor;
  onInsertImage: HandleInsertImage;
  isUploadingImage: boolean;
};

export const ToolBar = ({
  editor,
  onInsertImage,
  isUploadingImage
}: ToolbarProps) => {
  const editorState = useToolbarState(editor);

  return (
    <>
      <div className="flex overflow-hidden border-b-2 border-b-gray-300 p-2 ">
        <div className="flex divide-x divide-gray-200">
          {tools.map(Tool => (
            <ToolBarGroup key={Tool.name}>
              <Tool
                editor={editor}
                toolbarState={editorState}
                iconSize={18}
                onInsertImage={onInsertImage}
                isUploadingImage={isUploadingImage}
              />
            </ToolBarGroup>
          ))}
        </div>
      </div>
    </>
  );
};
