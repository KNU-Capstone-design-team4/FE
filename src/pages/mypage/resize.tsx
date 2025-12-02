import React, { useState, useEffect } from "react";
import documentImage from "../../assets/document_image.png";

interface ResizedImageProps {
  width: number;  // 최종 표시할 폭
  height: number; // 최종 표시할 높이
  alt?: string;
}

const ResizedImage: React.FC<ResizedImageProps> = ({ width, height, alt }) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.src = documentImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 이미지 크기 줄이면서 그리기
        ctx.drawImage(img, 0, 0, width, height);
        // PNG로 다시 변환
        setSrc(canvas.toDataURL("image/png"));
      }
    };
  }, [width, height]);

  return src ? <img src={src} alt={alt || "Resized"} /> : null;
};

export default ResizedImage;
