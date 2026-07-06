'use server';

import { Post } from '@/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';
import { mediaStatusOperations } from '../media/media-status-operations';

export const publishPost = async (
  postId: string,
  title: string,
  content: string,
  mediakeys: string[]
) => {
  try {
    const contentJSON = JSON.parse(content);

    await prisma.$transaction([
      prisma.post.update({
        where: {
          id: postId
        },
        data: {
          title,
          content: contentJSON
        }
      }),
      ...mediaStatusOperations(postId, mediakeys)
    ]);

    return {
      ok: true
    };
  } catch (error: any) {
    return {
      ok: false,
      message: 'Error publicando el post'
    };
  }
};
