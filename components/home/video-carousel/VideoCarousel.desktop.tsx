"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useScreenSize } from "@/hooks/useScreenSize";
import SelectPackageDialog from "./SelectPackageDialog";
import { ServicesProps } from "@/lib/types/services";

export default function VideoCarouselDesktop({
  index,
  setIndex,
  isMuted,
  setIsMuted,
  openDialog,
  setOpenDialog,
  selectedFormat,
  setSelectedFormat,
  data,
}: ServicesProps) {
  const { isHD } = useScreenSize();

  const total = data.length;
  const isLong = selectedFormat === "long";

  const CARD_WIDTH = isLong ? (isHD ? 450 : 400) : isHD ? 260 : 220;
  const CARD_HEIGHT = isLong ? (isHD ? 300 : 250) : isHD ? 400 : 300;
  const RADIUS = isLong ? (isHD ? 500 : 450) : isHD ? 360 : 320;

  const angle = 360 / total;

  /* virtual → real index */
  const activeIndex = ((index % total) + total) % total;

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  /* ✅ reset on format switch */
  useEffect(() => {
    setIndex(0);
    videoRefs.current = [];
  }, [selectedFormat, setIndex]);

  /* ✅ audio control */
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
    });

    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo && !isMuted) {
      activeVideo.muted = false;
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }
  }, [activeIndex, isMuted]);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#f6efd9]">
      <span
        className="absolute left-[-30%] top-50 w-[70%] h-[40%] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(217,179,108,0.85) 0%, rgba(217,179,108,0.35) 45%, transparent 75%)",
        }}
      />

      <span
        className="absolute right-[-30%] bottom-40 w-full h-[40%] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(217,179,108,0.85) 0%, rgba(217,179,108,0.35) 45%, transparent 75%)",
        }}
      />

      <div className="flex justify-center">
        <div className="absolute top-5 left-1/2 -translate-x-1/2">
          <div className="relative flex items-center bg-white/90 backdrop-blur rounded-full p-1 shadow-md border border-black/5">
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-1 bottom-1 w-1/2 rounded-full bg-[#D9B36C]"
              style={{
                left: selectedFormat === "short" ? "4px" : "48%",
              }}
            />

            <button
              onClick={() => setSelectedFormat("short")}
              className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full ${
                selectedFormat === "short" ? "text-white" : "text-gray-600"
              }`}
            >
              Short Form
            </button>

            <button
              onClick={() => setSelectedFormat("long")}
              className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full ${
                selectedFormat === "long" ? "text-white" : "text-gray-600"
              }`}
            >
              Long Form
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFormat}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              perspective: "1200px",
            }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) setIndex((i) => i + 1);
                else if (info.offset.x > 60) setIndex((i) => i - 1);
              }}
              animate={{ rotateY: -index * angle }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ transformStyle: "preserve-3d" }}
            >
              {data.map((item: any, i: number) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex items-center justify-center ${
                    isLong ? "-top-[5%]" : "-top-[15%]"
                  }`}
                  style={{
                    transform: `rotateY(${
                      i * angle
                    }deg) translateZ(${RADIUS}px)`,
                  }}
                >
                  <motion.div
                    className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                      item.title === "Custom" ? "bg-white" : "bg-black"
                    }`}
                    style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                    animate={{ opacity: i === activeIndex ? 1 : 0.6 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {item.title === "Custom" ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="text-center px-6"
                        >
                          <h3 className="text-3xl font-semibold text-black mb-3">
                            Custom
                          </h3>
                          <p className="text-sm text-gray-500">
                            Tailored exactly to your needs
                          </p>
                        </motion.div>
                      </div>
                    ) : (
                      <>
                        <AnimatePresence mode="wait">
                          {i === activeIndex && (
                            <>
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-[#1a1205]/80 via-black/30 to-transparent z-10" />

                              <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{
                                  duration: 0.35,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute bottom-4 left-4 right-4 z-20"
                              >
                                <p className="text-[10px] uppercase tracking-wide text-white/80">
                                  Starting from
                                </p>
                                <p className="font-freeZoneMedium md:text-lg font-semibold text-white">
                                  {item.price}
                                </p>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        <video
                          ref={(el) => {
                            videoRefs.current[i] = el;
                          }}
                          src={item.video}
                          autoPlay
                          loop
                          playsInline
                          muted
                          className={`w-full h-full object-cover transition-[filter] duration-300 ${
                            i === activeIndex ? "blur-0" : "blur-xs"
                          }`}
                        />

                        {i === activeIndex && (
                          <button
                            onClick={() => setIsMuted((m) => !m)}
                            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur"
                          >
                            {isMuted ? (
                              <VolumeX size={18} className="text-white" />
                            ) : (
                              <Volume2 size={18} className="text-white" />
                            )}
                          </button>
                        )}
                      </>
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 2xl:bottom-8 flex items-center gap-4 2xl:gap-6">
        <button
          onClick={() => setIndex((i) => i - 1)}
          className="p-2 2xl:p-3 rounded-full bg-white/60 backdrop-blur border border-[#D9B36C]"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          className="bg-[#D9B36C] text-white px-20 py-2 2xl:py-4 rounded-full text-[16px] 2xl:text-[18px] font-medium shadow-xl"
          onClick={() => setOpenDialog(true)}
        >
          Select
        </button>

        <button
          onClick={() => setIndex((i) => i + 1)}
          className="p-2 2xl:p-3 rounded-full bg-white/60 backdrop-blur border border-[#D9B36C]"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <SelectPackageDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        title={data[activeIndex].title}
      />
    </div>
  );
}
