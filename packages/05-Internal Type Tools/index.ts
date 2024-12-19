/*
 * @Author: xianglei
 * @Date: 2024-12-18 15:37:39
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-19 16:10:23
 * @FilePath: \packages\05-Internal Type Tools\index.ts
 * @Description:
 */
// 映射类型
type Readonly1<T> = {
  readonly [P in keyof T]: T[P];
};

// 条件类型
type NonNullable1<T> = T extends null | undefined ? never : T;

// 工具类型
type Pick1<T, K extends keyof T> = {
  [P in K]: T[P];
};

type StatusCode = 200 | 400 | 500;
type PossibleDataTypes = string | number | (() => unknown);

const status1: StatusCode = 200;

type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => {};
const moveHandler: Handler = (e) => {};
const dragHandler: Handler = (e) => {};

type ObjType = {
  name: string;
  age: number;
};

type Factory<T> = T | number | string;

const fooV: Factory<boolean> = true;

type FactoryWithBool = Factory<boolean>;
const fooV2: FactoryWithBool = true;

// 泛型变量非简写 大驼峰形式
type Factory1<NewType> = NewType | number | string;

// 工具类型
type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}

type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

interface NameStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "Alice",
  age: 25,
};

type StrAndNum = string & number; // never

type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};

type Composed = Struct1 & Struct2;

type primitivePropType = Composed["primitiveProp"]; // never
type objectPropType = Composed["objectProp"]; // { name: string } & { age: number }

type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string

interface AllStringTypes1 {
  [key: string]: string;
}

type AllStringTypes2 = {
  [key: string]: string;
};

type PropType1 = AllStringTypes1["111"]; // string
type PropType2 = AllStringTypes2["123"]; // string

const fooV3: AllStringTypes1 = {
  "111": "hello",
  222: "world",
  [Symbol("ddd")]: "symbol",
};

interface AllStringTypes3 {
  // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
  // propA: number;
  [key: string]: boolean;
}

interface StringOrBooleanTypes {
  propA: number;
  propB: boolean;
  [key: string]: number | boolean;
}

interface AnyTypeHere {
  [key: string]: any;
}
const fooV4: AnyTypeHere["123"] = "any value";

/** keyof 索引类型查询
 * 将对象中所有key转换为对应字面量类型，然后再组合成联合类型
 *
 * */
interface Foo4 {
  abc: 1;
  22: 1;
}
/** 不会将数字类型的key转为字符串类型字面量，而是保留原有的数字类型 */
type FooKeys1 = keyof Foo4; // "abc" | 22
// 在 VS Code 中悬浮鼠标只能看到 'keyof Foo'
// 看不到其中的实际值，你可以这么做：
type FooKeys2 = keyof Foo4 & {}; // "abc" | 22

// type FooKeys3 = Object.keys(Foo4).join(' | '); // "abc|22"

/** 索引类型访问 */
interface NumberRecord {
  [key: string]: number;
}
type PropType = NumberRecord[string]; // number

interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
  propD: () => void;
}
type PropAType = Foo["propA"]; // number
type PropBType = Foo["propB"]; // boolean

type PropTypeUnion = Foo[keyof Foo]; // number | boolean | string

// type PropAType2 = Foo[string];

/** 映射类型 */
type Stringify<T> = {
  [K in keyof T]: string;
};
type StringifiedFoo = Stringify<Foo>;
// 等价于
interface StringifiedFoo2 {
  propA: string;
  propB: string;
  propC: string;
  propD: string;
}
/** 伪代码形式说明 */
const StringifiedFoo3 = {};
// for (const key in Object.keys(Foo)) {
//     StringifiedFoo3[key] = string;
// }
/** 取到key，对应的value也能获取
 * [K in keyof T]的[]属于索引签名类型，T[K]属于索引类型访问
 */
type Clone<T> = {
  [K in keyof T]: T[K];
};
