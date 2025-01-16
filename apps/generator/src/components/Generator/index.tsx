import { OutputMode, outputModes } from "@/domains/output-mode";
import { Editor } from "@monaco-editor/react";
import {
  AutoComplete,
  Button,
  Flex,
  Form,
  Input,
  InputProps,
  Select,
  SelectProps,
  Table,
  TableProps,
  Tabs,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import * as JSONPath from "jsonpath";
import { ofEnum, ofType, Schema } from "@/domains/schema";
import { SchaleApi } from "@brak/schale-api";
import { Hint } from "@/domains/hint";
import * as TypeGen from "json_typegen_wasm";

import "./index.less";

const api = new SchaleApi();

type Props = {
  //
};

type Prefab = {
  value: string;
  label: React.ReactNode;
  fileName?: string;
  unwrap?: string;
  paths?: string;
  schemas?: Schema[];
};

const Generator: React.FC<Props> = () => {
  const [name, setName] = useState("");

  const [inputSource, setInputSource] = useState("");

  const [outputMode, setOutputMode] = useState<OutputMode>(
    "typescript/typealias"
  );

  const [unwrap, setUnwrap] = useState("");
  const [paths, setPaths] = useState<string>("");
  const [pathsStatus, setPathsStatus] = useState<InputProps["status"]>("");

  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [schemas, setSchemas] = useState<Schema[]>([]);

  const [prefabs, setPrefabs] = useState<Prefab[]>([
    {
      value: "Student",
      label: "Student (学生信息)",
      fileName: "students",
      unwrap: "/-",
      paths: "$.*",
      schemas: [
        ofType("Released", {
          pointers: "/IsReleased",
          alias: "[boolean, boolean, boolean]",
        }),
        ofEnum("School"),
        ofType("StarGrade"),
        ofEnum("SquadType"),
        ofEnum("TacticRole"),
        ofEnum("Position"),
        ofEnum("BulletType"),
        ofEnum("ArmorType"),
        ofEnum("WeaponType"),
        ofType("Skills", {
          alias: "object",
        }),
      ],
    },
    {
      value: "Item",
      label: "Item (物品信息)",
      fileName: "items",
      unwrap: "/-",
      paths: "$.*",
      schemas: [ofEnum("Category")],
    },
    {
      value: "Skill",
      label: "Skill (技能信息)",
    },
  ]);

  const pathList = useMemo(() => {
    const list: string[] = [];
    paths.split(",").forEach((path) => {
      const trimmed = path.trim();
      if (trimmed.length > 0) {
        list.push(trimmed);
      }
    });
    return list;
  }, [paths]);

  const language = useMemo(() => {
    switch (outputMode) {
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
      default:
        return "json";
    }
  }, [outputMode]);

  const outputModeOptions = useMemo(() => {
    const options: SelectProps["options"] = [];
    for (const key in outputModes) {
      const value = key as OutputMode;
      const label = outputModes[value];
      options.push({
        value,
        label,
      });
    }
    return options;
  }, [outputModes]);

  const input = useMemo(() => {
    try {
      return JSON.parse(inputSource);
    } catch (ex) {
      console.warn("输入JSON解析出现异常：", ex);
      return {};
    }
  }, [inputSource]);

  const hints = useMemo(() => {
    const hints: Record<string, Hint> = {};
    for (const schema of schemas) {
      const { name, pointers } = schema;
      for (const pointer of pointers) {
        hints[pointer] = {
          use_type: name,
        };
      }
    }
    return hints;
  }, [schemas]);

  const shapeJson = useMemo(() => {
    try {
      const options = {
        output_mode: "shape",
        unwrap,
        ...hints,
      };
      return TypeGen.run(name, inputSource, JSON.stringify(options));
    } catch (ex) {
      console.warn("Shade生成失败！", ex);
      return "{}";
    }
  }, [name, inputSource, outputMode, unwrap, hints]);

  const shape = useMemo(() => {
    try {
      return JSON.parse(shapeJson);
    } catch (ex) {
      console.warn("Shade解析失败！", ex);
      return {};
    }
  }, [shapeJson]);

  const filtered = useMemo(() => {
    const filtered: any[] = [];
    try {
      for (const path of pathList) {
        const results = JSONPath.query(input, path);
        filtered.push(...results);
      }
      setPathsStatus("");
    } catch (ex) {
      console.warn("过滤JSON出现异常：", ex);
      setPathsStatus("error");
    }
    return filtered;
  }, [input, pathList]);

  const filteredFormatted = useMemo(() => {
    try {
      return JSON.stringify(filtered, null, 2);
    } catch (e) {
      return `{"_comment:": "转换失败"}`;
    }
  }, [filtered]);

  const hintsFormatted = useMemo(() => {
    try {
      return JSON.stringify(hints, null, 2);
    } catch (e) {
      return `{"_comment:": "转换失败"}`;
    }
  }, [hints]);

  function exportSchema(schema: Schema) {
    let values: any[] = [];
    try {
      for (const path of schema.paths) {
        const results = JSONPath.query(input, path);
        values.push(...results);
      }
    } catch (e) {
      console.warn("过滤失败！", e);
    }
    const set = new Set(values);
    values = Array.from(set);

    if (schema.enum) {
      return exportEnum(schema, values);
    }
    return exportType(schema, values);
  }

  function exportEnum(schema: Schema, values: any[]) {
    const lines = values.map((value) => {
      if (typeof value === "string") {
        return `  ${value} = "${value}",`;
      }
      return `  ${value} = ${value},`;
    });
    return `export enum ${schema.name} {
${lines.join("\n")}
}
`;
  }

  function exportType(schema: Schema, values: any[]) {
    let definition = "";
    if (schema.alias !== undefined) {
      definition = schema.alias;
    } else {
      definition = values
        .map((value) => {
          if (typeof value === "string") return `"${value}"`;
          return `${value}`;
        })
        .join(" | ");
    }
    return `export type ${schema.name} = ${definition};
`;
  }

  const outputSource = useMemo(() => {
    const externalTypes: string[] = [];
    const externalEnums: string[] = [];
    const internalSchemas: string[] = [];

    for (const schema of schemas) {
      if (schema.external) {
        if (schema.enum) {
          externalEnums.push(schema.name);
        } else {
          externalTypes.push(schema.name);
        }
      } else {
        internalSchemas.push(exportSchema(schema));
      }
    }

    const output = TypeGen.run(
      name,
      inputSource,
      JSON.stringify({
        output_mode: "typescript/typealias",
        unwrap,
        ...hints,
      })
    );

    return `// ${name}

import type { ${externalTypes.join(",")} } from "./index";
import { ${externalEnums.join(",")} } from "./index";

${internalSchemas.join("\n")}
${output}
// Generated at ${new Date().toISOString()}`.trim();
  }, [name, inputSource, unwrap, hints]);

  useEffect(() => {
    const prefab = prefabs.find((prefab) => prefab.value === name);
    if (prefab !== undefined) {
      updateInputs(prefab);
    }
  }, [name, prefabs]);

  async function updateInputs(prefab: Prefab) {
    try {
      const { fileName, unwrap, paths, schemas } = prefab;
      if (fileName !== undefined) {
        const data = await api.getData<object>(fileName);
        setInputSource(JSON.stringify(data, null, 2));
      }
      if (unwrap !== undefined) {
        setUnwrap(unwrap);
      }
      if (paths !== undefined) {
        setPaths(paths);
      }
      if (schemas !== undefined) {
        setSchemas(schemas);
      }
    } catch (ex) {
      console.warn("更新输入表单出现异常：", ex);
    }
  }

  const columns: TableProps<Schema>["columns"] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "category",
      title: "分类",
      dataIndex: "enum",
      render: (asEnum) => {
        return asEnum ? "enum" : "type";
      },
    },
    {
      key: "external",
      title: "外部定义",
      dataIndex: "external",
      render: (external) => {
        return external ? "是" : "否";
      },
    },
    {
      key: "pointers",
      title: "JSONPointer",
      dataIndex: "pointers",
      render: (values) => {
        return values.join(", ");
      },
    },
    {
      key: "paths",
      title: "JSONPath",
      dataIndex: "paths",
      render: (values) => {
        return values.join(", ");
      },
    },
  ];

  return (
    <div className="generator">
      <div className="inputs">
        <Form labelCol={{ flex: "120px" }}>
          <Form.Item label="Name">
            <AutoComplete
              options={prefabs}
              value={name}
              onChange={(value) => setName(value)}
            />
          </Form.Item>
          <Form.Item label="Input">
            <Editor
              className="monaco-editor input-source"
              theme={editorTheme}
              value={inputSource}
              language="json"
              onChange={(value) => setInputSource(value ?? "")}
            />
          </Form.Item>
          <Form.Item label="Output Mode">
            <Select
              options={outputModeOptions}
              value={outputMode}
              onChange={(value) => setOutputMode(value)}
            />
          </Form.Item>
          <Form.Item label="Unwrap">
            <Input
              value={unwrap}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setUnwrap(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Filter">
            <Input
              value={paths}
              status={pathsStatus}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setPaths(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Sub Types">
            <Flex justify="end" style={{ marginBottom: 8 }}>
              <Button variant="solid" color="primary">
                添加
              </Button>
            </Flex>
            <Table
              size="small"
              columns={columns}
              dataSource={schemas}
              pagination={false}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="outputs">
        <Tabs
          type="card"
          size="small"
          items={[
            {
              key: "shape",
              label: "Shape",
              children: (
                <Editor
                  className="monaco-editor"
                  language="json"
                  theme={editorTheme}
                  value={shapeJson}
                />
              ),
            },
            {
              key: "hints",
              label: "Hints",
              children: (
                <Editor
                  className="monaco-editor"
                  language="json"
                  theme={editorTheme}
                  value={hintsFormatted}
                />
              ),
            },
            {
              key: "filtered",
              label: "Filtered",
              children: (
                <Editor
                  className="monaco-editor"
                  language="json"
                  theme={editorTheme}
                  value={filteredFormatted}
                />
              ),
            },
            {
              key: "source",
              label: "Source",
              children: (
                <Editor
                  className="monaco-editor"
                  language={language}
                  theme={editorTheme}
                  value={outputSource}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Generator;
