import path from "path";
import { mkdir } from "fs/promises";
import sharp from "sharp";

const [sourceArg, outputArg] = process.argv.slice(2);

const source = sourceArg
  ? path.resolve(process.cwd(), sourceArg)
  : path.resolve(process.cwd(), "wordpress-data", "uploads", "2023", "07", "maxresdefault.jpg");

const output = outputArg
  ? path.resolve(process.cwd(), outputArg)
  : path.resolve(
      process.cwd(),
      "public",
      "images",
      "posts",
      "eta-istoriya-pro-odnogo-cheloveka.webp",
    );

await mkdir(path.dirname(output), { recursive: true });

await sharp(source)
  .resize({ width: 1280 })
  .webp({ quality: 82 })
  .toFile(output);

console.log(`Готово: ${output}`);
