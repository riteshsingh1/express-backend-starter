import Redis from "ioredis";
import { env } from "@/config/env";

const RedisClient = new Redis({
  port: env.REDIS_PORT,
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
});

const storeValue = async (key: string, value: string, ttl: number) => {
  try {
    const ttlInSeconds = 3 * 24 * 60 * 60;
    await RedisClient.set(key, value, "EX", ttlInSeconds);
  } catch (e) {
    console.log(e);
  }
};

const retrieveValue = async (
  key: string
): Promise<{
  errorCode: "NOT_FOUND" | "ERROR" | "OK";
  data: any;
}> => {
  try {
    const r = await RedisClient.get(key);
    if (r === null) {
      return { errorCode: "NOT_FOUND", data: null };
    }
    return { errorCode: "OK", data: JSON.parse(r) };
  } catch (e) {
    console.log(e);
    return { errorCode: "ERROR", data: null };
  }
};

export { storeValue, retrieveValue };
