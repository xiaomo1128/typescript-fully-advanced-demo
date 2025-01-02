// 键名均为字符串，键值类型未知
type Record1 = Record<string, unknown>;
// 键名均为字符串，键值类型任意
type Record2 = Record<string, any>;
// 键名为字符串或数字，键值类型任意
type Record3 = Record<string | number, any>;

/****************************** */

type Dictionary<T> = {
  [index: string]: T;
};

type NumericDictionary<T> = {
  [index: number]: T;
};

/****************************** */

type Pickk<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omitt<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface Foo {
  name: string;
  age: number;
  job: JobUnionType;
}

type PickedFoo = Pick<Foo, "name" | "age">;

/****************************** */

type SetA = 1 | 2 | 3 | 5;

type SetB = 0 | 1 | 2 | 4;

type AExcludeB = Exclude<SetA, SetB>; // 3 | 5
type BExcludeA = Exclude<SetB, SetA>; // 0 | 4

type _AExcludeB =
  | (1 extends 0 | 1 | 2 | 4 ? never : 1) // never
  | (2 extends 0 | 1 | 2 | 4 ? never : 2) // never
  | (3 extends 0 | 1 | 2 | 4 ? never : 3) // 3
  | (5 extends 0 | 1 | 2 | 4 ? never : 5); // 5

type _BExcludeA =
  | (0 extends 1 | 2 | 3 | 5 ? never : 0) // 0
  | (1 extends 1 | 2 | 3 | 5 ? never : 1) // never
  | (2 extends 1 | 2 | 3 | 5 ? never : 2) // never
  | (4 extends 1 | 2 | 3 | 5 ? never : 4); // 4

/****************************** */

// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;

/****************************** */

type NonNullable<T> = T extends null | undefined ? never : T;

type _NonNullable<T> = Difference<T, null | undefined>;

/****************************** */

type FunctionType = (...args: any) => any;

type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never;

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any;

/****************************** */

type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;

type FooFirstParameter = FirstParameter<FuncFoo>; // number

type BarFirstParameter = FirstParameter<FuncBar>; // string

/****************************** */

type ClassType = abstract new (...args: any) => any;

type ConstructorParameters<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

type InstanceType<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;

/****************************** */
export interface ClassType<TInstanceType = any> {
  new (...args: any[]): TInstanceType;
}

/****************************** */
