# Starfield WebGL

This is a WebGL version of [jQuery Starfield][1], written in TypeScript (and without jQuery).

If you are interested in the "regular version" (which also doesn't need jQuery), look at the initial
commit: [b25c3dbcc][2]

## Usage

1. `npm i -s starfield-webgl`
2. ```html
   <script type="module">
    import {runStarfield} from "starfield-webgl";

    (() => {
        runStarfield();
    })();
   </script>
   ```

## Development

Below are notes regarding development.

## Requirements

- Node >= v12
- Parcel (`npm i -g parcel`)

## Usage

1. Clone the repo
2. Run `npm i`
3. Build: `npm run dev`

[1]: https://github.com/rocketwagon/jquery-starfield
[2]: https://github.com/lfuelling/starfield-webgl/tree/b25c3dbcc4e789864dc0fdb5ac5dd30c12964c78