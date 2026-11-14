import {
  presetIcons,
  presetMini,
  transformerDirectives,
  definePreset,
} from "unocss";

export const basePreset = definePreset(() => {
  return {
    name: "imyan-base-preset",
    presets: [
      presetMini({
        dark: "media",
      }),
      presetIcons({
        extraProperties: {
          display: "inline-block",
          "vertical-align": "middle",
          width: "24px",
          height: "24px",
        },
      }),
    ],
    transformers: [transformerDirectives()],
    theme: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        sans: ["Rubik", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      breakpoints: {
        sm: "600px",
        md: "768px",
        lg: "1000px",
        xl: "1280px",
      },
    },
  };
});
