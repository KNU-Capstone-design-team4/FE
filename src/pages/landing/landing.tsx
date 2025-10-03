import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingImage from "./LandingPage.svg";

const LandingPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const objectRef = useRef<HTMLObjectElement>(null);
  const [visited, setVisited] = useState(false); // 세션 기준 방문 체크

  const handleStartClick = () => {
    setVisited(true);      // 버튼 클릭 시 랜딩페이지 종료
    navigate("/main");     // 메인페이지 이동
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/main");   // 로그인 되어 있으면 바로 메인페이지
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const obj = objectRef.current;
    if (!obj) return;

    const handleLoad = () => {
      const svgDoc = obj.contentDocument;
      if (!svgDoc) return;

      const startButton = svgDoc.getElementById("Button Primary");
      if (!startButton) return;

      startButton.addEventListener("click", handleStartClick);
      startButton.style.cursor = "pointer";

      // cleanup
      return () => startButton.removeEventListener("click", handleStartClick);
    };

    obj.addEventListener("load", handleLoad);
    return () => obj.removeEventListener("load", handleLoad);
  }, []);

  // 방문 완료했으면 렌더링하지 않음
  if (visited) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        overflow: "hidden",
      }}
    >
      <object
        ref={objectRef}
        type="image/svg+xml"
        data={LandingImage}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default LandingPage;
