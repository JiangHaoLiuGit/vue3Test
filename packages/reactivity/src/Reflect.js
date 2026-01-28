
const person = {
    name:"hao",
    get aliasName(){
        return this.name + "---handsome";
    },
};

let proxyPerson = new Proxy(person,{  
    get(target,key,receiver){
        return Reflect.get(target,key,receiver) //等价于下面的,但是下面的会触发get方法无限死循环
        // return receiver[key]
    }
})

// console.log(person.aliasName)

console.log(proxyPerson.aliasName)

// Reflect 和 proxy推荐一起用
// Reflect.get(target,key,receiver) 把target的this指向反射到receiver上面
// target[key] 用过之后 => receiver[key] && 不会触发receiver代理对象的get方法
// 所以某些特定场景下反射Reflect和Proxy需要一起用