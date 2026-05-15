'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ReactNode, MouseEvent } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
}

export default function BentoCard({
  children,
  className,
  delay = 0,
  glowColor = 'rgba(255, 255, 255, 0.15)'
}: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={cn(
        'group relative overflow-hidden glass-card transition-all duration-300',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Hover glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 40%
            )
          `,
        }}
      />

      {/* Border Beam Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-[1.5rem] p-[1.5px] [mask-image:linear-gradient(white,white),linear-gradient(white,white)] [mask-clip:content-box,padding-box] [mask-composite:exclude] bg-transparent overflow-hidden">
          <div 
            className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0,transparent_70%,#3b82f6_85%,#10b981_95%,#3b82f6_100%)] animate-spin-slow"
          />
        </div>
      </div>
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
