'use server';

import { PostStatus } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';
import { mediaStatusOperations } from '../media/media-status-operations';

export const savePost = async (
  postId: string,
  title: string,
  content: string,
  mediakeys: string[]
): Promise<ActionResult<null>> => {
  try {
    await prisma.$transaction([
      prisma.post.update({
        where: {
          id: postId
        },
        data: {
          title,
          content,
          status: PostStatus.PUBLISHED
        }
      }),
      ...mediaStatusOperations(postId, mediakeys)
    ]);

    return {
      ok: true,
      data: null
    };
  } catch (error: any) {
    return {
      ok: false,
      message: 'Error publicando el post'
    };
  }
};
