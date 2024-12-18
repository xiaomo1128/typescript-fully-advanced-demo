/*
 * @Author: xianglei
 * @Date: 2024-12-17 23:38:26
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-18 15:34:53
 * @FilePath: \packages\04-Any & Unknown & Never\index.ts
 * @Description:
 */
interface IFoo {
  name: string;
}

declare const obj: {
  foo: IFoo;
};

// const {
//     foo : {} as Partial<IFoo>
// } = obj;

const str1: string = "hello";

(str as string | { handler: () => {} } as { handler: () => {} }).handler();

(<{ handler: () => {} }>(<unknown>str)).handler();

interface Istruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}

// 不那么完整实现这个结构
const obj2 = <Istruct>{
  bar: {
    baz: {
      handler: () => {},
    },
  },
};

/*
    类型层级关系：
    1. 最顶级的类型，any 与 unknown
    2. 特殊的 Object，包含了所有类型，但和 TopType 比还是差了一层
    3. String、Boolean、Number 装箱类型
    4. 原始类型与对象类型
    5. 字面量类型，即 更精确的原始类型与对象类型，需注意null与undefined不是字面量类型的子类型
    6. 最底层是 never

*/
