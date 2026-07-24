'use client';

import clsx from 'clsx';
import React from 'react';
import { IoClose } from 'react-icons/io5';

type DialogProps = {
  header: string;
  visible: boolean;
  footer: React.ReactNode;
  onHide?: () => void;
  children: React.ReactNode;
  // ¿Como tipar un componente que se recibe mediante props?
};

const Dialog = ({
  header,
  visible,
  onHide,
  footer,
  children
}: DialogProps) => {
  return (
    <div
      className={clsx(
        !visible && 'hidden',
        `fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center
        bg-zinc-800/20`
      )}
    >
      <div
        className="flex w-[600px] flex-col gap-6 rounded-lg border
          border-gray-300 bg-white p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{header}</h2>
          {/* <h2 className="text-xl font-bold">Título del dialog</h2> */}
          <IoClose
            size={20}
            className="text-gray-800 hover:cursor-pointer"
            onClick={onHide}
          />
        </div>

        <p>{children}</p>

        {footer}
      </div>
    </div>
  );
};

export default Dialog;
