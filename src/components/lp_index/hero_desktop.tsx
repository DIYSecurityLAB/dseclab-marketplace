"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function HeroDesktop() {
  // Use motion values for mouse position (no re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform motion values for parallax effects
  const bgX = useTransform(mouseX, (x) => x * 20);
  const bgY = useTransform(mouseY, (y) => y * 20);
  const watermarkX = useTransform(mouseX, (x) => x * -15);
  const watermarkY = useTransform(mouseY, (y) => y * -15);

  const [leftImagePos, setLeftImagePos] = useState({ x: 0, y: 0 });
  const [rightImagePos, setRightImagePos] = useState({ x: 0, y: 0 });

  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Normalize to -1 to 1 range
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);

    // Update motion values directly (no state update)
    mouseX.set(x);
    mouseY.set(y);
  };

  const calculateImagePositions = () => {
    if (
      !leftImageRef.current ||
      !rightImageRef.current ||
      !svgContainerRef.current
    )
      return;

    const svgRect = svgContainerRef.current.getBoundingClientRect();
    const leftRect = leftImageRef.current.getBoundingClientRect();
    const rightRect = rightImageRef.current.getBoundingClientRect();

    // Check if SVG has valid dimensions
    if (svgRect.width === 0 || svgRect.height === 0) {
      return;
    }

    // Calculate connection points (center of each image)
    const leftConnection = {
      x: leftRect.left + leftRect.width / 2,
      y: leftRect.top + leftRect.height / 2,
    };

    const rightConnection = {
      x: rightRect.left + rightRect.width / 2,
      y: rightRect.top + rightRect.height / 2,
    };

    // Account for preserveAspectRatio="xMidYMid meet"
    const viewBoxWidth = 1688;
    const viewBoxHeight = 376;
    const viewBoxRatio = viewBoxWidth / viewBoxHeight;
    const svgRatio = svgRect.width / svgRect.height;

    let scale: number;
    let offsetX = 0;
    let offsetY = 0;

    if (svgRatio > viewBoxRatio) {
      // SVG is wider - letterbox on sides
      scale = svgRect.height / viewBoxHeight;
      const renderedWidth = viewBoxWidth * scale;
      offsetX = (svgRect.width - renderedWidth) / 2;
    } else {
      // SVG is taller - letterbox on top/bottom
      scale = svgRect.width / viewBoxWidth;
      const renderedHeight = viewBoxHeight * scale;
      offsetY = (svgRect.height - renderedHeight) / 2;
    }

    // Convert to SVG coordinates accounting for letterboxing
    const leftSvgX = (leftConnection.x - svgRect.left - offsetX) / scale;
    const leftSvgY = (leftConnection.y - svgRect.top - offsetY) / scale;

    const rightSvgX = (rightConnection.x - svgRect.left - offsetX) / scale;
    const rightSvgY = (rightConnection.y - svgRect.top - offsetY) / scale;

    // Only update if values are valid numbers
    if (
      !isNaN(leftSvgX) &&
      !isNaN(leftSvgY) &&
      !isNaN(rightSvgX) &&
      !isNaN(rightSvgY)
    ) {
      setLeftImagePos({ x: leftSvgX, y: leftSvgY });
      setRightImagePos({ x: rightSvgX, y: rightSvgY });
    }
  };

  useEffect(() => {
    // Calculate after a small delay to ensure elements are rendered
    const timer = setTimeout(calculateImagePositions, 200);

    // Recalculate on window resize
    window.addEventListener("resize", calculateImagePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateImagePositions);
    };
  }, []);

  // Generate circuit path similar to original SVG pattern with rounded corners
  const getCircuitPath = (targetX: number, targetY: number) => {
    const startX = 824.65;
    const startY = 182.91;
    const radius = 20; // Corner radius
    const minVerticalDistance = radius * 2.5; // Minimum vertical distance to ensure proper corners

    // Calculate where the vertical bend should occur
    // Place it at 1/3 of the distance from start to target
    const bendX = startX + (targetX - startX) / 3;

    // Determine directions
    const verticalDiff = targetY - startY;
    const goingDown = verticalDiff > 0;
    const goingRight = targetX > startX;

    // Ensure minimum vertical distance for proper rounding
    let effectiveTargetY = targetY;
    if (Math.abs(verticalDiff) < minVerticalDistance) {
      effectiveTargetY = goingDown
        ? startY + minVerticalDistance
        : startY - minVerticalDistance;
    }

    // Path with rounded corners using quadratic bezier curves (Q)
    const horizontalEnd1 = goingRight ? bendX - radius : bendX + radius;
    const verticalStart = goingDown ? startY + radius : startY - radius;
    const verticalEnd = goingDown
      ? effectiveTargetY - radius
      : effectiveTargetY + radius;
    const horizontalStart2 = goingRight ? bendX + radius : bendX - radius;

    // If we adjusted the Y, add final vertical segment to actual target
    const finalSegment =
      effectiveTargetY !== targetY
        ? `L${targetX},${effectiveTargetY} L${targetX},${targetY}`
        : `L${targetX},${targetY}`;

    return `
      M${startX},${startY}
      L${horizontalEnd1},${startY}
      Q${bendX},${startY} ${bendX},${verticalStart}
      L${bendX},${verticalEnd}
      Q${bendX},${effectiveTargetY} ${horizontalStart2},${effectiveTargetY}
      ${finalSegment}
    `
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <div
      className="hidden relative lg:flex flex-col justify-center items-center w-full h-[125vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/i/hero_bg.png')",
          x: bgX,
          y: bgY,
          scale: 1.05,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
      <div>
        {/* MARCA DAGUA */}
        <motion.div
          className="top-1/8 left-1/2 z-0 absolute bg-contain bg-no-repeat bg-center w-2/3 aspect-1669/438 -translate-x-1/2 pointer-events-none mix-blend-soft-light"
          style={{
            backgroundImage: "url('/i/hero_watermark.png')",
            x: watermarkX,
            y: watermarkY,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        />

        {/* FEATURES JADE LEFT */}
        <motion.div
          ref={leftImageRef}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 1 },
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
              delay: 1.6,
            },
          }}
          className="bottom-[400px] left-[10%] z-10 absolute bg-contain bg-no-repeat bg-center w-1/4 xl:w-1/5 max-w-sm aspect-454/649"
          style={{
            backgroundImage: "url('/i/hero_features_left.png')",
          }}
        />
        {/* JADE WALLET RIGHT */}
        <motion.div
          ref={rightImageRef}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 1.5 },
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 7,
              ease: "easeInOut",
              delay: 2.1,
            },
          }}
          className="right-20 bottom-[180px] xl:bottom-[190px] z-10 absolute w-1/3 xl:w-1/4 max-w-sm aspect-463/578 -rotate-5"
        >
          <Image
            src="/i/jade_wallet.png"
            alt="Jade Wallet"
            width={463}
            height={578}
            className="w-full h-full"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* CIRCUITO */}
      <svg
        ref={svgContainerRef}
        className="z-0 absolute w-full overflow-visible pointer-events-none"
        style={{ top: "50%", transform: "translateY(-50%)", height: "100vh" }}
        viewBox="0 0 1688 376"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {/* Center circles - fade in and scale */}
          <motion.path
            opacity="0.2"
            d="M824.65 220.09C844.665 220.09 860.89 203.865 860.89 183.85C860.89 163.835 844.665 147.61 824.65 147.61C804.635 147.61 788.41 163.835 788.41 183.85C788.41 203.865 804.635 220.09 824.65 220.09Z"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d="M824.65 224.14C846.901 224.14 864.94 206.102 864.94 183.85C864.94 161.599 846.901 143.56 824.65 143.56C802.398 143.56 784.36 161.599 784.36 183.85C784.36 206.102 802.398 224.14 824.65 224.14Z"
            stroke="white"
            strokeMiterlimit="10"
            fill="none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d="M824.65 197.67C832.283 197.67 838.47 191.482 838.47 183.85C838.47 176.217 832.283 170.03 824.65 170.03C817.018 170.03 810.83 176.217 810.83 183.85C810.83 191.482 817.018 197.67 824.65 197.67Z"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Left path - center to left */}
          <motion.path
            d={getCircuitPath(leftImagePos.x, leftImagePos.y)}
            stroke="white"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Right path - center to right */}
          <motion.path
            d={getCircuitPath(rightImagePos.x, rightImagePos.y)}
            stroke="white"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
          />

          {/* Left end cap */}
          <motion.circle
            cx={leftImagePos.x}
            cy={leftImagePos.y}
            r="8"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          />

          {/* Right end cap */}
          <motion.circle
            cx={rightImagePos.x}
            cy={rightImagePos.y}
            r="8"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.3 }}
          />
        </g>
      </svg>

      {/* INSERCAO */}
      <div className="hidden bottom-0 z-2 absolute lg:flex w-full min-h-[250px]">
        {/* Left spacer */}
        <div className="flex-1 bg-white"></div>

        {/* Content grid */}
        <div className="grid grid-cols-3 w-full max-w-site">
          {/* Column 1 - Left (elevated) */}
          <div className="flex flex-col justify-center gap-3 lg:gap-4 bg-white -mr-px px-4 lg:px-6">
            <div
              className="bg-start bg-contain bg-no-repeat lg:h-8 xl:h-12 aspect-216/55."
              style={{
                backgroundImage: "url('/i/hero_norficons.png')",
              }}
            />
            <p className="font-semibold text-xs lg:text-base xl:text-2xl leading-tight">
              Carteira fria 100% offline
              <br />
              open source com sistema Krux,
              <br /> sem Wi-Fi, Bluetooth ou NFC.
            </p>
          </div>

          {/* Column 2 - Center (lowered, custom slope) */}
          <div className="relative -mx-px">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 810 308"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              <path
                d="M809.605 0.00808086L809.614 308H0.113804L0.105469 0.00808086H0C13.03 0.00808086 24.77 8.00006 29.75 20.2426L129.95 266.79C137.45 285.255 155.15 297.287 174.79 297.287H636.661C656.411 297.287 674.191 285.109 681.621 266.491L779.771 20.4365C784.701 8.08086 796.501 0 809.601 0H809.605V0.00808086Z"
                fill="white"
              />
            </svg>
            <div className="z-10 relative flex flex-col justify-start items-center gap-4 lg:gap-6 px-2 lg:px-4 h-full">
              <a href="/products/coldkit">
                <div className="group p-0.5 lg:p-1 border-2 border-white hover:border-accent rounded-full font-semibold hover:text-white text-xs lg:text-sm xl:text-base hover:scale-105 duration-200">
                  <div className="bg-white group-hover:bg-accent px-6 lg:px-8 py-2 lg:py-3 rounded-full text-xl xl:text-2xl 2xl:text-3xl tracking-widest duration-200">
                    COMPRE <strong>AGORA!</strong>
                  </div>
                </div>
              </a>
              <p className="px-8 xl:px-10 font-semibold text-white text-sm lg:text-lg xl:text-xl text-center leading-tight">
                O ColdKit e o conjunto mais seguro de acessorios que garantem
                uma autocustodia 100% eficaz
              </p>
            </div>
          </div>

          {/* Column 3 - Right (elevated) */}
          <div className="flex flex-col justify-center bg-white -ml-px px-4 lg:px-6 py-8">
            <p className="flex flex-col text-xs lg:text-base xl:text-2xl leading-tight whitespace-pre-line">
              <span className="font-extrabold text-[#F5911E]">
                Carteira Jade.
              </span>
              pratica para uso diario que conecta com corretoras, apps e P2P via
              USB, Bluetooh ou QR. Compativel com rede Liquid,
              <strong>permitindo recebimento direto sem swap.</strong>
            </p>
          </div>
        </div>

        {/* Right spacer */}
        <div className="flex-1 bg-white"></div>
      </div>
    </div>
  );
}
