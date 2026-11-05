# Studio — Interactive 3D Configurators

React sections with a separate strict TypeScript scene hook, studio lighting helpers, and typed product configuration. Some shader/material integration types still use any. AR is a visual backdrop demonstration, not a native AR integration.

## Run

Use Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Production media loads from the versioned public R2 manifest in src/config/assets.json. No cloud credentials are required or included.

## Browser preview

```sh
npm run build:artifact
npm run preview
```

The complete dist/ folder contains same-origin media verified against the release checksums. Mount the entire folder in a preview capable of serving companion files and WebGL. A shell localhost address is not a preview accessible from another device. Platform CSP or missing Artifact capabilities cannot be fixed by a prompt.

## Build

```sh
npm run build
npm run assets:verify
```

GitHub is used only for the media fallback. Dependencies and existing license notices are retained. This package contains no Git history, credentials, migration reports, or bundled product media. Worker/decoder runtime code may remain local.
