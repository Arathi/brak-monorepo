import { Editor } from '@monaco-editor/react';
import { useEffect, useMemo, useState } from 'react';
import { Form, Input } from "antd";
import { SchaleApi } from '@brak/schale-api';
import * as JsonTypeGen from "json_typegen_wasm";

import './App.less';

type Student = {
  Id: number;
  IsReleased: [boolean, boolean, boolean];
  Name: string;
  Icon?: string;
};

type Item = {
  Id: number;
  IsReleased: [boolean, boolean, boolean];
  Name: string;
  Desc: string;
};

const App = () => {
  const api = new SchaleApi();
  const [name, setName] = useState("Schema");
  const [dataType, setDataType] = useState("students");
  const [content, setContent] = useState<Record<number, object>>({});
  const [unwrap, setUnwrap] = useState("/-");
  const [enums, setEnums] = useState<string[]>([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    updateContent(dataType);
  }, []);

  async function updateContent(dataType: string) {
    const resp = await api.getData<Record<number, object>>(dataType, {});
    setContent(resp);
  }

  const hints = {
    "/IsReleased": { use_type: "[boolean, boolean, boolean]" },
    "/StarGrade": { use_type: "1 | 2 | 3" },
    "/Equipment": { use_type: "[EquipmentSlot1, EquipmentSlot2, EquipmentSlot3]" },
    "/Skills": { use_type: "Record<string, Skill>" },
    "/School": { use_type: "School" },
    "/SquadType": { use_type: "SquadType" },
    "/TacticRole": { use_type: "TacticRole" },
    "/Position": { use_type: "Position" },
    "/BulletType": { use_type: "BulletType" },
    "/ArmorType": { use_type: "ArmorType" },
    "/StreetBattleAdaptation": { use_type: "BattleAdaptation" },
    "/OutdoorBattleAdaptation": { use_type: "BattleAdaptation" },
    "/IndoorBattleAdaptation": { use_type: "BattleAdaptation" },
    "/WeaponType": { use_type: "WeaponType" },
  };

  useEffect(() => {
    console.info("发生变化");
    const options = {
      output_mode: "typescript/typealias",
      unwrap: unwrap,
      ...hints,
    };
    const source = JsonTypeGen.run(
      name,
      JSON.stringify(content),
      JSON.stringify(options)
    );
    setSource(source);
  }, [name, content, unwrap, hints]);

  return (
    <div className="app">
      <div className="app-options">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="名称">
            <Input value={name} />
          </Form.Item>
          <Form.Item label="Unwrap">
            <Input value={unwrap} />
          </Form.Item>
        </Form>
      </div>
      <div className="app-preview">
        <Editor language="typescript" theme="vs-dark" value={source} />
      </div>
    </div>
  );
};

export default App;
