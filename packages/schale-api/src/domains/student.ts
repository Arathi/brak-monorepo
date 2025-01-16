// Student

import type {} from "./index";
import {} from "./index";

export type Released = [boolean, boolean, boolean];

export enum School {
  Gehenna = "Gehenna",
  Millennium = "Millennium",
  Trinity = "Trinity",
  Abydos = "Abydos",
  Shanhaijing = "Shanhaijing",
  Hyakkiyako = "Hyakkiyako",
  RedWinter = "RedWinter",
  SRT = "SRT",
  Arius = "Arius",
  Tokiwadai = "Tokiwadai",
  Valkyrie = "Valkyrie",
  ETC = "ETC",
  Sakugawa = "Sakugawa",
}

export type StarGrade = 3 | 2 | 1;

export enum SquadType {
  Main = "Main",
  Support = "Support",
}

export enum TacticRole {
  DamageDealer = "DamageDealer",
  Tanker = "Tanker",
  Supporter = "Supporter",
  Healer = "Healer",
  Vehicle = "Vehicle",
}

export enum Position {
  Back = "Back",
  Front = "Front",
  Middle = "Middle",
}

export enum BulletType {
  Explosion = "Explosion",
  Mystic = "Mystic",
  Pierce = "Pierce",
  Sonic = "Sonic",
}

export enum ArmorType {
  LightArmor = "LightArmor",
  HeavyArmor = "HeavyArmor",
  Unarmed = "Unarmed",
  ElasticArmor = "ElasticArmor",
}

export enum WeaponType {
  SR = "SR",
  SG = "SG",
  AR = "AR",
  MG = "MG",
  SMG = "SMG",
  RG = "RG",
  HG = "HG",
  GL = "GL",
  RL = "RL",
  FT = "FT",
  MT = "MT",
}

export type Skills = object;

export type Student = {
  Id: number;
  IsReleased: Released;
  DefaultOrder: number;
  PathName: string;
  DevName: string;
  Name: string;
  Icon?: string;
  SearchTags: Array<string>;
  School: School;
  Club: string;
  StarGrade: StarGrade;
  SquadType: SquadType;
  TacticRole: TacticRole;
  Summons: Array<{
    Id: number;
    SourceSkill: string;
    ObstacleMaxHP1?: number;
    ObstacleMaxHP100?: number;
  }>;
  Position: Position;
  BulletType: BulletType;
  ArmorType: ArmorType;
  StreetBattleAdaptation: number;
  OutdoorBattleAdaptation: number;
  IndoorBattleAdaptation: number;
  WeaponType: WeaponType;
  WeaponImg: string;
  Cover: boolean;
  Size: string;
  Equipment: Array<string>;
  CollectionBG: string;
  FamilyName: string;
  PersonalName: string;
  SchoolYear: string;
  CharacterAge: string;
  Birthday: string;
  FamilyNameRuby: string;
  PersonalNameRuby: string;
  CharacterSSRNew: string;
  ProfileIntroduction: string;
  Hobby: string;
  CharacterVoice: string;
  BirthDay: string;
  Illustrator: string;
  Designer: string;
  CharHeightMetric: string;
  CharHeightImperial?: string;
  StabilityPoint: number;
  AttackPower1: number;
  AttackPower100: number;
  MaxHP1: number;
  MaxHP100: number;
  DefensePower1: number;
  DefensePower100: number;
  HealPower1: number;
  HealPower100: number;
  DodgePoint: number;
  AccuracyPoint: number;
  CriticalPoint: number;
  CriticalDamageRate: number;
  AmmoCount: number;
  AmmoCost: number;
  Range: number;
  RegenCost: number;
  Skills: Skills;
  FavorStatType: Array<string>;
  FavorStatValue: Array<Array<number>>;
  FavorAlts: Array<number>;
  MemoryLobby: Array<number>;
  MemoryLobbyBGM: number;
  FurnitureInteraction: Array<Array<Array<number>>>;
  FavorItemTags: Array<string>;
  FavorItemUniqueTags: Array<string>;
  IsLimited: number;
  Weapon: {
    Name: string;
    Desc: string;
    AdaptationType: string;
    AdaptationValue: number;
    AttackPower1: number;
    AttackPower100: number;
    MaxHP1: number;
    MaxHP100: number;
    HealPower1: number;
    HealPower100: number;
    StatLevelUpType: string;
  };
  Gear: {
    Released?: Array<boolean>;
    StatType?: Array<string>;
    StatValue?: Array<Array<number>>;
    Name?: string;
    Desc?: string;
    TierUpMaterial?: Array<Array<number>>;
    TierUpMaterialAmount?: Array<Array<number>>;
  };
  SkillExMaterial: Array<Array<number>>;
  SkillExMaterialAmount: Array<Array<number>>;
  SkillMaterial: Array<Array<number>>;
  SkillMaterialAmount: Array<Array<number>>;
  PotentialMaterial: number;
  AltSprite?: boolean;
  DefensePenetration1?: number;
  DefensePenetration100?: number;
  LinkedCharacterId?: number;
  StyleId?: number;
};

// Generated at 2025-01-16T06:27:45.193Z
