import axios from 'axios';

const apiClient = axios.create({
  // 👇 이 부분을 백엔드 서버 주소로 변경합니다.
  baseURL: 'http://127.0.0.1:8000', 
});
apiClient.interceptors.request.use(
  (config) => {
    // 1. 로컬 스토리지에서 토큰을 가져옵니다.
    const accessToken = localStorage.getItem('accessToken');
    
    // 2. 토큰이 존재하면, Authorization 헤더에 추가합니다.
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

export default apiClient;