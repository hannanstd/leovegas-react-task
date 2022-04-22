module.exports = {
  'src/**/*.ts?(x)': () => ['npm run typecheck --'],
  'src/**/*.{js,jsx,ts,tsx}': ['npm run lint --'],
  'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['npm run prettier --'],
}
