import {
  SquadType,
  BulletType,
  ArmorType,
  TacticRole,
  School,
} from "./student";

type Dictionary = Record<string, string>;

export type Localization = {
  SquadType: {
    [key in SquadType]: string;
  };
  BulletType: {
    [key in BulletType]: string;
  };
  ArmorType: {
    [key in ArmorType]: string;
  };
  ArmorTypeLong: {
    [key in ArmorType]: string;
  };
  TacticRole: {
    [key in TacticRole]: string;
  };
  School: {
    [key in School]: string;
  };
  SchoolLong: {
    [key in School]: string;
  };
  [key: string]: Dictionary;
};
