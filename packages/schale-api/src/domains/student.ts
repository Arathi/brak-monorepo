export type School =
  | "Gehenna"
  | "Millennium"
  | "Trinity"
  | "Abydos"
  | "Shanhaijing"
  | "Hyakkiyako"
  | "RedWinter"
  | "SRT"
  | "Arius"
  | "Tokiwadai"
  | "Valkyrie"
  | "ETC"
  | "Sakugawa";
export type StarGrade = 3 | 2 | 1;
export type SquadType = "Main" | "Support";
export type TacticRole =
  | "DamageDealer"
  | "Tanker"
  | "Supporter"
  | "Healer"
  | "Vehicle";
export type Position = "Back" | "Front" | "Middle";
export type BulletType = "Explosion" | "Mystic" | "Pierce" | "Sonic";
export type ArmorType =
  | "LightArmor"
  | "HeavyArmor"
  | "Unarmed"
  | "ElasticArmor";
export type WeaponType =
  | "SR"
  | "SG"
  | "AR"
  | "MG"
  | "SMG"
  | "RG"
  | "HG"
  | "GL"
  | "RL"
  | "FT"
  | "MT";

export type Student = {
  Id: number;
  IsReleased: Array<boolean>;
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
  Skills: {
    Normal?: {
      Effects: Array<{
        Type: string;
        Hits: Array<number>;
        Scale: Array<number>;
        Block: number;
        Condition?: {
          Type: string;
          Parameter: string;
          Value: any;
          Operand?: string;
        };
        CriticalCheck?: string;
        IgnoreDef?: Array<number>;
      }>;
      Frames: {
        AttackEnterDuration: number;
        AttackStartDuration: number;
        AttackEndDuration: number;
        AttackBurstRoundOverDelay: number;
        AttackIngDuration: number;
        AttackReloadDuration: number;
        AttackReadyStartDuration?: number;
        AttackReadyEndDuration?: number;
      };
      FormChange?: {
        Effects: Array<{
          Type: string;
          Hits: Array<number>;
          Scale: Array<number>;
          Block: number;
        }>;
        Frames: {
          AttackEnterDuration: number;
          AttackStartDuration: number;
          AttackEndDuration: number;
          AttackBurstRoundOverDelay: number;
          AttackIngDuration: number;
          AttackReloadDuration: number;
          AttackReadyStartDuration?: number;
          AttackReadyEndDuration?: number;
        };
        Radius?: Array<{
          Type: string;
          Radius: number;
          Degree: number;
        }>;
      };
      Radius?: Array<{
        Type: string;
        Radius?: number;
        Degree?: number;
        Width?: number;
        Height?: number;
      }>;
    };
    Ex: {
      Name: string;
      Desc: string;
      Parameters: Array<Array<string>>;
      Cost: Array<number>;
      Duration?: number;
      Range?: number;
      Radius?: Array<{
        Type: string;
        Radius?: number;
        Width?: number;
        Height?: number;
        Degree?: number;
        ExcludeRadius?: number;
      }>;
      Icon: string;
      Effects: Array<{
        Type: string;
        Target: any;
        Duration?: number;
        Period?: number;
        ExtraStatSource?: string;
        ApplyFrame?: number;
        Scale?: Array<number>;
        ExtraStatRate?: Array<number>;
        Block?: number;
        CriticalCheck?: string;
        Hits?: Array<number>;
        DescParamId?: number;
        SummonId?: number;
        Value?: Array<Array<any>>;
        Stat?: string;
        CasterStat?: string;
        Channel?: number;
        Chance?: number;
        Icon?: string;
        Condition?: {
          Type: string;
          Parameter: string;
          Operand?: string;
          Value: any;
        };
        SubstituteCondition?: string;
        SubstituteScale?: Array<number>;
        Key?: string;
        Reposition?: Array<string>;
        Group?: number;
        IgnoreDef?: Array<number>;
        ValueType?: string;
        Uses?: number;
        ZoneHitInterval?: number;
        ZoneDuration?: number;
        Critical?: number;
        Restrictions?: Array<{
          Property: string;
          Operand: string;
          Value: string;
        }>;
        HpRateDamageModifier?: {
          MinHpRate: number;
          MaxHpRate: number;
          MultiplierMin: number;
          MultiplierMax: number;
        };
        HitFrames?: Array<number>;
        OverrideSlot?: string;
      }>;
      GroupLabel?: {
        "0": {
          Label?: string;
          Disabled?: boolean;
          Icon?: string;
          LabelTranslated?: string;
        };
        "1": {
          Label?: string;
          Disabled?: boolean;
          Icon?: string;
          LabelTranslated?: string;
        };
        "2"?: {
          Label: string;
          Disabled?: boolean;
          Icon?: string;
        };
        "3"?: {
          Label: string;
          Disabled?: boolean;
          Icon?: string;
        };
        "4"?: {
          Icon: string;
          Label: string;
        };
        "5"?: {
          Icon: string;
          Label: string;
        };
        "6"?: {
          Icon: string;
          Label: string;
        };
        "7"?: {
          Icon: string;
          Label: string;
        };
        "8"?: {
          Icon: string;
          Label: string;
        };
        "9"?: {
          Icon: string;
          Label: string;
        };
        "10"?: {
          Icon: string;
          Label: string;
        };
        "11"?: {
          Icon: string;
          Label: string;
        };
        "12"?: {
          Icon: string;
          Label: string;
        };
        "13"?: {
          Icon: string;
          Label: string;
        };
        "14"?: {
          Icon: string;
          Label: string;
        };
      };
      SortHits?: number;
      ExtraSkills?: Array<{
        Id: string;
        Name: string;
        Desc: string;
        Parameters: Array<Array<string>>;
        Radius?: Array<{
          Type: string;
          Radius?: number;
          Width?: number;
          Height?: number;
        }>;
        Icon: string;
        Effects: Array<{
          Type: string;
          Block: number;
          CriticalCheck: string;
          Hits: Array<number>;
          DescParamId: number;
          Scale: Array<number>;
          ApplyStability?: boolean;
          IgnoreDef?: Array<number>;
        }>;
        Type: string;
        Cost?: Array<number>;
        Duration?: number;
        Range?: number;
        TSAId?: number;
      }>;
    };
    Public: {
      Name: string;
      Desc: string;
      Parameters: Array<Array<string>>;
      Duration?: number;
      Range?: number;
      Radius?: Array<{
        Type: string;
        Radius?: number;
        Degree?: number;
        Width?: number;
        Height?: number;
      }>;
      Icon: string;
      Effects: Array<{
        Type: string;
        Block?: number;
        CriticalCheck?: string;
        Hits?: Array<number>;
        DescParamId?: number;
        Scale?: Array<number>;
        Target: any;
        Value?: Array<Array<number>>;
        Stat?: string;
        Channel?: number;
        Duration?: number;
        ApplyFrame?: number;
        Period?: number;
        Key?: string;
        Chance?: number;
        Icon?: string;
        IgnoreDef?: Array<number>;
        Condition?: {
          Type: string;
          Parameter: string;
          Operand?: string;
          Value: any;
        };
        Restrictions?: Array<{
          Property: string;
          Operand: string;
          Value: any;
        }>;
        Critical?: number;
        StackSame?: number;
        SourceStat?: string;
        HitFrames?: Array<number>;
        Group?: number;
        StackLabel?: Array<{
          Icon: string;
          Label: string;
        }>;
        ValueType?: string;
        Uses?: number;
        SummonId?: number;
        CasterStat?: string;
      }>;
      ExtraSkills?: Array<{
        Id: string;
        Name: string;
        Desc: string;
        Parameters: Array<Array<string>>;
        Duration: number;
        Range: number;
        Icon: string;
        Effects: Array<{
          Type: string;
          Condition: {
            Type: string;
            Parameter: string;
            Operand: string;
            Value: boolean;
          };
          Block: number;
          CriticalCheck: string;
          Hits: Array<number>;
          DescParamId: number;
          Scale: Array<number>;
          IgnoreDef?: Array<number>;
        }>;
        Type: string;
      }>;
      GroupLabel?: {
        "0": {
          Icon?: string;
          Label: string;
          Disabled?: boolean;
        };
        "1": {
          Icon?: string;
          Label: string;
        };
        "2": {
          Icon?: string;
          Label: string;
        };
        "3"?: {
          Icon: string;
          Label: string;
        };
        "4"?: {
          Icon: string;
          Label: string;
        };
        "5"?: {
          Icon: string;
          Label: string;
        };
        "6"?: {
          Icon: string;
          Label: string;
        };
        "7"?: {
          Icon: string;
          Label: string;
        };
        "8"?: {
          Icon: string;
          Label: string;
        };
      };
    };
    GearPublic?: {
      Name: string;
      Desc: string;
      Parameters: Array<Array<string>>;
      Duration?: number;
      Range?: number;
      Radius?: Array<{
        Type: string;
        Radius: number;
        Degree?: number;
      }>;
      Icon: string;
      Effects: Array<{
        Type: string;
        SummonId?: number;
        Value?: Array<Array<number>>;
        Stat?: string;
        CasterStat?: string;
        Channel?: number;
        Duration?: number;
        Target: any;
        ApplyFrame?: number;
        HpRateDamageModifier?: {
          MinHpRate: number;
          MaxHpRate: number;
          MultiplierMin: number;
          MultiplierMax: number;
        };
        Block?: number;
        CriticalCheck?: string;
        Hits?: Array<number>;
        DescParamId?: number;
        Scale?: Array<number>;
        ValueType?: string;
        Uses?: number;
        IgnoreDef?: Array<number>;
        Period?: number;
        Key?: string;
        Chance?: number;
        Icon?: string;
        HitFrames?: Array<number>;
      }>;
      ExtraSkills?: Array<{
        Id: string;
        Name: string;
        Desc: string;
        Parameters: Array<Array<string>>;
        Icon: string;
        Effects: Array<any>;
        Type: string;
      }>;
    };
    Passive: {
      Name: string;
      Desc: string;
      Parameters: Array<Array<string>>;
      Icon: string;
      Effects: Array<{
        Type: string;
        Target: Array<string>;
        Stat: string;
        Channel: number;
        Value: Array<Array<number>>;
      }>;
    };
    WeaponPassive: {
      Name: string;
      Desc: string;
      Parameters: Array<Array<string>>;
      Icon: string;
      Effects: Array<{
        Type: string;
        Target: Array<string>;
        Stat: string;
        Channel: number;
        Value: Array<Array<number>>;
      }>;
    };
    ExtraPassive: {
      Name: string;
      Desc: string;
      Parameters: Array<Array<string>>;
      Icon: string;
      Effects: Array<{
        Type: string;
        Target: any;
        Value?: Array<Array<number>>;
        Stat?: string;
        Channel?: number;
        Duration?: number;
        Block?: number;
        CriticalCheck?: string;
        Hits?: Array<number>;
        DescParamId?: number;
        Scale?: Array<number>;
        MultiplySource?: string;
        MultiplierConstant?: Array<number>;
        Condition?: {
          Type: string;
          Parameter: string;
          Operand: string;
          Value: string;
        };
        StackSame?: number;
        Period?: number;
        Icon?: string;
        Group?: number;
        ValueType?: string;
        Uses?: number;
        HideFormChangeIcon?: boolean;
        Frames?: {
          AttackEnterDuration: number;
          AttackStartDuration: number;
          AttackEndDuration: number;
          AttackBurstRoundOverDelay: number;
          AttackIngDuration: number;
          AttackReloadDuration: number;
        };
        IgnoreDef?: Array<number>;
        Chance?: number;
        Key?: string;
        Restrictions?: Array<{
          Property: string;
          Operand: string;
          Value: string;
        }>;
      }>;
      Radius?: Array<{
        Type: string;
        Radius: number;
        Degree?: number;
      }>;
      GroupLabel?: {
        "0": {
          Icon?: string;
          Label: string;
        };
        "1": {
          Icon?: string;
          Label: string;
        };
        "2": {
          Icon?: string;
          Label: string;
        };
        "3"?: {
          Label: string;
        };
        "4"?: {
          Label: string;
        };
      };
    };
  };
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
