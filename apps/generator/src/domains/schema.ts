export type Schema = {
  name: string;
  enum: boolean;
  external: boolean;
  pointers: string[];
  paths: string[];
  alias?: string;
};

type SchemaOptions = {
  enum?: boolean;
  external?: boolean;
  pointers?: string | string[];
  paths?: string | string[];
  alias?: string;
};

export function ofSchema(name: string, options: SchemaOptions = {}) {
  const asEnum = options.enum ?? false;
  const external = options.external ?? false;
  const pointers: string[] = [];
  const paths: string[] = [];

  switch (typeof options.pointers) {
    case "undefined":
      pointers.push(`/${name}`);
      break;
    case "string":
      pointers.push(options.pointers);
      break;
    case "object":
      pointers.push(...options.pointers);
  }

  switch (typeof options.paths) {
    case "undefined":
      paths.push(`$.*.${name}`);
      break;
    case "string":
      paths.push(options.paths);
      break;
    case "object":
      paths.push(...options.paths);
  }

  return {
    name,
    enum: asEnum,
    external,
    pointers,
    paths,
    alias: options.alias,
  };
}

export function ofType(name: string, options: SchemaOptions = {}) {
  return ofSchema(name, {
    ...options,
    enum: false,
  });
}

export function ofEnum(name: string, options: SchemaOptions = {}) {
  return ofSchema(name, {
    ...options,
    enum: true,
  });
}
