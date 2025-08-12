'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min.js';

type Props = { children: React.ReactNode };

const VantaBackground = ({ children }: Props) => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffectRef = useRef<any>(null);
  const colorSeq = useRef<number>(0);

  // بالِت موسّعة مأخوذة من ألوان اللوجو (بنفسجي ← أزرق ← فيروزي)
  const palette = [
    0x7f3fbf, // purple deep
    0x9a5fe6, // purple mid
    0xb07aff, // purple light
    0x7f55ff, // violet
    0x835cf7, // violet light
    0x557fd4, // blue mid
    0x3f94ff, // blue bright
    0x22c1ff, // sky
    0x2ad1ee, // cyan
    0x4be4ff, // aqua
  ];

  useEffect(() => {
    if (vantaRef.current && !vantaEffectRef.current) {
      vantaEffectRef.current = GLOBE({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundAlpha: 0.0, // شفاف عشان يبان التدرّج اللي وراه
        color: palette[0],
        color2: palette[5],
        size: 1.2,
      });

      // تبديل ألوان الكرة تلقائياً كل 6 ثواني من نفس البالِت
      const interval = setInterval(() => {
        colorSeq.current = (colorSeq.current + 1) % palette.length;
        const c1 = palette[colorSeq.current];
        const c2 = palette[(colorSeq.current + 4) % palette.length];
        vantaEffectRef.current?.setOptions?.({ color: c1, color2: c2 });
      }, 6000);

      return () => {
        clearInterval(interval);
        vantaEffectRef.current?.destroy?.();
        vantaEffectRef.current = null;
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* خلفية متعددة الطبقات + stops محددة بالنِّسب */}
      <div className="absolute inset-0 animated-gradient" aria-hidden="true" />

      {/* تأثير Vanta GLOBE */}
      <div ref={vantaRef} className="absolute inset-0" aria-hidden="true" />

      {/* المحتوى */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {children}
      </div>

      <style jsx global>{`
        /* طبقة التدرّج: مزيج من linear + radial مع Stops واضحة ونِسب دقيقة */
        .animated-gradient {
          /* طبقة 1: radial لإضافة عمق/إشراقة في الوسط */
          background:
            radial-gradient(
              1200px 1200px at 50% 50%,
              #b07aff1a 0%,
              #9a5fe60f 35%,
              transparent 65%
            ),
          /* طبقة 2: linear gradient مُسقّط بنِسب من ألوان اللوجو */
            linear-gradient(
              120deg,
              #7f3fbf 0%,
              #8b4dd2 8%,
              #9a5fe6 16%,
              #b07aff 24%,
              #7f55ff 32%,
              #875df9 40%,
              #835cf7 48%,
              #6a8ef0 56%,
              #557fd4 64%,
              #3f94ff 72%,
              #22c1ff 80%,
              #2ad1ee 88%,
              #4be4ff 100%
            );
          background-size: 500% 500%, 400% 400%;
          animation:
            gradientShift 26s ease-in-out infinite,
            glowPulse 10s ease-in-out infinite;
          filter: saturate(1.08);
        }

        /* حركة إنزلاق التدرّج (stops بتتحرك بسلاسة) */
        @keyframes gradientShift {
          0%   { background-position: 0% 50%,    0% 50%; }
          50%  { background-position: 100% 50%,  100% 50%; }
          100% { background-position: 0% 50%,    0% 50%; }
        }

        /* نبض خفيف لإبراز الطبقة الدائرية */
        @keyframes glowPulse {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.9; }
        }
      `}</style>
    </section>
  );
};

export default VantaBackground;
