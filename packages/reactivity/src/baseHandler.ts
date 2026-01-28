export enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive"
}
export const mutableHandler:ProxyHandler<any> = {
    get(target,key,receiver){
        if(key === ReactiveFlags.IS_REACTIVE){
            return true
        }
        // 当取值的时候,应该让响应式属性 和 effect 映射起来

        // 依赖收集
        return Reflect.get(target,key,receiver)
    },
    set(target,key,value,receiver){

        // 处理依赖更新
        // 找到属性,让对应的effect重新执行
        return Reflect.set(target,key,value,receiver)
    }
}