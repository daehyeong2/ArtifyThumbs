import { Helmet } from "react-helmet";

const Seo = ({
  title,
  description = "ArtifyThumbs는 이미지를 신청하고 좋은 퀄리티의 이미지를 빠르게 받을 수 있는 서비스입니다.",
}) => {
  return (
    <Helmet>
      <title>{title} | ArtifyThumbs</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" sizes="16x16" href="/img/favicon.ico" />
      <meta property="og:title" content={`${title} | ArtifyThumbs`}></meta>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="ArtifyThumbs에서 간편하고 저렴하게 그림을 신청해서 빠르게 받아보세요."
      />
      <meta
        property="og:image"
        content="https://web-artifythumbs-frontend-754g42alusa19vw.sel5.cloudtype.app/img/smallLogo.jpeg"
      />
      <script src="https://kit.fontawesome.com/18c154b14c.js"></script>
    </Helmet>
  );
};

export default Seo;
