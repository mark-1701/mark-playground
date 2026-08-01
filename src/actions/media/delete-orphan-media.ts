'use server';

import { MediaStatus } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const deleteOrphanMedia = async (
  keys: string[]
): Promise<ActionResult<null>> => {
  try {
    await prisma.media.updateMany({
      where: {
        AND: [{ r2Key: { in: keys } }, { status: MediaStatus.ORPHAN }]
      },
      data: {
        status: MediaStatus.DELETED
      }
    });

    return {
      ok: true,
      data: null
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error eliminando recursos huerfanos'
    };
  }
};
