import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="font-sans">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&subset=korean&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
}
