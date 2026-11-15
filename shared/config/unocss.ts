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
        // 跟随站点主题切换（html[data-theme]）而不是系统媒体查询，
        // 否则手动切换主题后 dark: 工具类不会跟着变
        dark: {
          light: '[data-theme="light"]',
          dark: '[data-theme="dark"]',
        },
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
