/*
 * @Author: xianglei
 * @Date: 2024-12-31 17:06:16
 * @LastEditors: xianglei
 * @LastEditTime: 2025-01-01 23:57:13
 * @FilePath: \packages\09-Conditional Types\src\index.ts
 * @Description:
 */

// type LiteralType<T> = T extends string ? "string" : "other";

// type Res1 = LiteralType<"linbudu">; // "string"
// type Res2 = LiteralType<599>; // "other"

/******************************* */

export type LiteralType<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends null
  ? "null"
  : T extends undefined
  ? "undefined"
  : never;

type Res1 = LiteralType<"linbudu">; // "string"
type Res2 = LiteralType<599>; // "number"
type Res3 = LiteralType<true>; // "boolean"

/******************************* */

// function universalAdd<T extends number | bigint | string>(x: T, y: T) {
//     return x + (y as any);
// }
// universalAdd(599, 1); // T 填充为 599 | 1
// universalAdd("linbudu", "599"); // T 填充为 linbudu | 599

/******************************* */

function universalAdd<T extends number | bigint | string>(
  x: T,
  y: T
): LiteralToPrimitive<T> {
  return x + (y as any);
}

export type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never;

universalAdd("linbudu", "599"); // string
universalAdd(599, 1); // number
universalAdd(10n, 10n); // bigint

/******************************* */

type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? "A string return func!"
  : "A non-string return func!";

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;

/******************************* */

type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never;

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

/******************************* */

// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;

/******************************* */

type ArrayItemType<T> = T extends Array<infer ElementType>
  ? ElementType
  : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number

/******************************* */

// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, "name">; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, "name" | "age">; // string | number

// 反转键名与键值
// type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
//   infer K,
//   infer V
// >
//   ? Record<V & string, K>
//   : never;

// type ReverseKeyValueResult1 = ReverseKeyValue<{ key: "value" }>; // { "value": "key" }

/******************************* */

// 类型“V”不满足约束“string | number | symbol”。
type ReverseKeyValue<T extends Record<string, string>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V, K>
  : never;

/******************************* */

// type PromiseValue<T> = T extends Promise<infer V> ? V : T;

// 递归提取 Promise 值
// type PromiseValue<T> = T extends Promise<infer V>
//   ? V extends Promise<infer N>
//     ? N
//     : V
//   : T;

// 递归提取 Promise 值 (简化版)
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<string>; // string，但并没有发生提取
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>; // Promise<boolean>，只提取了一层

/******************************* */

type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type Ress1 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Ress2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;

/******************************* */

type Naked<T> = T extends boolean ? "Y" : "N";
// type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Ress3 = Naked<number | boolean>;

// "N"
type Ress4 = Wrapped<number | boolean>;

/******************************* */

export type NoDistribute<T> = T & {};

type Wrapped<T> = NoDistribute<T> extends boolean ? "Y" : "N";

type Resss1 = Wrapped<number | boolean>; // "N"
type Resss2 = Wrapped<true | false>; // "Y"
type Resss3 = Wrapped<true | false | 599>; // "N"

/******************************* */

type CompareUnion<T, U> = [T] extends [U] ? true : false;

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false

/******************************* */

type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"linbudu">; // false

/******************************* */

// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2; // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1

/******************************* */

// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2; // 1

type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never>; // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never

/******************************* */

type Intersection<A, B> = A extends B ? A : never;

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3

/******************************* */

type IsAny<T> = 0 extends 1 & T ? true : false;

type Tmpp1 = 1 & (0 | 1); // 1
type Tmpp2 = 1 & number; // 1
type Tmpp3 = 1 & 1; // 1
type Tmpp4 = 1 & any; // any

/******************************* */

type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false;

type IsUnknown2<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;

/******************************* */
