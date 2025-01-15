import { useEffect, useState } from "react";
import { SchaleApi } from "@brak/schale-api";
import Generator from "@/components/Generator";

type Response<D extends object = object> = Record<number, D>;

export const Student = () => {
  const api = new SchaleApi();
  const [content, setContent] = useState("");

  useEffect(() => {
    updateContent();
  }, []);

  async function updateContent() {
    const resp = await api.getData<Response>("students");
    const content = JSON.stringify(resp, null, 2);
    setContent(content);
  }

  return (
    <Generator
      name="Student"
      input={content}
      unwrap="/-"
      path="$.*"
      enums={[
        "School",
        "StarGrade",
        "SquadType",
        "TacticRole",
        "Position",
        "BulletType",
        "ArmorType",
        "WeaponType",
      ]}
    />
  );
};
