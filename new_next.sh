#!/bin/sh
# remove unnecessary files and folders
rm -rf styles pages
rm -f ./public/favicon.ico ./public/vercel.svg ./pages/index.js
mkdir -p src/pages && mkdir -p src/styles
mkdir -p src/assets/images && mkdir -p src/components

# remove unnecessary code and create new files
echo "
export default function Home() {
  return (
      <h1>Hello world (from Next)</h1>
  )
} " > ./src/pages/index.tsx

echo "import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp " > ./src/pages/_app.tsx

echo "import Document, { Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}" > ./src/pages/_document.tsx

echo "* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: tomato;
}" > ./src/styles/global.scss

# install essential packages
yarn add typescript @types/react @types/node -D
yarn add sass
yarn dev

# read -p "Press enter to continue..."