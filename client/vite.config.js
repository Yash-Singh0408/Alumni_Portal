export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // Default is 'dist', but make sure this matches your Vercel setup
  }
})
