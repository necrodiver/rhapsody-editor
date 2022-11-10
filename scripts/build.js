/* eslint-disable no-undef */
const { createRequire } = require('module');
const path = require('path');

// vite 打包需要的配置
const { defineConfig, build } = require('vite');

// vite 插件
const vue = require('@vitejs/plugin-vue');

// 入口目录
const entryDir = path.resolve(__dirname, '../packages/index.js');
// 添加出口文件夹 lib（不需要手动创建，会自动生成）
const outDir = path.resolve(__dirname, '../lib');

// vite 配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue()]
});

// rollup 配置（vite 基于 rollup 打包）
const rollupOptions = {
    // 这两个库不需要打包
    external: ['vue'],
    output: {
        globals: {
            vue: 'Vue'
        }
    }
};

/**
 * 全量打包构建的方法
 */
const buildAll = async () => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                // 入口
                entry: entryDir,
                // 组件库名字
                name: 'r-editor',
                fileName: 'r-editor',
                formats: ['es']
                // fileName: format => `index.${format}.js`,
                // formats: ['es', 'umd', 'cjs']
            },
            outDir
        }
    });
};

/**
 * 打包成库
 */
const buildLib = async () => {
    await buildAll();
};

buildLib();
