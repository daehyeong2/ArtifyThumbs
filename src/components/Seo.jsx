import { Helmet } from "react-helmet";

const Seo = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | ArtifyThumbs</title>
      <meta
        name="description"
        content="ArtifyThumbs는 이미지를 신청하고 좋은 퀄리티의 이미지를 빠르게 받을 수 있는 서비스입니다."
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" sizes="16x16" href="/img/favicon.ico" />
    </Helmet>
  );
};

export default Seo;
