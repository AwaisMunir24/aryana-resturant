import { promises as fs } from "fs";
import path from "path";

const URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const TZ = "Asia/Karachi";

export const dayOf = (t) => new Date(t).toLocaleDateString("en-CA", { timeZone: TZ });

async function redis(...cmd) {
  const r = await fetch(URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

const dir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), ".data");
const file = (n) => path.join(dir, n);
async function readJson(n, fallback) {
  try { return JSON.parse(await fs.readFile(file(n), "utf8")); } catch { return fallback; }
}
async function writeJson(n, data) {
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(file(n), JSON.stringify(data));
}

export async function saveOrder(order) {
  if (URL && TOKEN) { await redis("RPUSH", "orders", JSON.stringify(order)); return; }
  const all = await readJson("orders.json", []);
  all.push(order);
  await writeJson("orders.json", all);
}

export async function readOrders() {
  if (URL && TOKEN) return ((await redis("LRANGE", "orders", 0, -1)) || []).map((s) => JSON.parse(s));
  return readJson("orders.json", []);
}

export async function readDelivered() {
  if (URL && TOKEN) {
    const flat = (await redis("HGETALL", "delivered")) || [];
    const out = {};
    for (let i = 0; i < flat.length; i += 2) out[flat[i]] = flat[i + 1];
    return out;
  }
  return readJson("delivered.json", {});
}

export async function setDelivered(id, delivered) {
  if (URL && TOKEN) {
    if (delivered) await redis("HSET", "delivered", id, new Date().toISOString());
    else await redis("HDEL", "delivered", id);
    return;
  }
  const dl = await readJson("delivered.json", {});
  if (delivered) dl[id] = new Date().toISOString();
  else delete dl[id];
  await writeJson("delivered.json", dl);
}