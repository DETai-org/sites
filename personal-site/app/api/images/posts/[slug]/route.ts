import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const imageMap: Record<string, { file: string; contentType: string }> = {
  "eta-istoriya-pro-odnogo-cheloveka": {
    file: "wordpress-data/uploads/2023/07/maxresdefault.jpg",
    contentType: "image/jpeg",
  },
};

export async function GET(
  _request: Request,
  context: { params: { slug: string } },
) {
  const entry = imageMap[context.params.slug];

  if (!entry) {
    return new NextResponse("Not found", { status: 404 });
  }

  const absolutePath = path.resolve(process.cwd(), entry.file);

  try {
    const buffer = await readFile(absolutePath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": entry.contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Не удалось прочитать изображение:", error);
    return new NextResponse("Ошибка чтения изображения", { status: 500 });
  }
}
