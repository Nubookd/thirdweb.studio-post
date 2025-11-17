import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Animation {
  constructor(pathRefs, pathContainer) {
    this.pathRefs = pathRefs;
    this.pathContainer = pathContainer;
    this.ctx = null;
    this.startPath = [
      "M0 200H100",
      "M300 200H400V250",
      "M500 400H400V350",
      "M700 400H800V350",
      "M900 200H800V250",
      "M1100 200H1200L1225 150",
      "M1325 50L1300 0L1275 50",
      "M1400 150V200L1375 150",
      "M1500 0H1400V50",
    ];
    this.endPath = [
      "M0 200H200",
      "M200 200H400V300",
      "M600 400H400V300",
      "M600 400H800V300",
      "M1000 200H800V300",
      "M1000 200H1200L1250 100",
      "M1350 100L1300 0L1250 100",
      "M1400 100V200L1350 100",
      "M1500 0H1400V100",
    ];
  }

  animate = () => {
    this.ctx = gsap.context(() => {
      Object.values(this.pathRefs).forEach((pathRef, index) => {
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1,
          paused: true,
        });
        tl.to(pathRef.current, {
          attr: {
            d: this.endPath[index],
          },
          duration: 2,
          ease: "power2.inOut",
          delay: index * 0.2,
        })
          .to(pathRef.current, {
            attr: {
              d: this.startPath[index],
            },
            duration: 2,
            ease: "power2.inOut",
            delay: index * 1.2,
          })
          .delay(index * 0.2);
        ScrollTrigger.create({
          trigger: this.pathContainer.current,
          start: "top 80%",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeave: () => tl.pause(),
          onLeaveBack: () => tl.pause(),
          once: false,
        });
      });
    });
    return () => {
      if (this.ctx) {
        this.ctx.revert();
      }
    };
  };
}
