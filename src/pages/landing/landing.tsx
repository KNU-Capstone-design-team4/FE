import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingImage from "./LandingPage.svg";

const LandingPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const objectRef = useRef<HTMLObjectElement>(null);
  const [visited, setVisited] = useState(
    sessionStorage.getItem("landingVisited") === "true"
  );

  const handleStartClick = () => {
    sessionStorage.setItem("landingVisited", "true"); // 방문 기록 저장
    setVisited(true);
    navigate("/main");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/main");
    }
    else{
      if (sessionStorage.getItem("landingVisited") === "true") {
        navigate("/main");
    }
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

      return () => startButton.removeEventListener("click", handleStartClick);
    };

    obj.addEventListener("load", handleLoad);
    return () => obj.removeEventListener("load", handleLoad);
  }, []);

  // 방문 기록 있으면 아예 랜딩 안 보여줌
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
