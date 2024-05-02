import { Helmet } from "react-helmet";

const Seo = ({
  title,
  description = "ArtifyThumbs는 이미지를 신청하고 좋은 퀄리티의 이미지를 빠르게 받을 수 있는 서비스입니다.",
}) => {
  return (
    <Helmet>
      <title>{title} | ArtifyThumbs</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | ArtifyThumbs`}></meta>
      <meta property="og:site_name" content="ArtifyThumbs" />
      <meta name="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="description" content={description} />
      <meta property="og:locale" content="kr_ko" />
      <meta property="og:url" content="https://artifythumbs.netlify.app/" />
      <meta
        name="keywords"
        content="그림, 간편한, 깔끔한, 빠른, 친절한, 유튜브 썸네일, 프로필 사진, 프로필 배너, 게임 일러스트, 매드무비 썸네일, 게임 썸네일"
      />
      <link rel="canonical" href="http://artifythumbs.netlify.app" />
      <meta
        property="og:image"
        content="http://artifythumbs.netlify.app/img/smallLogo.jpeg"
      />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="200" />
    </Helmet>
  );
};

export default Seo;
