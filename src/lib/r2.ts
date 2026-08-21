import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.R2_BUCKET_NAME!;
export const IMAGES_PREFIX = "site-images/";

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadDocument(key: string, body: Buffer, contentType: string) {
  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return key;
}

export async function getDocumentDownloadUrl(key: string, expiresInSeconds = 300) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(r2, command, { expiresIn: expiresInSeconds });
}

export async function deleteDocument(key: string) {
  await r2.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export function publicUrlFor(key: string) {
  return `${process.env.R2_PUBLIC_DEV_URL}/${key}`;
}

export async function listImages() {
  const result = await r2.send(
    new ListObjectsV2Command({ Bucket: bucket, Prefix: IMAGES_PREFIX })
  );

  return (result.Contents ?? [])
    .filter((obj) => obj.Key && obj.Key !== IMAGES_PREFIX)
    .map((obj) => ({
      key: obj.Key!,
      size: obj.Size ?? 0,
      lastModified: obj.LastModified?.toISOString() ?? null,
      url: publicUrlFor(obj.Key!),
    }))
    .sort((a, b) => (a.lastModified! < b.lastModified! ? 1 : -1));
}
