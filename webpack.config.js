import CopyPlugin from "copy-webpack-plugin";
import dotenv from "dotenv";
import path from "path";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import WebExtPlugin from 'web-ext-plugin';
import webpack from "webpack";
import packageJson from "./package.json" with { type: "json" };

export default (env, argv) => {
  const mode = argv.mode;

  const browser = env.browser;
  const plugin = env?.plugin;
  const envFile = dotenv.config({ path: `./.env.${mode}` });
  const { APP_SELECTOR } = envFile.parsed ; 
  const currentVersion = packageJson.version;

  const dest =`dist/${mode}/${browser}/${currentVersion}`;

  return {
    mode: mode,
    devtool: mode === "development" ? "source-map" : false,
    entry: {
      "content-script": "./src/content-scripts/index.tsx",
      background: "./src/background/index.ts",
      popup: "./src/popup.tsx",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(dest),
      clean: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.APP_SELECTOR': JSON.stringify(APP_SELECTOR),
        // TODO: use 'process.env.BROWSER' environment when different browser
        'process.env.BROWSER': JSON.stringify(browser),
      }),
      new CopyPlugin({
        patterns: [
          // copy all files inside src/extension to dist, except manifest.*.json file
          {
            from: path.resolve("src/extension"),
            to: path.resolve(dest),
            toType: "dir",
            globOptions:{
              ignore:[
                "**/manifest.*.json"
              ]
            }
          },

          // copy manifest.json file based on browser argument to dist, 
          // and add version number on manifest.json, based on .env file
          {
            from: path.resolve(`src/extension/manifest.${browser}.json`),
            to: path.resolve(dest, "manifest.json"),
            transform: (content) => {
              let contentManifest = JSON.parse(content.toString());
              contentManifest = 
              {
                version: currentVersion,
                ...contentManifest, 
              };
              return JSON.stringify(contentManifest);
            }
          },

          {
            from: path.resolve("public"),
            to: "assets",
          }
        ],
      }),
      // use web-ext-plugin to run extension firefox
      plugin && browser === "firefox" && new WebExtPlugin({
        sourceDir: path.resolve(dest),
        devtools: true,
        startUrl:"https://example.com",
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env',
                [
                  "@babel/preset-react",
                  { "runtime": "automatic" }
                ],
                "@babel/preset-typescript"
              ]
            }
          }
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          include: [
            path.resolve('src/styles'),
            path.resolve('node_modules'),
          ],
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts",".js"],
      plugins:[
        new TsconfigPathsPlugin()
      ]
    },
  }
}
