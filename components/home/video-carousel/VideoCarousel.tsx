"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import VideoCarouselDesktop from "./VideoCarousel.desktop";
import VideoCarouselMobile from "./VideoCarousel.mobile";
import { useState } from "react";
import {
  VIDEO_CAROUSEL_LONG_DATA,
  VIDEO_CAROUSEL_SHORT_DATA,
} from "@/lib/contents/video-carousel";

export default function VideoCarousel() {
  const { isMobile } = useScreenSize();
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"short" | "long">(
    "short"
  );

  const data =
    selectedFormat === "short"
      ? VIDEO_CAROUSEL_SHORT_DATA
      : VIDEO_CAROUSEL_LONG_DATA;

  return isMobile ? (
    <VideoCarouselMobile
      index={index}
      setIndex={setIndex}
      isMuted={isMuted}
      setIsMuted={setIsMuted}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      selectedFormat={selectedFormat}
      setSelectedFormat={setSelectedFormat}
      data={data}
    />
  ) : (
    <VideoCarouselDesktop
      index={index}
      setIndex={setIndex}
      isMuted={isMuted}
      setIsMuted={setIsMuted}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      selectedFormat={selectedFormat}
      setSelectedFormat={setSelectedFormat}
      data={data}
    />
  );
}
