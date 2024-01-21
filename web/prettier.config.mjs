/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  printWidth: 100,
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react', '^next', '<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
}

export default config
