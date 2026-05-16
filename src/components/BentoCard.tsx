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
      whileHover={{ scale: 1.015 }} // Cukup definisikan target scale-nya saja di sini
      transition={{
        // 1. Animasi Load Awal: Terapkan delay HANYA pada opacity dan y
        opacity: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
        y: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },

        // 2. Animasi Scale (Hover & Un-hover): Gunakan spring tanpa delay
        scale: { type: 'spring', stiffness: 300, damping: 20, delay: 0 }
      }}
      className={cn(
        'group relative overflow-hidden glass-card hover:z-20',
        className
      )}
      // 3. Optimasi Rendering Hardware agar tidak patah/bergetar
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased'
      }}
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
            className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0,transparent_70%,#3b82f6_75%,#ffffff_85%,#ffffff_90%,#3b82f6_100%)] animate-spin-slow"
          />
        </div>
      </div>

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
