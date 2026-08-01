'use server';

import { MediaStatus } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const getOrphanMedia = async (): Promise<ActionResult<string[]>> => {
  try {
    const media = await prisma.media.findMany({
      where: {
        status: MediaStatus.ORPHAN
      }
    });

    const keys = media.map(el => el.r2Key);

    return {
      ok: true,
      data: keys
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error obtiendo la media huerfana'
    };
  }
};
