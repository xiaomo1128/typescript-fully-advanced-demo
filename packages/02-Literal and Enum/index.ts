/*
 * @Author: xianglei
 * @Date: 2024-12-04 18:01:44
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-04 23:31:13
 * @FilePath: \packages\02-Literal and Enum\index.ts
 * @Description:
 */
interface IRes {
  code: number;
  status: string;
  data: any;
}

interface IRes2 {
  code: 10000 | 20000 | 30000;
  status: "success" | "failed";
  data: any;
}

declare var res: IRes2; // 符合指定类型，但无实际值，同时也不存在于运行时中
// if(res.status === "success")

// 字面量类型，更加精确，是原始类型的子类型
const str: "linbudu" = "linbudu";
const num: 599 = 599;
const bool: true = true;

interface Tmp {
  mixed: true | string | 65 | {} | (() => {}) | (1 | 2);
  user: { vip: true; expires: string } | { vip: false; promotion: string };
}

declare var temp: Tmp;
// if (temp.user.vip) {
//   console.log(temp.user.expires);
// }
// 涉及类型守卫 与 类型控制流分析
/**
 * 注意：
 * 无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值。
 * 它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间
 */

enum PageUrl {
  Home_Page_Url = "url one",
  Setting_Page_Url = "url two",
  Share_Page_Url = "url three",
}

const home = PageUrl.Home_Page_Url;

// 没有声明枚举的值，它会默认使用数字枚举，并且从 0 开始，以 1 递增
// 只为某一个成员指定了枚举值，那么之前未赋值成员仍然会使用从 0 递增的方式，之后的成员则会开始从枚举值递增
// 延迟求值的枚举值
const returnNum = () => 100 + 10;
enum Items {
  Foo,
  Bar,
  Baz,
}
enum Items2 {
  Foo = returnNum(),
  Bar = 10,
  Baz,
}
// 仅有值为数字的枚举成员才能够进行这样的双向枚举，字符串枚举成员仍然只会进行单次映射
enum Items3 {
  Foo,
  Bar = "BarValue",
  Baz = "BazValue",
}
/**
 * 注意：延迟求值的枚举值，在编译时会被擦除，不会出现在运行时中。
 * 若使用了延迟求值，没使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后，或者放第一位
 */

enum Mixed {
  Num = 59,
  Str = "abc",
}

const fooVal = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"
console.log("fooVal->", fooVal, "fooKey->", fooKey);
/**
 * obj[k] = v 的返回值即是 v，因此这里的 obj[obj[k] = v] = k 本质上就是进行了 obj[k] = v 与 obj[v] = k 这样两次赋值
 */

// ============== 常量枚举 ==========
const enum Items5 {
  Foo,
  Bar,
  Baz,
}
// 不会存在一个额外的辅助对象(如上面Items)，对枚举成员的访问会被直接内联替换为枚举的值
const fooValue = Items5.Foo; // 0

/**
 * 实际上，常量枚举的表现、编译产物还受到配置项 --isolatedModules 以及 --preserveConstEnums 等的影响，我们会在后面的 TSConfig 详解中了解更多
 */
