'use server';

import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const createPost = async (
  title: string,
  content: any
): Promise<ActionResult<string>> => {
  try {
    const post = await prisma.post.create({
      data: {
        content,
        title
      }
    });

    return {
      ok: true,
      data: post.id
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error creando el post'
    };
  }
};
