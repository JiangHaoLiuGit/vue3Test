//这个文件会帮我们打包 packages文件下的模块,最终打包成js


//node dev.js 要打包的名字 -f 打包的格式

import minimist from 'minimist'
import {resolve,dirname} from 'path'
import { fileURLToPath } from 'url'
import {createRequire} from 'module'
import esbuild from 'esbuild'

// node 中的命令行参数通过process 来获取 process.argv
const args = minimist(process.argv.slice(2));
// console.log(args) //运行npm run dev 可以在node环境中打印参数
const __filename = fileURLToPath(import.meta.url); //获取文件的绝对路径 file: => / usr
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const target = args._[0] || "reactivity"; //打包哪个项目
const format = args.f || 'iife' ; //打包后的模块化规范

console.log(target , format)


console.log(__filename,__dirname,require)
//node中esm模块中__dirname不存在 require方法也不存在
// 入口文件,根据命令行提供的路径来进行解析
const entry = resolve(__dirname,`../packages/${target}/src/index.ts`)
const pkg = require(`../packages/${target}/package.json`)

esbuild.context({
    entryPoints:[entry],
    outfile:resolve(__dirname,`../packages/${target}/dist/${target}.js`),//出口
    bundle:true, // reactivity => shared 会打包到一起
    platform:"browser",//打包环境
    sourcemap:true,//可以调试代码
    format, //cjs esm iife 
    globalName:pkg.buildOptions?.name,//如果是iife,需要加这个name名字接收
})
.then(ctx => {
    console.log("start dev")
    return ctx.watch();//监控入口文件持续打包
})