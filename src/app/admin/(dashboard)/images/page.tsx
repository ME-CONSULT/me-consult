import { listImages } from "@/lib/r2";
import AdminImagesClient from "@/components/admin/AdminImagesClient";

export default async function AdminImagesPage() {
  const images = await listImages();
  return <AdminImagesClient initialImages={images} />;
}
