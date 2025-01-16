export const outputModes = {
  rust: "Rust",
  typescript: "TypeScript",
  "typescript/typealias": "TypeScript (single type alias)",
  "kotlin/jackson": "Kotlin (Jackson)",
  "kotlin/kotlinx": "Kotlin (kotlinx.serialization)",
  python: "Python (Pydantic)",
  json_schema: "JSON Schema",
  shape: "Shape",
};

export type OutputMode = keyof typeof outputModes;
