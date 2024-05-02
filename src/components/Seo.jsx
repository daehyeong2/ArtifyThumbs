import { Helmet } from "react-helmet";

const Seo = ({
  title,
  description = "ArtifyThumbs는 이미지를 신청하고 좋은 퀄리티의 이미지를 빠르게 받을 수 있는 서비스입니다.",
}) => {
  return (
    <Helmet>
      <title>{title} | ArtifyThumbs</title>
      <meta property="og:title" content={`${title} | ArtifyThumbs`}></meta>
      <meta name="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/img/smallLogo.jpeg"></meta>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="그림, 간편한, 깔끔한, 빠른, 친절한, 유튜브 썸네일, 프로필 사진, 프로필 배너, 게임 일러스트, 매드무비 썸네일, 게임 썸네일"
      />
      <link rel="canonical" href="http://artifythumbs.netlify.app" />
      <meta
        property="og:image"
        content="https://web-artifythumbs-frontend-754g42alusa19vw.sel5.cloudtype.app/img/smallLogo.jpeg"
      />
    </Helmet>
  );
};

export default Seo;
