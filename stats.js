export const logs = [];
export function log(...args) {
  const message = args.join(" ");
  console.log(message);
  while (logs.length >= 10) logs.shift();
  logs.push(message);
}
