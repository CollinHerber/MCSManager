const XML_TOKEN = /<!--[\s\S]*?-->|<property\b[^>]*\/>/gi;
const ATTRIBUTE = (name: string) => new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i");

const STRING_PROPERTIES = new Set([
  "ServerName",
  "ServerDescription",
  "ServerWebsiteURL",
  "ServerPassword",
  "ServerLoginConfirmationText",
  "Region",
  "Language",
  "ServerDisabledNetworkProtocols",
  "WebDashboardUrl",
  "TelnetPassword",
  "AdminFileName",
  "UserDataFolder",
  "SaveGameFolder",
  "GameWorld",
  "WorldGenSeed",
  "GameName",
  "GameMode"
]);

function decodeXml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function encodeXml(value: unknown, quote: string): string {
  let encoded = String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  encoded = quote === '"' ? encoded.replace(/"/g, "&quot;") : encoded.replace(/'/g, "&apos;");
  return encoded;
}

function parseValue(name: string, value: string): string | number | boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  if (!STRING_PROPERTIES.has(name) && /^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  return value;
}

export function parseSevenDaysToDieConfig(text: string): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};
  for (const match of text.matchAll(XML_TOKEN)) {
    const tag = match[0];
    if (tag.startsWith("<!--")) continue;
    const name = ATTRIBUTE("name").exec(tag)?.[2];
    const value = ATTRIBUTE("value").exec(tag)?.[2];
    if (!name || value === undefined) continue;
    const decodedName = decodeXml(name);
    result[decodedName] = parseValue(decodedName, decodeXml(value));
  }
  return result;
}

export function stringifySevenDaysToDieConfig(
  template: string,
  values: Record<string, unknown>
): string {
  return template.replace(XML_TOKEN, (tag) => {
    if (tag.startsWith("<!--")) return tag;
    const name = ATTRIBUTE("name").exec(tag)?.[2];
    if (!name) return tag;
    const decodedName = decodeXml(name);
    if (!Object.prototype.hasOwnProperty.call(values, decodedName)) return tag;
    return tag.replace(ATTRIBUTE("value"), (_match, quote: string) => {
      return `value=${quote}${encodeXml(values[decodedName], quote)}${quote}`;
    });
  });
}
