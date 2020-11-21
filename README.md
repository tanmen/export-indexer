# export-indexer

This library is a library that automatically generates an index file.

## Install
`yarn`
```
yarn add -D export-indexer
```
`npm`
```
npm install -D export-indexer
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
yarn export-indexer
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


