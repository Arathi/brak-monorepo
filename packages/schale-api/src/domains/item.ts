// Item

import type {} from "./index";
import {} from "./index";

export enum Category {
  Material = "Material",
  Coin = "Coin",
  CharacterExpGrowth = "CharacterExpGrowth",
  Favor = "Favor",
  SecretStone = "SecretStone",
  Collectible = "Collectible",
  Consumable = "Consumable",
}

export type Item = {
  Id: number;
  IsReleased: Array<boolean>;
  Category: Category;
  Rarity: string;
  Quality: number;
  Tags: Array<string>;
  CraftQuality?: number;
  Craftable: Array<boolean>;
  StageDrop: Array<boolean>;
  Shop: Array<boolean>;
  Icon: string;
  Name: string;
  Desc: string;
  ExpValue?: number;
  ShiftingCraftQuality?: number;
  SubCategory?: string;
  EventId?: number;
  EventBonus?: {
    Jp?: Array<Array<number>>;
    Global?: Array<Array<number>>;
    Cn?: Array<Array<number>>;
  };
  ShiftingCraftRecipe?: {
    Released: Array<boolean>;
    RequireItem: Array<number>;
    RequireGold: number;
    IngredientTag: Array<string>;
    IngredientExp: number;
  };
  EventBonusRerun?: {
    Jp?: Array<Array<number>>;
  };
  ConsumeType?: string;
  GachaGroupId?: number;
  Items?: Array<{
    Type: string;
    Id: number;
    AmountMin: number;
    AmountMax: number;
  }>;
  ItemsCn?: Array<{
    Type: string;
    Id: number;
    AmountMin: number;
    AmountMax: number;
  }>;
  ItemsGlobal?: Array<{
    Type: string;
    Id: number;
    AmountMin: number;
    AmountMax: number;
  }>;
};

// Generated at 2025-01-16T06:28:40.863Z
