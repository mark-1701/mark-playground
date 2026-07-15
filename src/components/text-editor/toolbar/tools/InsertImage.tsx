import { useRef } from 'react';
import { PiImage } from 'react-icons/pi';
import { ToolProps } from '../../types';
import ToolBarButton from '../components/ToolbarButton';

const InsertImage = ({
  editor,
  iconSize,
  onInsertImage,
  isUploadingImage
}: ToolProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onInsertImage(editor, file);
        }}
      />

      <ToolBarButton
        disabled={isUploadingImage}
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center gap-1 disabled:opacity-70"
      >
        +
        <PiImage size={iconSize} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default InsertImage;
