'use server';

import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const deletePost = async (id: string): Promise<ActionResult<null>> => {
  try {
    await prisma.post.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    });

    return {
      ok: true,
      data: null
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error eliminando el post'
    };
  }
};
