import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { listImages, uploadDocument, deleteDocument, IMAGES_PREFIX } from "@/lib/r2";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const images = await listImages();
  return NextResponse.json({ images });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Image is larger than 8MB" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const key = `${IMAGES_PREFIX}${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await uploadDocument(key, buffer, file.type);

  return NextResponse.json({ key });
}

export async function DELETE(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key || !key.startsWith(IMAGES_PREFIX)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  await deleteDocument(key);
  return NextResponse.json({ ok: true });
}
