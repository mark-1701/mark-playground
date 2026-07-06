import { MediaStatus } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';

export const mediaStatusOperations = (postId: string, keys: string[]) => [
  prisma.media.updateMany({
    where: {
      AND: [{ r2Key: { in: keys } }, { postId }]
    },
    data: { status: MediaStatus.ATTACHED }
  }),
  prisma.media.updateMany({
    where: { r2Key: { notIn: keys } },
    data: { status: MediaStatus.ORPHAN }
  })
];
