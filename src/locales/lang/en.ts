import type { LocaleMessages } from "vue-i18n";

const locale = { //: LocaleMessages<I18nType.Schema>
  language: "EN",
  menu: {
    movie: "Movie",
  },
  message: {

    system: {
      title: "APP",
    },
    routes: {
      dashboard: {
        dashboard: "Dashboard",
        analysis: "Analysis",
        workbench: "Workbench",
      },
      about: {
        about: "About",
      },
    },
  },
};

export default locale;
