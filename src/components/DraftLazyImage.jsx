import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { DraftImage } from "./detailApply";

function DraftLazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01 } // 이 값은 이미지가 뷰포트의 1%에 들어왔을 때 로드되도록 설정합니다.
    );

    const current = imgRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [src]); // src가 바뀔 때마다 observer를 재설정합니다.

  return <DraftImage ref={imgRef} src={loaded ? src : undefined} alt={alt} />;
}

export default DraftLazyImage;
