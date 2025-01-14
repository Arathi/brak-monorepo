import { expect, test, describe } from "vitest";
import { SchaleApiAxios } from "./schale-api-axios";
import { Server } from "../src/domains/server";
import { Language } from "../src/domains/language";
import { Released } from "../src/domains/response";

type Student = Released & {
  Name: string;
};

describe("SchaleApi 测试", async () => {
  const api = new SchaleApiAxios({
    proxy: { protocol: "http", host: "127.0.0.1", port: 8118 },
  });

  test("获取所有学生信息", async () => {
    {
      const students = await api.getStudents();
      const keys = Object.keys(students);
      console.info(`获取日服学生数据 ${keys.length} 个`);
    }

    {
      const students = await api.getStudents({ server: Server.Global });
      const keys = Object.keys(students);
      console.info(`获取国际服学生数据 ${keys.length} 个`);
    }

    {
      const students = await api.getStudents({ server: Server.China });
      const keys = Object.keys(students);
      console.info(`获取国服学生数据 ${keys.length} 个`);
    }
  });

  test("获取指定学生信息", async () => {
    {
      // 爱丽丝
      const aris = await api.getStudent<Student>(10015, {
        language: Language.Chinese,
      });
      expect(aris).not.toBeNull();
      expect(aris!.Name).toBe("爱丽丝");
      console.info(`获取国服学生10015信息：${aris!.Name}`);
    }

    {
      // 不存在
      const noa_pajama = await api.getStudent(10109, {
        server: Server.China,
      });
      expect(noa_pajama).toBeNull();
      console.info("获取国服学生10109信息如下：", noa_pajama);
    }
  });
});
