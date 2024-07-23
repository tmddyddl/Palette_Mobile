import { useEffect } from "react";

const useKakao = (appKey) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(appKey);
        console.log(window.Kakao.isInitialized());
      }
    };
    document.body.appendChild(script);
  }, [appKey]);
};

export default useKakao;
