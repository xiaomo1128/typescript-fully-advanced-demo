// const temp: string = null; // strictNullChecks: true 时，null 不能赋值给 string 类型

// 方式一：
void (function iife() {
  console.log("invoked");
})();
// 方式二：
void (function iife() {})();

/** ------------------------------------- */
// 没有显示 return 某个类型
function fun1() {}

function fun2() {
  return;
}

// 以下是一样的结果
function fun3() {
  return undefined;
}
function fun4(): void {
  return undefined;
}

const arr1: string[] = [];
const arr2: Array<string> = [];

const arr3: string[] = ["a", "b", "c"];
console.log(arr3[5]);

const arr4: [string, number?, boolean?] = ["asdf"];

type tupleLength = typeof arr4.length;

const arr5: [name: string, age: number, mele?: boolean] = ["ad", 5, true];

const [ele1, ele2, ...rest] = arr1;

interface IDescription {
  readonly name: string;
  age: number;
  mele?: boolean;
  func?: () => void;
  func2?: Function;
}

const obj1: IDescription = {
  name: "ad",
  age: 5,
  mele: true,
};

obj1.mele = false;
obj1.func2 = () => {};

const tmp1: Object = undefined;
const tmp2: Object = null;
const tmp3: Object = void 0;

const tmp4: Object = "abc";
const tmp5: Object = 123;
const tmp6: Object = { name: "ba" };
const tmp7: Object = () => {};
const tmp8: Object = [];

const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;

// 以下不成立，因为不是字符串类型的拆箱类型
const tmp13: String = 599; // X
const tmp14: String = { name: "linbudu" }; // X
const tmp15: String = () => {}; // X
const tmp16: String = []; // X

const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = "linbudu"; // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: "linbudu" };
const tmp23: object = () => {};
const tmp24: object = [];

const tmp25: {} = undefined; // 仅在关闭 strictNullChecks 时成立，下同
const tmp26: {} = null;
const tmp27: {} = void 0; // void 0 等价于 undefined

const tmp28: {} = "linbudu";
const tmp29: {} = 599;
const tmp30: {} = { name: "linbudu" };
const tmp31: {} = () => {};
const tmp32: {} = [];

tmp30.age = 19; // 不存在age

const uniqueSymbolFoo: unique symbol = Symbol("foo");
console.log( uniqueSymbolFoo); //Symbol(foo)

// 类型不兼容
const uniqueSymbolBar: unique symbol = uniqueSymbolFoo;


// 仅声明  运行会报错
declare const uniqueSymbolFoo: unique symbol;
const uniqueSymbolBaz: typeof uniqueSymbolFoo = uniqueSymbolFoo

