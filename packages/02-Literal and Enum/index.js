// if(res.status === "success")
// 字面量类型，更加精确，是原始类型的子类型
var str = "linbudu";
var num = 599;
var bool = true;
// if (temp.user.vip) {
//   console.log(temp.user.expires);
// }
// 涉及类型守卫 与 类型控制流分析
/**
 * 注意：
 * 无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值。
 * 它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间
 */
var PageUrl;
(function (PageUrl) {
    PageUrl["Home_Page_Url"] = "url one";
    PageUrl["Setting_Page_Url"] = "url two";
    PageUrl["Share_Page_Url"] = "url three";
})(PageUrl || (PageUrl = {}));
var home = PageUrl.Home_Page_Url;
// 没有声明枚举的值，它会默认使用数字枚举，并且从 0 开始，以 1 递增
// 只为某一个成员指定了枚举值，那么之前未赋值成员仍然会使用从 0 递增的方式，之后的成员则会开始从枚举值递增
// 延迟求值的枚举值
var returnNum = function () { return 100 + 10; };
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz";
})(Items || (Items = {}));
var Items2;
(function (Items2) {
    Items2[Items2["Foo"] = returnNum()] = "Foo";
    Items2[Items2["Bar"] = 10] = "Bar";
    Items2[Items2["Baz"] = 11] = "Baz";
})(Items2 || (Items2 = {}));
// 仅有值为数字的枚举成员才能够进行这样的双向枚举，字符串枚举成员仍然只会进行单次映射
var Items3;
(function (Items3) {
    Items3[Items3["Foo"] = 0] = "Foo";
    Items3["Bar"] = "BarValue";
    Items3["Baz"] = "BazValue";
})(Items3 || (Items3 = {}));
/**
 * 注意：延迟求值的枚举值，在编译时会被擦除，不会出现在运行时中。
 * 若使用了延迟求值，没使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后，或者放第一位
 */
var Mixed;
(function (Mixed) {
    Mixed[Mixed["Num"] = 59] = "Num";
    Mixed["Str"] = "abc";
})(Mixed || (Mixed = {}));
var fooVal = Items.Foo; // 0
var fooKey = Items[0]; // "Foo"
console.log("fooVal->", fooVal, "fooKey->", fooKey);
var fooValue = 0 /* Items5.Foo */; // 0
