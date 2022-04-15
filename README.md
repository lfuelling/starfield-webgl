# Starfield WebGL

This is a WebGL version of [starfield](https://github.com/rocketwagon/jquery-starfield), written in TypeScript.

If you are interested in the "regular version" (that doesn't need jQuery), look at the initial commit: [b25c3dbcc](https://git.lrk.sh/lerk/starfield-webgl/commit/b25c3dbcc4e789864dc0fdb5ac5dd30c12964c78)

## Usage
1. `npm i -s starfield-webgl`
2. ```javascript
   import {runStarfield} from "./src/starfield";

   (runStarfield)();
   ```

## Development

Below are notes regarding development.

## Requirements
- Node >= v12
- Parcel (`npm i -g parcel`)

## Usage
1. Clone the repo
2. Run `npm i`
3. Build:
    - Dev: `npm run dev`
    - Prod: `npm run build`
