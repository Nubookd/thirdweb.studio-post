import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Регистрируем плагины только на клиенте
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Настройки по умолчанию
gsap.config({
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger, TextPlugin };
