import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    server: {
        allowedHosts: ["95db-76-78-178-113.ngrok-free.app", "localhost", "f2ca-128-237-82-211.ngrok-free.app" ]
    }
})

