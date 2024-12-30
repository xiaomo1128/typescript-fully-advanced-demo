/*
 * @Author: xianglei
 * @Date: 2024-12-20 18:26:31
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-30 11:34:13
 * @FilePath: \packages\06-Generic Types\index.ts
 * @Description:
 */
type Factory<T> = T | number | string;

// function FactoryFn(typeArg) {
//     return [typeArg,number,string]
// }

type IsEqual<T> = T extends true ? 1 : 2;
type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<"a">; // 2

type Factory2<T = boolean> = T | number | string;
const fooV: Factory2 = false;

// 泛型约束
function add(source: number, add: number) {
  if (typeof source !== "number" || typeof add !== "number") {
    throw new Error("source and add must be number");
  }
  return source + add;
}

// 多泛型关联
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;
type A1 = Conditional<"a", string, "b", "c">; // 'b'
type B1 = Conditional<"aa", boolean, "bb", "cc">; // 'cc'

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;

interface IRes<TData = unknown> {
  code: number;
  errror?: string;
  data1: TData;
}

interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

// function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {}
// type StatusSucceed = boolean;
// function handleOperation(): Promise<IRes<StatusSucceed>> {}

interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}
// function fetchUserProfileList(): Promise<
//   IRes<IPaginationRes<IUserProfileRes>>
// > {}

// function handleFn(Input: string | number | {}): string | number | {} {}

// const shouldBeString = handleFn("linbudu");
// const shouldBeNumber = handleFn(599);
// const shouldBeObject = handleFn({ name: "linbudu" });

function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);

// pick<T extends object, U extends keyof T>(object: T,...props: Array<U>): Pick<T, U> {}

function handleFn2<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload]);
  });
}

class Queue<TELementType> {
  private _list: TELementType[];

  constructor(initial: TELementType[]) {
    this._list = initial;
  }

  // 入队一个队列泛型子类型的元素
  enqueue<TType extends TELementType>(ele: TType): TELementType[] {
    this._list.push(ele);
    return this._list;
  }

  // 入队一个任意类型元素（无需为队列泛型子类型）
  enqueueWithUnknownType<TType>(element: TType): (TELementType | TType)[] {
    return [...this._list, element];
  }

  // 出队
  dequeue(): TELementType[] {
    this._list.shift();
    return this._list;
  }
}

function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}

interface PromiseConstructor {
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
declare var Promise: PromiseConstructor;

const arr: Array<number> = [1, 2, 3];
arr.reduce<number[]>((prev, curr, idx, arr) => {
    return prev;
}, [])

const [state, setState] = useState<number[]>([]);
const ref = useRef<number>();
const context = createContext<ContextType>({});




/**
 * 逻辑混淆  代码混淆  都能解出来  内存容量会炸？  ast语法树
 * webpack核心模块 7个模块
 *
 *
 *
 * 中等偏多 easy 算法题
 *
 * shelljs 是什么作用
 *
 * tapable 是什么作用
 *
 * parcel 起项目
 *
 * turbo 想集成 swc webpack 等
 *
 *点分十进制  192.168.1.100
 * hosts 本机没有
 *
 * 缓存快，DNS解析才快
 *
 * 浏览器原理：信号机制 相关资料查询 google chrome文档
 * 浏览器如何发起HTTP请求：浏览器导航
 * 网络进程、渲染进程、浏览器进程(主进程)
 * 用户输入在浏览器进程处理
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
