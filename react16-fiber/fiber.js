/*
 * @Author: xianglei
 * @Date: 2024-12-02 22:05:10
 * @LastEditors: xianglei
 * @LastEditTime: 2024-12-02 22:42:06
 * @FilePath: \fiber.js
 * @Description: React Fiber 16.8.6
 * 
 * requestAnimationFrame()回调执行 与task 和 microtask无关，是在浏览器渲染前，在微任务执行后 执行，时机其实并不准确
 * 
 * requestAnimationFrame() 特点：当页面处理未激活的状态下，requestAnimationFrame()会被暂停，以节省资源；当页面处于激活状态时，requestAnimationFrame()会接着上次的位置继续执行，以保证动画流畅。
 */
let tasks = []; // 任务队列
let isPerformingTask = false; // 当前是否正在执行任务

// 1000/60 = 16.67ms，即每秒执行60次任务 16.67ms后，执行下一个任务

const channal = new MessageChannel(); // 创建消息通道
const port = channal.port2; // 接收消息的端口,获取通道的第二个端口

function scheduleTask(task, deadline) {
  tasks.push({ task, deadline }); // 任务队列中添加任务

  if (!isPerformingTask) {
    isPerformingTask = true; // 标记当前正在执行任务
    port.postMessage(null); // 向通道第二个端口 发送一个空消息
  }
}

function performTask(currentTime) {
  // console.log('currentTime:', currentTime);

  const frameTime = 1000 / 60; // 1000ms/60fps = 16.67ms = 1帧
  while (tasks.length > 0 && performance.now() - currentTime < frameTime) {
    const { task, deadline } = tasks.shift(); // 取出任务队列的第一个任务
    if (deadline <= performance.now()) {
      task(); // 任务没过期，执行任务
    } else {
      tasks.push({ task, deadline }); // 任务超时，重新放入任务队列
    }
  }
  if (tasks.length) {
    requestAnimationFrame(performTask); // 继续下一帧
  } else {
    isPerformingTask = false; // 任务队列为空，停止执行
  }
}

// 接收消息，开始执行任务
channal.port1.onmessage = () => requestAnimationFrame(performTask);

// 示例任务
function myTask1() {
  console.log("Performing myTask1");
}

function myTask2() {
  console.log("Performing myTask2");
}

function myTask3() {
  console.log("Performing myTask3");
}

function scheduleTask(task, deadline) {
  tasks.push({ task, deadline });
  port.postMessage(null); // 发送消息，通知任务队列有新任务
}

// 添加超时任务到任务队列，并设置过期时间
scheduleTask(myTask1, performance.now() + 1000); // 过期时间 = 当前时间 + 1s
scheduleTask(myTask2, performance.now()); // 过期时间 = 当前时间
scheduleTask(myTask3, performance.now() + 3000); // 过期时间 = 当前时间 + 3s

console.log("同步任务");
