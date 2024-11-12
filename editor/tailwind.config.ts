import type { Config } from "tailwindcss"
import { hairlineWidth } from "nativewind/theme"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "on-background": "var(--color-on-background)",
        "on-background-low": "var(--color-on-background-low)",
        opening: "var(--color-opening)",
        primary: "var(--color-primary)",
        t: "red",
      },
      fontFamily: {
        "mono-base": "Iosevka",
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [require("nativewind/dist/tailwind/safe-area").safeArea],
}
export default config
