'use server';

import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const replaceDraftPost = async (
  draftPostId: string,
  title: string,
  content: any,
): Promise<ActionResult<string>> => {
  try {
    const [_, newPost] = await prisma.$transaction([
      prisma.post.update({
        where: { id: draftPostId },
        data: {
          deletedAt: new Date()
        }
      }),
      prisma.post.create({
        data: {
          content,
          title
        }
      })
    ]);
    return {
      ok: true,
      data: newPost.id
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error reemplazando el nuevo draft post'
    };
  }
};
