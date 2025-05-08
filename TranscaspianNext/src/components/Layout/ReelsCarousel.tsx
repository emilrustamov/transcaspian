import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/images/Logo.png";

const reels = [{ id: "1" }, { id: "2" }, { id: "3" }];

export default function ReelsCarousel() {
  const [watched, setWatched] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [unseenCount, setUnseenCount] = useState(0);
  useEffect(() => {
    const seen = Cookies.get("watchedReels");
    const parsed = seen ? JSON.parse(seen) : [];
    setWatched(parsed);
    const unseen = reels.length - parsed.length;
    Cookies.set("unseenReels", `${unseen}`, { expires: 365 });
    setUnseenCount(unseen);
  }, []);

  const markAsWatched = (id: string) => {
    if (!watched.includes(id)) {
      const updated = [...watched, id];
      setWatched(updated);
      Cookies.set("watchedReels", JSON.stringify(updated), { expires: 365 });
      const unseen = reels.length - updated.length;
      Cookies.set("unseenReels", `${unseen}`, { expires: 365 });
      setUnseenCount(unseen);
    }
  };

  const openReel = (index: number) => {
    const id = reels[index].id;
    markAsWatched(id);
    setActiveIndex(index);
  };

  const closeReel = () => setActiveIndex(null);

  const nextReel = () =>
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % reels.length : null
    );
  const prevReel = () =>
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + reels.length) % reels.length : null
    );

  const reel = activeIndex !== null ? reels[activeIndex] : null;

  return (
    <div className="flex justify-center gap-4 py-10">
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          onClick={() => openReel(index)}
          className={`relative w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 transition-all flex items-center justify-center bg-black
          ${
            watched.includes(reel.id)
              ? "border-gray-400"
              : "border-[rgb(152,29,38)] animate-pulse"
          }`}
        >
          <img
            src={Logo.src}
            alt="logo"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <svg
            className="relative w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7-11-7z" />
          </svg>
        </div>
      ))}

      <AnimatePresence>
        {reel && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[9/16] max-h-[90vh] bg-black rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
              <video
                key={reel.id}
                src={`/videos/${reel.id}.mp4`}
                autoPlay
            
                playsInline
                controls
                className="w-full h-full object-cover"
              />

              {/* Navigation arrows */}
              <button
                onClick={prevReel}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 text-white px-3 py-2 rounded-full hover:bg-white/50"
              >
                ←
              </button>
              <button
                onClick={nextReel}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 text-white px-3 py-2 rounded-full hover:bg-white/50"
              >
                →
              </button>

              {/* Close button */}
              <button
                onClick={closeReel}
                className="absolute top-3 right-3 bg-white text-black p-2 rounded-full hover:bg-red-200"
              >
                ✕
              </button>

              {/* Bottom overlay — можно использовать для лайков/текста */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <div className="text-sm">Reel #{reel.id}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
