import { expect, test, describe } from "vitest";
import { SchaleApiAxios } from "./schale-api-axios";
import { Server } from "../src/domains/server";
import { Language } from "../src/domains/language";
import { Released } from "../src/domains/response";

type Student = Released & {
  Name: string;
  School: string;
};

type Item = Released & {
  Name: string;
  Category: string;
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
      expect(aris!.School).toBe("Millennium");
      console.info(`获取国服学生10015信息：${aris!.Name}`);
    }

    {
      // 睡衣诺亚（未实装）
      const noa_pajama = await api.getStudent(10109, {
        server: Server.China,
      });
      expect(noa_pajama).toBeNull();
      console.info("获取国服学生10109信息如下：", noa_pajama);
    }
  });

  test("获取所有物品信息", async () => {
    {
      const items = await api.getItems<Item>();
      const keys = Object.keys(items);
      console.info(`获取日服物品数据 ${keys.length} 个`);
    }

    {
      const items = await api.getItems<Item>({
        server: Server.Global,
      });
      const keys = Object.keys(items);
      console.info(`获取国际服物品数据 ${keys.length} 个`);
    }

    {
      const items = await api.getItems<Item>({
        server: Server.China,
      });
      const keys = Object.keys(items);
      console.info(`获取国服物品数据 ${keys.length} 个`);
    }
  });

  test("获取指定物品信息", async () => {
    {
      // 弗雷纳帕提斯的大人的卡片
      const card = await api.getItem<Item>(200000, {
        language: Language.Chinese,
      });
      expect(card).not.toBeNull();
      expect(card!.Name).toBe("弗雷纳帕提斯的大人的卡片");
      expect(card!.Category).toBe("Consumable");
      console.info(`获取国服物品200000信息：${card!.Name}`);
    }

    {
      // 装有咖啡的马克杯（未实装）
      const mug = await api.getItem(20001001, {
        server: Server.China,
      });
      expect(mug).toBeNull();
      console.info("获取国服物品20001001信息如下：", mug);
    }
  });

  test("获取本地化信息", async () => {
    {
      // 日语
      const l10n = await api.getLocalization({
        language: Language.Japanese,
      });

      const explosion = l10n.BulletType.Explosion;
      expect(explosion).toBe("爆発");

      const gehenna = l10n.School.Gehenna;
      expect(gehenna).toBe("ゲヘナ");

      const millennium = l10n.SchoolLong.Millennium;
      expect(millennium).toBe("ミレニアムサイエンススクール");
    }

    {
      // 英语
      const l10n = await api.getLocalization({
        language: Language.English,
      });

      const explosion = l10n.BulletType.Explosion;
      expect(explosion).toBe("Explosive");

      const gehenna = l10n.School.Gehenna;
      expect(gehenna).toBe("Gehenna");

      const millennium = l10n.SchoolLong.Millennium;
      expect(millennium).toBe("Millennium Science School");
    }

    {
      // 简体中文
      const l10n = await api.getLocalization({
        language: Language.Chinese,
      });

      const explosion = l10n.BulletType.Explosion;
      expect(explosion).toBe("爆发");

      const gehenna = l10n.School.Gehenna;
      expect(gehenna).toBe("歌赫娜");

      const millennium = l10n.SchoolLong.Millennium;
      expect(millennium).toBe("千禧年"); // 数据如此
    }

    {
      // 繁体中文
      const l10n = await api.getLocalization({
        language: Language.ChineseTraditional,
      });

      const explosion = l10n.BulletType.Explosion;
      expect(explosion).toBe("爆炸");

      const gehenna = l10n.School.Gehenna;
      expect(gehenna).toBe("格黑娜");

      const millennium = l10n.SchoolLong.Millennium;
      expect(millennium).toBe("千年科學學園");
    }
  });
});
