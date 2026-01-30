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
  };
});
