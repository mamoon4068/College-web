
import { useEffect, useRef } from "react";
import gsap from "gsap";

const announcements = {
  admission: {
    icon: "🎓",
    text: "Admission Open 2026–27",
  },
  education: {
    icon: "📚",
    text: "Quality Education",
  },
  classroom: {
    icon: "🏫",
    text: "Smart Digital Classrooms",
  },
  faculty: {
    icon: "👨‍🏫",
    text: "Experienced & Supportive Faculty",
  },
  computerLab: {
    icon: "💻",
    text: "Advanced Computer Labs",
  },
  scholarship: {
    icon: "🏆",
    text: "Merit-Based Scholarships",
  },
  placement: {
    icon: "💼",
    text: "Career & Placement Guidance",
  },
  future: {
    icon: "🌟",
    text: "Building Bright Futures",
  },
};

const TickerBar = () => {
  const trackRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;

    if (!track || !group) return;

    const animation = gsap.to(track, {
      x: () => -group.offsetWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    return () => animation.kill();
  }, []);

  const items = Object.values(announcements);

  return (
    <div className="flex h-12 w-full overflow-hidden bg-[#071B3A]">

      {/* Fixed Updates Section */}
      {/* <div className="relative z-20 flex h-full shrink-0 items-center gap-2 border-r border-yellow-300/30 bg-yellow-400 px-5 text-[#071B3A] shadow-lg">
        <span className="text-xl">📢</span>
        <span className="whitespace-nowrap text-sm font-extrabold tracking-wider">
          UPDATES
        </span>
      </div> */}

      {/* Moving Text Section */}
      <div className="relative z-0 flex h-full min-w-0 flex-1 items-center overflow-hidden bg-[#102D50]">

        <div
          ref={trackRef}
          className="flex w-max shrink-0 items-center whitespace-nowrap"
        >
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              ref={groupIndex === 0 ? groupRef : null}
              aria-hidden={groupIndex === 1}
              className="flex shrink-0 items-center"
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex shrink-0 items-center gap-2 px-6"
                >
                  <span className="text-sky-400">
                    {item.icon}
                  </span>

                  <span className="text-sm font-semibold tracking-wide text-white">
                    {item.text}
                  </span>

                  <span className="ml-3 text-yellow-400">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TickerBar;