import { IS_BROWSER, IS_SERVER } from "@/common/constants";
import { IS_DEV } from "@/config/envs.get";

export const log = (title: string, message: unknown) => {
  if (IS_SERVER) {
    console.log(
      title,
      "📘",
      "\x1b[36m",
      JSON.stringify(message, null, 4),
      "\x1b[0m"
    );
  }
  if (IS_BROWSER && IS_DEV) {
    console.log(JSON.stringify(message, null, 4), "color: cyan");
  }
};

export const logline = (message: unknown) => {
  if (IS_SERVER) {
    console.log("\x1b[34", JSON.stringify(message, null, 0), "\x1b[0m");
  }
  if (IS_BROWSER && IS_DEV) {
    console.log(JSON.stringify(message, null, 0), "color: cyan");
  }
};

export const error = (message: string) => {
  if (IS_SERVER) {
    console.log("📘", "\x1b[36m", JSON.stringify(message, null, 4), "\x1b[0m");
  }
  if (IS_BROWSER && IS_DEV) {
    console.log(JSON.stringify(message, null, 4), "color: cyan");
  }
};

type Show = {
  title?: string;
  message: unknown;
};

export const errorline = ({ title, message }: Show) => {
  if (IS_SERVER) {
    console.log("📕", "\x1b[31m", JSON.stringify(message, null, 0), "\x1b[0m");
  }
  if (IS_BROWSER && IS_DEV) {
    console.log(
      "📕",
      "\x1b[31m",
      JSON.stringify(message, null, 0),
      "color: cyan"
    );
  }
};

// red
/* console.log("\x1b[31m%s\x1b[0m", "I am red");

// green
console.log("\x1b[32m%s\x1b[0m", "I am green");

// yellow
console.log("\x1b[33m%s\x1b[0m", "I am yellow");

// blue
console.log("\x1b[34m%s\x1b[0m", "I am blue");

// magenta
console.log("\x1b[35m%s\x1b[0m", "I am magenta");

// cyan
console.log("\x1b[36m%s\x1b[0m", "I am cyan"); */

// 📕: error message
// 📙: warning message
// 📗: ok status message
// 📘: action message
// 📓: canceled status message
// 📔: Or anything you like and want to recognize immediately by color
// ⚠️
// 🛑
