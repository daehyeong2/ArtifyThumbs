import { Helmet } from "react-helmet";

const Seo = ({
  title,
  description = "ArtifyThumbs는 이미지를 신청하고 좋은 퀄리티의 이미지를 빠르게 받을 수 있는 서비스입니다.",
}) => {
  return (
    <Helmet>
      <title>{title} | ArtifyThumbs</title>
      <meta property="og:title" content={`${title} | ArtifyThumbs`}></meta>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://web-artifythumbs-frontend-754g42alusa19vw.sel5.cloudtype.app/img/smallLogo.jpeg"
      />
    </Helmet>
  );
};

export default Seo;
