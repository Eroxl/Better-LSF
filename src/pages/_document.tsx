import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

const Document = () => (
  <Html>
    <Head>
      <meta name="description" content="An improved Live Stream Fails client" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
