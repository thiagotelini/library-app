import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/books': 'https://8ncuh96d5b.execute-api.us-east-1.amazonaws.com',
      '/customers': 'https://8ncuh96d5b.execute-api.us-east-1.amazonaws.com',
    }
  }
})
