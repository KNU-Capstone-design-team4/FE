import axios from 'axios';

// API 서버의 기본 URL을 설정합니다.
const apiClient = axios.create({
  baseURL: 'https://your-api-server.com', // 👈 백엔드 서버 주소로 변경해주세요.
});

export default apiClient;