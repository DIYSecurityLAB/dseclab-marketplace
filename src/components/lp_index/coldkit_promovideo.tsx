"use client";

import { useRef, useEffect } from "react";
import { useUserInteraction } from "@/hooks/use-user-interaction";

export default function ColkitPromovideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasUserInteracted = useUserInteraction();

  // Handle play/pause based on viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          // Only autoplay if more than 70% is visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            videoRef.current.play().catch((err) => {
              console.debug("Autoplay blocked or failed", err);
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: [0, 0.7] }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle unmuting after user interaction
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !hasUserInteracted;
    }
  }, [hasUserInteracted]);

  return (
    <div className="m-auto px-4 xl:px-0 max-w-site">
      <video
        ref={videoRef}
        src="https://cdn.shopify.com/videos/c/o/v/7a2038d6da8544bba64dffe9292c8b58.mp4"
        poster="https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Screenshot_2025-10-26_035045.png?v=1761461471"
        className="rounded-lg w-full max-w-7xl aspect-video overflow-hidden"
        draggable={false}
        controls
        loop
        muted
        playsInline
      />
    </div>
  );
}
