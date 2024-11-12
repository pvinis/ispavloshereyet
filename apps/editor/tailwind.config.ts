import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"
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
  plugins: [
    require("nativewind/dist/tailwind/safe-area").safeArea,
    plugin(({ addUtilities }) =>
      addUtilities({
        // usually paired with `absolute`
        ".full": {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      }),
    ),
  ],
}
export default config
