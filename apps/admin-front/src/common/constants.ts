export const EMAIL_PATTERN =
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

export const LOCALSTORAGE_TOKEN = "cryptoexchange-token";

export const IS_SERVER = typeof window === "undefined";
export const IS_BROWSER = typeof window !== "undefined";
