import sharp from "sharp";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return new Response("No file provided", { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const image = sharp(buffer);
  const metadata = await image.metadata();
  let pipeline = image.rotate();
  pipeline = pipeline.resize({
    width: 100,
    height: 100,
    fit: "cover",
    withoutEnlargement: true,
    kernel: sharp.kernel.lanczos3,
  });
  const result = await pipeline.jpeg({ quality: 95, mozjpeg: true }).toBuffer();

  return new Response(result, { status: 200 });
}
