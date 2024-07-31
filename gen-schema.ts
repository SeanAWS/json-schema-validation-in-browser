import { resolve } from "node:path";
import * as TJS from "typescript-json-schema";
import fs from "node:fs";

function generateJsonSchemaFromSymbol(
  filePath: string,
  symbolName: string,
) {
  // optionally pass argument to schema generator
  const settings: TJS.PartialArgs = {
    required: true,
  };

  // optionally pass ts compiler options
  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
  };
  // optionally pass a base path
  const basePath = "./";
  const program = TJS.getProgramFromFiles(
    [resolve(filePath)],
    compilerOptions,
    basePath,
  );
  const generator = TJS.buildGenerator(program, settings);

  if (!generator) {
    throw new Error(`Failed to initialize TJS generator.`);
  }

  return JSON.stringify(generator.getSchemaForSymbol(symbolName), null, 2);
}

// get all files from the schema folder and generate a schema 

const schema = generateJsonSchemaFromSymbol(
  "./schemas/action.ts",
  "UpdateS3BucketAction",
);

// write the json schema to the src dir
fs.writeFileSync("./src/schema.json", schema);
