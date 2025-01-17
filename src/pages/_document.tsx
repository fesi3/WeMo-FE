import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="keywords"
          content="WeMo, 직장인, 힐링, 모임, 매칭 서비스, 소셜 네트워크, 스트레스 해소, 커뮤니티"
        />
        <meta
          name="description"
          content="WeMo는 직장인을 위한 힐링 모임 매칭 서비스입니다. 새로운 사람들과의 만남을 통해 스트레스를 해소하고, 함께 성장할 수 있는 커뮤니티를 제공합니다."
        />
        <meta name="author" content="WeMo Team" />
        <meta
          property="og:title"
          content="WeMo - 직장인 힐링 모임 매칭 서비스"
        />
        <meta
          property="og:description"
          content="직장인의 삶에 힐링을 더하는 WeMo! 다양한 모임 매칭으로 스트레스를 해소하고 사람들과 교류하세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wemo.com" />
        <meta
          property="og:image"
          content="https://wemo.com/images/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="WeMo - 직장인 힐링 모임 매칭 서비스"
        />
        <meta
          name="twitter:description"
          content="직장인을 위한 힐링과 소통의 공간, WeMo! 다양한 모임 매칭으로 삶에 활력을 더하세요."
        />
        <meta
          name="twitter:image"
          content="https://wemo.com/images/twitter-image.png"
        />
        <link rel="icon" href="assets/icons/wemo.ico" />
      </Head>
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
}
