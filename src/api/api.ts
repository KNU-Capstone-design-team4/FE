import axios from 'axios';

const apiClient = axios.create({
  // 👇 이 부분을 백엔드 서버 주소로 변경합니다.
  baseURL: 'http://127.0.0.1:8000', 
});

export default apiClient;