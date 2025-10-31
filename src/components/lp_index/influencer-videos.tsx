"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useUserInteraction } from "@/hooks/use-user-interaction";
import {
  influencerVideos,
  type InfluencerVideo,
} from "@/config/landing.config";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./influencer-videos.module.css";

interface VideoSlideProps {
  video: InfluencerVideo;
  isActive: boolean;
  isInView: boolean;
  hasUserInteracted: boolean;
  onVideoRef: (id: string, element: HTMLVideoElement | null) => void;
}

function VideoSlide({
  video,
  isActive,
  isInView,
  hasUserInteracted,
  onVideoRef,
}: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle play/pause based on active state and viewport
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current && isActive && isInView) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.debug("Autoplay blocked or failed", err);
        }
      } else if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    playVideo();
  }, [isActive, isInView]);

  // Handle unmuting after user interaction
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !hasUserInteracted;
    }
  }, [hasUserInteracted]);

  const handleVideoRef = (element: HTMLVideoElement | null) => {
    videoRef.current = element;
    onVideoRef(video.id, element);
  };

  return (
    <div
      className={`flex justify-center items-center transition-all duration-300 ${
        isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"
      }`}
    >
      <div className="relative bg-gray-800 rounded-lg w-full aspect-9/16 overflow-hidden">
        {video.type === "youtube" ? (
          <iframe
            src={video.videoUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={handleVideoRef}
            src={video.videoUrl}
            className="absolute inset-0 w-full h-full object-fill"
            poster={video.thumbnail}
            loop
            muted
            playsInline
            controls
          />
        )}
      </div>
    </div>
  );
}

export default function InfluencerVideos() {
  const swiperRef = useRef<SwiperType>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [isInView, setIsInView] = useState(false);
  const hasUserInteracted = useUserInteraction();

  // Intersection Observer to detect if component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only consider it "in view" if more than 70% is visible
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.7);
      },
      { threshold: [0, 0.7] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoRef = (id: string, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current.set(id, element);
    } else {
      videoRefs.current.delete(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto px-4 w-full max-w-site overflow-hidden"
    >
      <div className="relative mx-auto">
        <Swiper
          modules={[Navigation]}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={36}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={() => {
            // Pause all videos when slide changes
            videoRefs.current.forEach((video) => video.pause());
          }}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="influencer-videos-swiper"
        >
          {influencerVideos.map((video) => (
            <SwiperSlide key={video.id}>
              {({ isActive }) => (
                <VideoSlide
                  video={video}
                  isActive={isActive}
                  isInView={isInView}
                  hasUserInteracted={hasUserInteracted}
                  onVideoRef={handleVideoRef}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="top-1/2 left-2 lg:-left-16 z-10 absolute flex justify-center items-center bg-black/70 hover:bg-gray-900 rounded-full w-10 lg:w-12 h-10 lg:h-12 text-white transition-all -translate-y-1/2 duration-200"
          aria-label="Previous video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 lg:w-6 h-5 lg:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="top-1/2 right-2 lg:-right-16 z-10 absolute flex justify-center items-center bg-black/70 hover:bg-gray-900 rounded-full w-10 lg:w-12 h-10 lg:h-12 text-white transition-all -translate-y-1/2 duration-200"
          aria-label="Next video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 lg:w-6 h-5 lg:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
