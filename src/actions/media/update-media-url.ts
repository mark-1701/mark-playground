'use server';

import { Media } from '@/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const updateMediaUrl = async (
  id: string,
  url: string
): Promise<ActionResult<Media>> => {
  try {
    const updatedMedia = await prisma.media.update({
      where: { id },
      data: { url }
    });

    return {
      ok: true,
      data: updatedMedia
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error actualizando la url'
    };
  }
};
