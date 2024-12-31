/*
 * @Author: xianglei
 * @Date: 2024-12-30 11:36:01
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-31 10:19:07
 * @FilePath: \packages\07-Structural Type System\index.ts
 * @Description: 
 */
// class Cat {
//   meow() {}
//   eat() {}
// }

// class Dog {
//   eat() {}
// }

// function feedCat(cat: Cat) {}

// // 报错！
// feedCat(new Dog());

/*********************** */

// class Cat {
//   eat(): boolean {
//     return true;
//   }
// }

// class Dog {
//   eat(): number {
//     return 599;
//   }
// }

// function feedCat(cat: Cat) {}

// // 报错！
// feedCat(new Dog());

/*************************** */

export declare class TagProtector<T extends string> {
  protected __tag__: T;
}
export type Nominal<T, U extends string> = T & TagProtector<U>;

// export type CNY=Nominal<number, "CNY">;
// export type USD=Nominal<number, "USD">;

// const CNYCount = 100 as CNY;
// const USDCount = 100 as USD;
// function addCNY(source: CNY, input: CNY) {
//     return (source + input) as CNY;
// }

// addCNY(CNYCount, CNYCount);
// addCNY(CNYCount,USDCount);

/************************** */

class CNY {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD {
  private __tag!: void;
  constructor(public value: number) {}
}
const CNYCount = new CNY(100);
const USDCount = new USD(100);
function addCNY(source: CNY, input: CNY) {
  return new CNY(source.value + input.value);
}

addCNY(CNYCount, CNYCount);
addCNY(CNYCount, USDCount);

/************************* */

declare const tag: unique symbol;
declare type Tagged<Token> = {
    readonly [tag]: Token;
}
export type Opaque<Type, Token = unknown> = Type & Tagged<Token>;

/************************** */






