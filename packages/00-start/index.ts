/*
 * @Author: xianglei
 * @Date: 2024-12-02 18:17:44
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-03 16:33:23
 * @FilePath: \index.ts
 * @Description: 
 */

interface Foo {
    name: string;
    age: number;
}

interface Bar {
    name: string;
    job: string;
}

// 方式1
/**
 let foo: Foo = {
     name: 'Alice',
     age: 25
 }
 
 let bar: Bar = {
     name: 'Bob',
     job: 'Engineer'
 }
 */

// 方式2
declare let foo: Foo;
declare let bar: Bar;

// 对比两者类型
// foo = bar;  

// 编译器会报错，因为foo和bar的类型不匹配
// 第一种更安全，适合需要强类型检查的场景；
// 第二种适用于某些声明变量但无法提供初始值的特殊场景（例如与外部接口或全局变量交互）