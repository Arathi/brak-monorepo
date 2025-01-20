import { useEffect, useMemo, useState } from "react";
import type { Student as FullMetadata } from "@brak/schale-api";
import {
  School,
  SquadType,
  TacticRole,
  BulletType,
  ArmorType,
} from "@brak/schale-api";
import { api } from "../../utils/schale-db";
import { Stars } from "../Stars";

import "./index.less";

type Metadata = Partial<FullMetadata> &
  Pick<
    FullMetadata,
    | "Id"
    | "IsReleased"
    | "Name"
    | "School"
    | "StarGrade"
    | "SquadType"
    | "TacticRole"
    | "BulletType"
    | "ArmorType"
  >;

type Student = {
  id: number;
};

type Props = {
  id?: number;
  student?: Student;

  /**
   * 名字
   */
  name?: string;

  /**
   * 学院
   */
  school?: School;

  /**
   * 部队类型
   */
  squad?: SquadType;

  /**
   * 角色
   */
  role?: TacticRole;

  /**
   * 攻击类型
   */
  attackType?: BulletType;

  /**
   * 护甲类型
   */
  armorType?: ArmorType;

  /**
   * 星级
   */
  rank?: 1 | 2 | 3 | 4 | 5;

  /**
   * 专武星级
   */
  weaponRank?: 0 | 1 | 2 | 3;

  /**
   * 专武等级
   */
  weaponLevel?: number;

  /**
   * 爱用品Tier
   */
  gearTier?: 0 | 1 | 2; // 爱用品

  /**
   * Ex技能（必杀技能）
   */
  skillEx?: number;

  /**
   * 1技能（普通技能）
   */
  skill1?: number;

  /**
   * 2技能（被动技能）
   */
  skill2?: number;

  /**
   * 3技能（辅助技能）
   */
  skill3?: number;

  /**
   * 装备1 Tier
   */
  equipmentSlot1Tier?: number;

  /**
   * 装备1 Level
   */
  equipmentSlot1Level?: number;

  /**
   * 装备2 Tier
   */
  equipmentSlot2Tier?: number;

  /**
   * 装备2 Level
   */
  equipmentSlot2Level?: number;

  /**
   * 装备2 Tier
   */
  equipmentSlot3Tier?: number;

  /**
   * 装备2 Level
   */
  equipmentSlot3Level?: number;

  onClick: () => void;
};

export const StudentIcon: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.id ?? 0);
  const [name, setName] = useState(props.name ?? "未知");
  const [school, setSchool] = useState(props.school ?? School.ETC);
  const [rank, setRank] = useState(props.rank ?? 1);
  const [weaponRank, setWeaponRank] = useState(props.weaponRank ?? 0);
  const [squad, setSquad] = useState(props.squad ?? SquadType.Main);
  const [role, setRole] = useState(props.role ?? TacticRole.DamageDealer);
  const [attackType, setAttackType] = useState(
    props.attackType ?? BulletType.Explosion
  );
  const [armorType, setArmorType] = useState(
    props.armorType ?? ArmorType.HeavyArmor
  );

  const [roleSize] = useState(26);

  useEffect(() => {
    reload();
  }, [props]);

  async function reload() {
    let rarity: Metadata["StarGrade"] = 1;
    if (props.id !== undefined) {
      const metadata = await api.getStudent<Metadata>(props.id);
      if (metadata !== null) {
        setId(metadata.Id);
        setName(metadata.Name);
        rarity = metadata.StarGrade;
        setSquad(metadata.SquadType);
        setRole(metadata.TacticRole);
        setAttackType(metadata.BulletType);
        setArmorType(metadata.ArmorType);
      }
    }

    if (props.school !== undefined) {
      setSchool(props.school);
    }

    if (props.rank !== undefined) {
      setRank(props.rank);
    } else {
      setRank(rarity);
    }

    if (props.squad !== undefined) {
      setSquad(props.squad);
    }

    if (props.role !== undefined) {
      setRole(props.role);
    }

    if (props.attackType !== undefined) {
      setAttackType(props.attackType);
    }

    if (props.armorType !== undefined) {
      setArmorType(props.armorType);
    }
  }

  const nameSize = useMemo(() => {
    const minSize = 1;
    const minLength = 3;
    const maxSize = 2;
    const maxLength = 10;

    let size = 2;
    if (name.length <= minLength) {
      size = maxSize;
    } else if (name.length >= maxLength) {
      size = minSize;
    } else {
      size = maxSize - (name.length - minLength) * (maxSize - minSize);
    }
    // return `${size.toFixed(2)}em`;
    return "1em";
  }, [name]);

  const collectionSrc = useMemo(() => {
    if (id >= 10000 && id < 99999) {
      return api.getStudentAsset("collection", id);
    }
    return api.getAsset("images", "ui", "Image_Char_Arona2.png");
  }, [id]);

  const attackSrc = api.getAsset("images", "ui", "Type_Attack_s.png");
  const armorSrc = api.getAsset("images", "ui", "Type_Defense_s.png");

  const attackTypeClassName = useMemo(() => {
    switch (attackType) {
      case BulletType.Explosion:
        return "explosion";
      case BulletType.Pierce:
        return "pierce";
      case BulletType.Mystic:
        return "mystic";
      case BulletType.Sonic:
        return "sonic";
    }
    return "";
  }, [attackType]);

  const armorTypeClassName = useMemo(() => {
    switch (armorType) {
      case ArmorType.LightArmor:
        return "light";
      case ArmorType.HeavyArmor:
        return "heavy";
      case ArmorType.Unarmed:
        return "special";
      case ArmorType.ElasticArmor:
        return "elastic";
    }
    return "";
  }, [armorType]);

  const squadClassName = useMemo(() => {
    switch (squad) {
      case SquadType.Main:
        return "striker";
      case SquadType.Support:
        return "special";
    }
  }, [squad]);

  const roleUrl = useMemo(() => {
    let fileName = `Role_${role}.png`;
    return api.getAsset("images", "ui", fileName);
  }, [role]);

  return (
    <button className="student-icon">
      <div className="container">
        <img
          className="avatar"
          alt="student"
          src={collectionSrc}
          height={226}
        />
        <div className="stars">
          <Stars rank={rank} weapon={weaponRank} gap={-12} />
        </div>
        <div
          className={`squad-role ${squadClassName}`}
          style={{
            width: roleSize,
            height: roleSize,
          }}
        >
          <img src={roleUrl} width={roleSize} height={roleSize} />
        </div>
        <div className="information">
          <div className="attack-armor">
            <div className={`attack-type ${attackTypeClassName}`}>
              <img className="attack-icon" src={attackSrc} />
            </div>
            <div className={`armor-type ${armorTypeClassName}`}>
              <img className="armor-icon" src={armorSrc} />
            </div>
          </div>
          <div className="name" style={{ fontSize: nameSize }}>
            {name}
          </div>
        </div>
      </div>
    </button>
  );
};

export type { Metadata as StudentMetadata };
