# export-indexer

This library is a library that automatically generates an index file.

## How to run
```
npx export-indexer
```

### Install
`npm`
```shell
npm install -D export-indexer
```

`yarn`
```shell
yarn add -D export-indexer
```

## Usage
Create a `.index` file where you want the index file to be generated.

### Example
If the directory structure is as follows
```
└ components
  ├ .index
  └　test.tsx
```

Do the following in terminal:
```
npx export-indexer
```

If you want to detect changes:
```shell
npx export-indexer --watch
```

Then, the following contents will be output.
`index.ts`
```
export * from './text';
```

`file`
```
└ components
  ├ .index
  ├ index.ts
  └　test.tsx
```


