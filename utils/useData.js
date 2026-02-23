import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/db.json");

const getData = () => JSON.parse(fs.readFileSync(dataPath, "utf8"));
const saveData = (data) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

export { getData, saveData };
