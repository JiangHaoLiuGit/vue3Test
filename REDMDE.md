

## reactivity 问题一
```java
let obj = {
    name:"浩",
    age:20
}
const state1 = reactive(obj)
const state2 = reactive(obj)
console.log(state1 === state2)
```

假如weakmap缓存代理后的对象,防止重复代理

## reactivity 问题二
```java
const state1 = reactive(obj)
const state2 = reactive(state1)
console.log(state1 === state2)
```

增加get标识符,防止重复赋值get,set方法

## reactivity 问题三为什么要用Reflect
案例见Reflect.js
<!-- Reflect反射是反射什么,面试有问 -->
<!-- Reflect为什么一般要和Proxy一起使用 -->