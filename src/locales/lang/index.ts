import zhCN from "./zh-cn";
import en from "./en";

const locales = {
  "zh-CN": zhCN,
  en,
};
export const langList: { label: string; key: string }[] = [];
for (let key in locales) {
  let locale = locales[key];
  langList.push({
    label: locale.language,
    key: key,
  });
}
export type LocaleKey = keyof typeof locales;

export default locales;
