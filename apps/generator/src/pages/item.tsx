import { useEffect, useState } from "react";
import { SchaleApi } from "@brak/schale-api";
import Generator from "@/components/Generator";

export const Item = () => {
  const api = new SchaleApi();
  const [content, setContent] = useState("");

  useEffect(() => {
    updateContent();
  }, []);

  async function updateContent() {
    const resp = await api.getData<Response>("items");
    const content = JSON.stringify(resp, null, 2);
    setContent(content);
  }

  return (
    <Generator name="Item" input={content} unwrap="/-" enums={["Category"]} />
  );
};
