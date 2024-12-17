/*
 * @Author: xianglei
 * @Date: 2024-12-04 23:38:12
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-17 18:28:02
 * @FilePath: \packages\03-Function and Class\index.ts
 * @Description:
 */

const foo1: (name: string) => number = function (name: string): number {
  return name.length;
};

const foo2 = (name: string): number => {
  return name.length;
};

const foo3: (name: string) => number = (name) => {
  return name.length;
};

type FunFoo = (name: string) => number;

const foo4: FunFoo = (name) => {
  return name.length;
};

// 函数类型结构
interface FuncFooStruct {
  (name: string): number;
}

// undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值
function foo5(): void {}

// 存在返回操作，但无返回实际的值
function bar1(): undefined {
  return;
}

// 可选参数必须位于必选参数之后
function foo6(name: string, age?: number): number {
  const inputAge = age ?? 18;
  return name.length + inputAge;
}

// 声明默认值
function foo7(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

function foo8(arg1: string, ...rest: any[]) {}

function foo9(arg1: string, ...rest: [number, boolean]) {}

foo9("hello", 1, true);

function func1(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 2;
  }
}

/** 抽象类 */
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): void;
}

class FooImpl implements AbsFoo {
  absProp: string = "absProp";

  get absGetter() {
    return "absGetter";
  }
  absMethod(name: string) {
    return name;
  }
}
/** ts中 无法声明静态的抽象成员 */
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string;
}

class Foo1 implements FooStruct {
  absProp: string = "absProp";
  get absGetter() {
    return "absGetter";
  }
  absMethod(input: string): string {
    return input;
  }
}

/** 回调interface */
class Foo2 {}

interface FooStruct2 {
  new (): Foo2;
}

declare const NewableFoo: FooStruct2;

const fooVar = new NewableFoo();

/** 对类的构造函数进行访问行修饰 */
class Foo3 {
  private constructor() {}
}
/** 当实例化上述类时，会报错：类的构造函数是私有的，只允许在类内部访问 */

/** 私有构造函数阻止被错误的实例化 */
class Utils {
  public static identify = "Utils";

  private constructor() {}

  public static sayHello() {}
}

/** 开放封闭原则：使用抽象类，将基础方法抽离 */
enum LoginType {
  WECHAT = "WECHAT",
  TAOBAO = "TAOBAO",
  TIKTOK = "TIKTOK",
}
abstract class LoginHandler {
  abstract handler(): void;
}

class WeChatLoginHandler implements LoginHandler {
  handler() {}
}

class TaoBaoLoginHandler implements LoginHandler {
  handler() {}
}

class TikTokLoginHandler implements LoginHandler {
  handler() {}
}

class Login {
  public static handlerMap: Record<LoginType, LoginHandler> = {
    [LoginType.WECHAT]: new WeChatLoginHandler(),
    [LoginType.TAOBAO]: new TaoBaoLoginHandler(),
    [LoginType.TIKTOK]: new TikTokLoginHandler(),
  };
  public static handle(type: LoginType) {
    Login.handlerMap[type].handler();
  }
}
