import axios from 'axios';

// 👇 환경 변수가 있으면 그걸 쓰고, 없으면(내 컴퓨터) 로컬 주소를 씁니다.
// (CRA를 쓰신다면 import.meta.env.VITE_API_URL 대신 process.env.REACT_APP_API_URL 사용)
const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: baseURL, 
  // 주의: 배포 주소는 반드시 'https'여야 합니다. 
  // Vercel 환경변수 설정할 때 https://be-0zqo.onrender.com 라고 넣으세요.
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