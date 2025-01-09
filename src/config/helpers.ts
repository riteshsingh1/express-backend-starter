import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import { createElasticLogger } from "@/config/elastic-logger";
import { env } from "@/config/env";

const formatMessage = (title: string, message: object) => {
  if (typeof message === "object") {
    // If message is an object, convert it to JSON string
    return `${title} :: ${JSON.stringify(
      {
        ...message,
        appName: env.APP_NAME,
        env: env.ENV,
      },
      null,
      2
    )}`;
  }
  return `${title} :: ${message}`;
};

const log = createElasticLogger();

const encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};
const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

const genrateRandomNumber = (length: number) => {
  return Math.floor(Math.random() * Math.pow(10, length));
};

const genrateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const formatMobileNumber = (mobile: string | number) => {
  const mob = mobile.toString();
  if (mob.length === 10) {
    return `+91${mob}`;
  }
  return mob;
};

const encrypt = (text: object) => {
  const c = new Cryptr(env.ENCRYPTION_KEY as string);
  return c.encrypt(JSON.stringify(text));
};

const decrypt = (text: string) => {
  const c = new Cryptr(env.ENCRYPTION_KEY as string);
  return JSON.parse(c.decrypt(text));
};

export const helpers = {
  log,
  formatMessage,
  encryptPassword,
  comparePassword,
  genrateRandomNumber,
  genrateRandomString,
  formatMobileNumber,
  encrypt,
  decrypt,
};
