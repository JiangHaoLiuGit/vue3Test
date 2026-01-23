.npmrc 中写一个命令
shamefully-hoist=true
目的是会把安装的包vue时的所有插件全部拍平在node_modules中
比如引入postcss
import postcss from '@vue/postcss'
拍平后
import postcss from 'postcss'

## reactivity 项目引入shared方法如果引入的是node_modules下的方法说明没有配置ts映射
import { isObject } from '@vue/shared' == > node_modules/@vue/shared
在tsconfig.json配置=> 
```java
"baseUrl":".",
    "paths":{
        "@vue/*":["packages/*/src"]
    }
```

## 给reactivity项目安装shared包命令
pnpm install @vue/shared --workspace --filter @vue/reactivity

## 运行npm run dev 命令在node环境进行对reactivity代码工程化打包