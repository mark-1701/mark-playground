'use server';

import { Media } from '@/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const registerMedia = async (
  postId: string,
  key: string
): Promise<ActionResult<Media>> => {
  try {
    const media = await prisma.media.create({
      data: {
        r2Key: key,
        postId
      }
    });
    return {
      ok: true,
      data: media
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error registrando el recurso'
    };
  }
};
