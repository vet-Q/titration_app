import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',  // ✅ Vite가 frontend 폴더를 기준으로 찾게 설정
  build: {
    outDir: 'dist',  // ✅ 빌드된 파일이 backend와 함께 관리될 폴더로 이동
    emptyOutDir: true
  },
  plugins: [react()]
});
