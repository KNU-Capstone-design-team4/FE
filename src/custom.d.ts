// SVG 파일을 import 할 때, TypeScript에게 이 파일이 경로 문자열(string)을 내보낸다고 알려줍니다.
declare module '*.svg' {
  const content: string;
  export default content;
}

// 다른 이미지 파일 형식도 필요하다면 여기에 추가할 수 있습니다.
// declare module '*.png';
// declare module '*.jpg';
