import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {string} from "rollup-plugin-string";
import dts from 'rollup-plugin-dts'

import packageJson from './package.json' assert {type: 'json'};

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

const name = 'Starfield';

const bundle = config => ({
    ...config,
    input: packageJson.source,
});

export default [
    bundle({
        plugins: [
            string({
                include: "**/*.glsl"
            }),
            // Allows node_modules resolution
            resolve({extensions}),

            // Allow bundling cjs modules. Rollup doesn't understand cjs
            commonjs(),

            // Compile TypeScript/JavaScript files
            babel({
                extensions,
                babelHelpers: 'bundled',
                include: ['src/**/*'],
            }),
        ],

        output: [{
            file: packageJson.main,
            format: 'cjs',
        }, {
            file: packageJson.module,
            format: 'es',
        }, {
            file: packageJson.browser,
            format: 'iife',
            name,

            // https://rollupjs.org/guide/en/#outputglobals
            globals: {},
        }],
    }),
    bundle({
            plugins: [
                dts(),
            ],
            output: {
                file: packageJson.types,
                format: 'es',
            },
        }
    )
];