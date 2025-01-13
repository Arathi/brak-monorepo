export type Numbered = {
  Id: number;
};

export type Released = Numbered & {
  IsReleased: [boolean, boolean, boolean];
};

export type DataMap<D extends Numbered = Numbered> = {
  [id: number]: D;
}
