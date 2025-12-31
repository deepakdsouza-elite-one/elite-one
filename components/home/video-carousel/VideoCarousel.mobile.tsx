"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import SelectPackageDialog from "./SelectPackageDialog";
import { ServicesProps } from "@/lib/types/services";

export default function VideoCarouselMobile({
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
  const total = data.length;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isLong = selectedFormat === "long";

  const CARD_WIDTH = isLong ? 300 : 220;
  const CARD_HEIGHT = isLong ? 180 : 420;

  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;
  const items = [prev, index, next];
  const selectedItem = data[index];

  /* Reset index + cleanup when format changes */
  useEffect(() => {
    setIndex(0);
    videoRefs.current = [];
  }, [selectedFormat, setIndex]);

  /* Handle audio properly */
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
    });

    const activeVideo = videoRefs.current[index];
    if (activeVideo && !isMuted) {
      activeVideo.muted = false;
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }
  }, [index, isMuted]);

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-[#f6efd9] ${
        isLong ? "min-h-[70svh] py-12" : "min-h-svh"
      }`}
    >
      <span
        className="absolute -z-10 -top-[40%] -left-[35%] w-175 h-175 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(217,179,108,0.85) 0%, rgba(217,179,108,0.35) 40%, transparent 70%)",
        }}
      />

      <span
        className="absolute -z-10 -bottom-[45%] -right-[35%] w-200 h-200 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,247,220,1) 0%, rgba(245,225,175,0.75) 40%, transparent 75%)",
        }}
      />

      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex justify-center my-4 isolate">
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
              className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedFormat === "short" ? "text-white" : "text-gray-600"
              }`}
            >
              Short Form
            </button>

            <button
              onClick={() => setSelectedFormat("long")}
              className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedFormat === "long" ? "text-white" : "text-gray-600"
              }`}
            >
              Long Form
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFormat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              className={`flex items-center ${isLong ? "gap-1" : "gap-4"}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  setIndex((i) => (i + 1) % total);
                } else if (info.offset.x > 50) {
                  setIndex((i) => (i - 1 + total) % total);
                }
              }}
            >
              {items.map((i) => {
                const isActive = i === index;

                return (
                  <motion.div
                    key={i}
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative shrink-0"
                    style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                  >
                    <div
                      className={`relative w-full h-full rounded-3xl overflow-hidden shadow-xl ${
                        data[i].title === "Custom" ? "bg-white" : "bg-black"
                      }`}
                    >
                      {data[i].title === "Custom" ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="text-center px-6"
                          >
                            <h3 className="text-2xl font-semibold text-black mb-2">
                              Custom
                            </h3>
                            <p className="text-xs text-gray-500">
                              Tailored to your exact needs
                            </p>
                          </motion.div>
                        </div>
                      ) : (
                        <>
                          <video
                            ref={(el) => {
                              videoRefs.current[i] = el;
                            }}
                            src={data[i].video}
                            autoPlay
                            loop
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />

                          {isActive && (
                            <>
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-[#1a1205]/80 via-black/30 to-transparent z-10" />

                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={data[index].price}
                                  initial={{ opacity: 0, y: 12 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="absolute bottom-4 left-4 right-4 z-20"
                                >
                                  <p className="text-[10px] uppercase tracking-wide text-white/80">
                                    Starting from
                                  </p>
                                  <p className="font-freeZoneMedium text-lg font-semibold text-white">
                                    {data[index].price}
                                  </p>
                                </motion.div>
                              </AnimatePresence>

                              <button
                                onClick={() => setIsMuted((m) => !m)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur border border-white/10 z-30"
                              >
                                {isMuted ? (
                                  <VolumeX size={14} className="text-white" />
                                ) : (
                                  <Volume2 size={14} className="text-white" />
                                )}
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden className="h-10" />

        <div className="mt-6 flex items-center gap-6">
          <button
            onClick={() => setIndex(prev)}
            className="p-3 rounded-full bg-white/40 backdrop-blur border border-[#D9B36C] hover:scale-105 transition"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className="bg-[#D9B36C] text-white px-16 py-2 rounded-full text-base font-medium shadow-xl"
            onClick={() => setOpenDialog(true)}
          >
            Select
          </button>

          <button
            onClick={() => setIndex(next)}
            className="p-3 rounded-full bg-white/40 backdrop-blur border border-[#D9B36C] hover:scale-105 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <SelectPackageDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        title={selectedItem.title}
      />
    </div>
  );
}
