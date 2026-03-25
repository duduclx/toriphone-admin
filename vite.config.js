import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {global: 'window'},
  build: {
    lib: {
      entry: 'src/index.jsx', // Point d'entrée principal
      name: 'toriphone-admin',
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', "@chakra-ui/react", 'toriphone-auth'], // Exclut React et ReactDOM
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          "@chakra-ui/react": "ChakraUI",
          'toriphone-auth': 'toriphone-auth'
        },
      },
    },
  },
});