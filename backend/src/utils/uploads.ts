import fs from "fs";
import path from "path";

export function deleteDocument(filePath: string) {
  const absolutePath = path.join(__dirname, "../../", filePath);
  fs.unlink(absolutePath, (err) => {});
}
