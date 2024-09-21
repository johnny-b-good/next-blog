import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  theme: {
    extend: {
      backgroundImage: {
        "pattern-endless-clouds": "url('/endless-clouds.svg')",
        "pattern-morphing-diamonds": "url('/morphing-diamonds.svg')",
        "pattern-parkay-floor": "url('/parkay-floor.svg')",
        "pattern-wiggle": "url('/wiggle.svg')",
      },
    },
  },
};
export default config;
