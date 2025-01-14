import { Form, Input, Select } from "antd";
import { Editor } from "@monaco-editor/react";
import { useEffect, useMemo, useState } from "react";
import * as TypeGen from "json_typegen_wasm";
import * as JSONPath from "jsonpath";

import "./index.less";

type Options = {
  name: string;
  input: string;
  outputMode: string;
  unwrap: string;
  enums: string[];
  hints: string;
};

type Hint = {
  use_type?: string;
  type_name?: string;
};

type Props = {
  name?: string;
  input?: string;
  unwrap?: string;
  enums?: string[];
};

const Generator: React.FC<Props> = (props) => {
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

  const [form] = Form.useForm();

  function typegen(name: string, input: string, options: string) {
    console.info(`正在生成类型：\nrun('${name}', input, '${options}')`);
    const result = TypeGen.run(name, input, options);
    return result;
  }

  const [options, setOptions] = useState<Options>({
    name: props.name ?? "Schema",
    input: props.input ?? "",
    outputMode: "typescript/typealias",
    unwrap: props.unwrap ?? "",
    enums: props.enums ?? [],
    hints: "{}",
  });

  useEffect(() => {
    console.info("input发生变化");
    const input = props.input ?? "";
    setOptions({
      ...options,
      input,
    });
    form.setFieldValue("input", input);
  }, [props.input]);

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

  const [source, setSource] = useState("");

  const enumTypes = useMemo(() => {
    try {
      const input = JSON.parse(options.input);
      return options.enums
        .map((property) => {
          return generateEnum(input, property);
        })
        .join("\n");
    } catch (ex) {
      console.error(`input解析失败！`);
    }
    return "";
  }, [options.input, options.enums]);

  const enumHints = useMemo(() => {
    const hints: Record<string, Hint> = {};
    for (const property of options.enums) {
      const key = `/${property}`;
      hints[key] = {
        use_type: property,
      };
    }
    return hints;
  }, [options.enums]);

  useEffect(() => {
    try {
      const { name, input } = options;
      const hints = JSON.parse(options.hints) as Record<string, Hint>;
      const typegenOptions = {
        output_mode: options.outputMode,
        unwrap: options.unwrap,
        ...enumHints,
        ...hints,
      };
      const schema = typegen(name, input, JSON.stringify(typegenOptions));
      setSource(
        `
${enumTypes}

${schema}
`.trim()
      );
    } catch (ex) {
      console.warn("生成失败");
    }
  }, [options, enumTypes]);

  function generateEnum(input: object, property: string): string {
    const path = `$.*.${property}`;
    const results = JSONPath.query(input, path);
    console.info(`JSONPath查询（${path}）结果如下：`, JSON.stringify(results));
    const valueSet = new Set(results);
    const valueList = Array.from(valueSet);
    return `export type ${property} = ${valueList
      .map((value) => {
        const type = typeof value;
        switch (type) {
          case "string":
            return `"${value}"`;
          default:
            return value;
        }
      })
      .join(" | ")};`;
  }

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
          <Form.Item label="Hints" name="hints">
            <Editor className="option-hints" language="json" theme="vs-dark" />
          </Form.Item>
          <Form.Item label="Enums" name="enums">
            <Select mode="multiple" size="small" options={properties} />
          </Form.Item>
        </Form>
      </div>
      <div className="generator-preview">
        <Editor language={outputLanguage} theme="vs-dark" value={source} />
      </div>
    </div>
  );
};

export default Generator;
