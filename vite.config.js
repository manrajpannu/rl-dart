import { defineConfig } from 'vite'
import path from 'path'

// Vite config tuned for GitHub Pages project site.
// - `base` should be the repository name when served from https://<user>.github.io/<repo>/
// - `build.outDir` set to 'docs' so the generated site can be served from the `docs/` folder on the default branch
export default defineConfig({
  base: '/rl-dart/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})
