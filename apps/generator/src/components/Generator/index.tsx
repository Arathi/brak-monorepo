import { Form, Input, Select } from "antd";
import { Editor } from "@monaco-editor/react";
import { useEffect, useMemo, useState } from "react";
import * as TypeGen from "json_typegen_wasm";
import * as JSONPath from "jsonpath";

import "./index.less";

// #region 类型定义
type Options = {
  /**
   * 名称
   */
  name: string;

  /**
   * 输入JSON
   */
  input: string;

  /**
   * 输出模式
   */
  outputMode: string;

  /**
   * 解包pointer
   */
  unwrap: string;

  /**
   * JSONPath
   */
  path: string;

  /**
   * 子类型
   */
  types: Type[];
};

/**
 * 类型提示
 */
type Hint = {
  use_type?: string;
  type_name?: string;
};

/**
 * 类型定义
 */
type Schema = "type" | "enum";
type Type = {
  name: string;
  schema: Schema;
  declared: boolean;
  pointers: string[];
  paths: string[];
};

type OfTypeOptions = {
  declared?: boolean;
  pointers?: string | string[];
  paths?: string | string[];
};

export function ofType(
  name: string,
  schema: Schema,
  options: OfTypeOptions
): Type {
  const declared = options.declared ?? false;

  const pointers: string[] = [];
  const inputPointers = options.pointers;
  switch (typeof inputPointers) {
    case "undefined":
      pointers.push(`/${name}`);
      break;
    case "string":
      pointers.push(inputPointers);
      break;
    case "object":
      pointers.push(...inputPointers);
      break;
  }

  const paths: string[] = [];
  const inputPaths = options.paths;
  switch (typeof inputPaths) {
    case "undefined":
      paths.push(`\$.*.${name}`);
      break;
    case "string":
      paths.push(inputPaths);
      break;
    case "object":
      paths.push(...inputPaths);
      break;
  }

  return {
    name,
    schema,
    declared,
    pointers,
    paths,
  };
}

type Props = {
  name?: string;
  input?: string;
  unwrap?: string;
  path?: string;
  types?: Type[];
};
// #endregion

// #region 输出模式
const outputModes = [
  {
    value: "rust",
    label: "Rust",
  },
  {
    value: "typescript",
    label: "TypeScript",
  },
  {
    value: "typescript/typealias",
    label: "TypeScript (single typealias)",
  },
  {
    value: "kotlin/jackson",
    label: "Kotlin (Jackson)",
  },
  {
    value: "kotlin/kotlinx",
    label: "Kotlin (kotlinx.serialization)",
  },
  {
    value: "python",
    label: "Python (pydantic)",
  },
  {
    value: "json_schema",
    label: "JSON Schema",
  },
  {
    value: "shape",
    label: "Shape (internal representation)",
  },
];
// #endregion

const Generator: React.FC<Props> = (props) => {
  // #region states
  const [options, setOptions] = useState<Options>({
    name: props.name ?? "Schema",
    input: props.input ?? "",
    outputMode: "typescript/typealias",
    unwrap: props.unwrap ?? "",
    path: props.path ?? "",
    types: props.types ?? [],
  });

  const [filtered, setFiltered] = useState("");

  const [source, setSource] = useState("");
  // #endregion

  // #region memos
  const input = useMemo<object>(() => {
    try {
      return JSON.parse(options.input);
    } catch (ex) {
      console.warn("解析输入出现异常", ex);
      return {};
    }
  }, [options.input]);

  const shape = useMemo(() => {
    try {
      const typegenOptions = {
        output_mode: "shape",
        unwrap: options.unwrap,
      };
      const shape = typegen(
        "Shape",
        options.input,
        JSON.stringify(typegenOptions)
      );
      console.info("Shape转换如下：", shape);
      return JSON.parse(shape);
    } catch (ex) {
      console.warn("解析输入出现异常", ex);
      return {};
    }
  }, [options.input, options.unwrap]);

  const properties = useMemo(() => {
    const properties = [];
    try {
      for (const key in shape) {
        properties.push({
          value: key,
          label: key,
        });
      }
      return properties;
    } catch (ex) {
      console.warn("解析输入出现异常", ex);
    }
    return [];
  }, [shape]);

  const outputLanguage = useMemo(() => {
    switch (options.outputMode) {
      case "rust":
        return "rust";
      case "typescript":
      case "typescript/typealias":
        return "typescript";
      case "kotlin/jackson":
      case "kotlin/kotlinx":
        return "kotlin";
      case "python":
        return "python";
      case "json_schema":
      case "shape":
        return "json";
    }
    return "text";
  }, [options.outputMode]);

  const hints = useMemo(() => {
    const hints: Record<string, Hint> = {};
    return hints;
  }, []);

  const subTypes = useMemo<string[]>(() => {
    const types: string[] = [];
    return types;
  }, []);

  // const filtered = useMemo<any[]>(() => {
  //   return JSONPath.query(input, options.path);
  // }, [input, options.path]);
  // #endregion

  // #region hooks
  const [form] = Form.useForm();
  // #endregion

  // #region effects
  useEffect(() => {
    console.info("input发生变化");
    const input = props.input ?? "";
    setOptions({
      ...options,
      input,
    });
    form.setFieldValue("input", input);
  }, [props.input]);

  useEffect(() => {
    try {
      const results = JSONPath.query(input, options.path);
      const filtered = JSON.stringify(results, null, 2);
      setFiltered(filtered);
    } catch (ex) {
      console.warn("JSONPath查询失败", ex);
    }
  }, [input, options.path]);

  useEffect(() => {
    try {
      const { name, input } = options;
      const typegenOptions = {
        output_mode: options.outputMode,
        unwrap: options.unwrap,
        ...hints,
      };

      const typeImports = [];
      const directImports = [];

      const definition = typegen(name, input, JSON.stringify(typegenOptions));
      setSource(
        `
import type {} from ".";
import {} from ".";

// #region Types
${subTypes.join("\n")}
// #endregion

${definition}

// Generated at ${new Date().toISOString()}
`.trim()
      );
    } catch (ex) {
      console.warn("生成失败");
    }
  }, [options, hints, subTypes]);
  // #endregion

  // #region functions
  function typegen(name: string, input: string, options: string) {
    console.info(`正在生成类型：\nrun('${name}', input, '${options}')`);
    const result = TypeGen.run(name, input, options);
    return result;
  }

  function generateType(
    name: string,
    input: object,
    paths: string[],
    schema: Schema = "type"
  ) {
    const valueList: any[] = [];
    for (const path of paths) {
      const filtered = JSONPath.query(input, path);
      valueList.push(...filtered);
    }
    const valueSet = new Set(valueList);
    const lines: string[] = [];
    if (schema === "type") {
      valueSet.forEach((value) => {
        const line = `  | ${value} `;
        lines.push(line);
      });
      return `export type ${name} = 
${lines.join("\n")}
;`;
    } else if (schema === "enum") {
      valueSet.forEach((value) => {
        const line = `  ${value} = "${value}",`;
        lines.push(line);
      });
      return `export enum ${name} {
${lines.join("\n")}
}`;
    }
  }
  // #endregion

  // const subTypes = useMemo(() => {
  //   try {
  //     const input = JSON.parse(options.input);
  //     return options.types
  //       .map((tpd) => {
  //         return generateEnum(input, tpd);
  //       })
  //       .join("\n");
  //   } catch (ex) {
  //     console.error(`input解析失败！`);
  //   }
  //   return "";
  // }, [options.input, options.types]);

  // const extraHints = useMemo(() => {
  //   const hints: Record<string, Hint> = {};
  //   for (const tpd of options.types) {
  //     const key = `/${tpd.}`;
  //     hints[key] = {
  //       use_type: property,
  //     };
  //   }
  //   return hints;
  // }, [options.types]);

  return (
    <div className="generator">
      <div className="generator-options">
        <Form
          form={form}
          layout="vertical"
          initialValues={options}
          onValuesChange={(_, values) => {
            console.info("表单发生变化：", values);
            setOptions(values);
          }}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Input" name="input">
            <Editor className="option-input" language="json" theme="vs-dark" />
          </Form.Item>
          <Form.Item label="Output mode" name="outputMode">
            <Select options={outputModes} />
          </Form.Item>
          <Form.Item label="Unwrap path" name="unwrap">
            <Input />
          </Form.Item>
          <Form.Item label="JSON Path" name="path">
            <Input />
          </Form.Item>
          <Form.Item label="Hints" name="hints">
            <Editor className="option-hints" language="json" theme="vs-dark" />
          </Form.Item>
          <Form.Item label="Enums" name="enums">
            <Select mode="multiple" size="small" options={properties} />
          </Form.Item>
        </Form>
      </div>

      <div className="generator-filtered">
        <Editor language="json" theme="vs-dark" value={filtered} />
      </div>

      <div className="generator-preview">
        <Editor language={outputLanguage} theme="vs-dark" value={source} />
      </div>
    </div>
  );
};

export default Generator;
