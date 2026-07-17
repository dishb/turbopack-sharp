import sharp from "sharp";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return new Response("No file provided", { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const image = sharp(buffer);
  let pipeline = image.rotate();
  pipeline = pipeline.resize({
    width: 100,
    height: 100,
    kernel: sharp.kernel.lanczos3,
  });

  await pipeline.toBuffer();

  return new Response("Success", { status: 200 });
}
