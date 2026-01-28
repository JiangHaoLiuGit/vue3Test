import {isObject} from '@vue/shared'
import {ReactiveFlags,mutableHandler} from './baseHandler'

export function reactive(target ){
    
    return createReactiveObject(target);
}

// 用于记录代理后的结果
let weakMapCache = new WeakMap()



function createReactiveObject(target){
    // 统一做判断,必须是对象才代理
    if(!isObject(target)){
        return target
    }
    // 保证如果有直接去缓存 解决问题一
    if(weakMapCache.get(target)) {
        return weakMapCache.get(target)
    }
    
    // // // 保证对象不能被重复代理 , 解决问题二
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    let proxyObj = new Proxy(target,mutableHandler)
    // 缓存代理后的结果
    weakMapCache.set(target,proxyObj)
    return proxyObj
}