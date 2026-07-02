'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
  }
});

export const createPresignedUpload = async ({
  key,
  fileType
}: {
  key: string;
  fileType: string;
}) => {
  const uploadUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType
    }),
    { expiresIn: 3600 }
  );

  const publicUrl = `${process.env.R2_PUBLIC_URL_BASE}/${key}`;

  return { publicUrl, uploadUrl };
};
