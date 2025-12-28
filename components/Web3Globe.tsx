'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import createGlobe from 'cobe';

interface Web3GlobeProps {
  className?: string;
}

export default function Web3Globe({ className = '' }: Web3GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const { language } = useLanguage();
  const [phi, setPhi] = useState(0);
  const [theta, setTheta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointer, setLastPointer] = useState<[number, number] | null>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(0);

  const isDark = resolvedTheme === 'dark' || theme === 'dark';
  const isRTL = language === 'ar';

  // RGB markers: Cairo, Egypt and Riyadh, Saudi Arabia with distinct glowing colors
  const markers = [
    {
      location: [30.0444, 31.2357],
      size: 0.2, // Cairo - larger for premium visibility
    },
    {
      location: [24.7136, 46.6753],
      size: 0.2, // Riyadh - larger for premium visibility
    },
  ];

  // Sync refs with state
  useEffect(() => {
    phiRef.current = phi;
  }, [phi]);

  useEffect(() => {
    thetaRef.current = theta;
  }, [theta]);

  // Initialize globe and handle resize
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const updateGlobe = () => {
      const canvasWidth = canvas.offsetWidth || 600;
      const canvasHeight = canvas.offsetHeight || 600;

      // Logical render size (ensure big enough for hero background)
      const logicalSize = Math.max(canvasWidth, canvasHeight, 1200);

      // Set canvas size for retina displays
      canvas.width = logicalSize * 2;
      canvas.height = logicalSize * 2;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      // Destroy existing globe if present
      if (globeRef.current) {
        globeRef.current.destroy();
      }

      // نستخدم نصف حجم الكرة تقريباً لضبط المركز بحيث يبدأ القوس تماماً من حدود الشاشة
      // أي أن حافة الكرة (وليس جزء فارغ قبلها) تلمس حافة الشاشة مباشرة
      const hemisphereOffset = logicalSize * 0.5;
      const offsetX = isRTL ? -hemisphereOffset : hemisphereOffset;

      const globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: logicalSize,
        height: logicalSize,
        phi: 0,
        theta: 0,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 2.5 : 2.0, // زيادة الانتشار للشفافية
        // Scale أكبر ليجعل الكرة تملأ مساحة أكبر
        scale: 2.6,
        offset: [offsetX, 0],
        mapSamples: 15000, // High density dotted grid for continents
        // سطوع أعلى للنقاط مع شفافية القاعدة
        mapBrightness: isDark ? 8 : 7,
        // ✨ قاعدة شفافة تماماً - تأخذ لون الخلفية
        // Dark: تدرج من الأزرق الداكن إلى البنفسجي (يتناسب مع rgb-animated)
        // Light: تدرج من الأزرق الفاتح إلى البنفسجي الفاتح
        baseColor: isDark ? [0.05, 0.1, 0.2] : [0.85, 0.88, 0.95],
        // 🌈 ألوان النقاط - تدرج من السماوي إلى البنفسجي
        // Dark: نيون أزرق-بنفسجي متوهج
        // Light: أزرق-بنفسجي ناعم
        markerColor: isDark ? [0.4, 0.7, 1] : [0.45, 0.5, 0.75],
        // ✨ توهج بتدرج ألوان يتناسب مع الخلفية
        glowColor: isDark ? [0.5, 0.6, 0.9] : [0.6, 0.65, 0.85],
        // شفافية أعلى للقاعدة
        opacity: 0.6, // شفافية الكرة الأساسية
        markers: markers.map((marker) => ({
          location: marker.location as [number, number],
          size: marker.size,
        })),
        onRender: (state) => {
          // Base offsets لضبط موضع القارات والنقاط
          const basePhi = Math.PI / 3;
          const baseTheta = isRTL ? -0.5 : 0.5;

          // Update rotation based on scroll + drag + base offsets
          state.phi = basePhi + phiRef.current;
          state.theta = baseTheta + thetaRef.current;
        },
      });

      globeRef.current = globe;
    };

    // Initial setup
    updateGlobe();

    // Handle window resize
    const handleResize = () => {
      updateGlobe();
    };

    window.addEventListener('resize', handleResize);

    // Use ResizeObserver for more accurate resize detection
    const resizeObserver = new ResizeObserver(() => {
      updateGlobe();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, [isDark, isRTL]);

  // Auto-rotate animation - very subtle when not interacting
  useEffect(() => {
    const animate = () => {
      if (!isDragging && globeRef.current) {
        // Very subtle auto-rotation
        setTheta((prev) => prev + 0.002);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging]);

  // Handle scroll sync for phi rotation - smooth forward rotation on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isDragging || ticking) return; // Don't update on scroll if user is dragging

      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1
        );
        const scrollProgress = Math.min(scrollY / maxScroll, 1);

        // Map scroll to phi rotation (0 to 2π) - forward rotation
        const newPhi = scrollProgress * Math.PI * 2;
        setPhi(newPhi);

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  // Mouse/Touch drag handlers - responsive to both mouse and touch
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setLastPointer([e.clientX, e.clientY]);
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || !lastPointer) return;

    const dx = e.clientX - lastPointer[0];
    const dy = e.clientY - lastPointer[1];

    // Smooth rotation with sensitivity adjustment
    setTheta((prev) => prev + dx * 0.008);

    // Update phi (vertical rotation) with clamping
    setPhi((prev) => {
      const newPhi = prev - dy * 0.008;
      // Clamp phi between 0 and 2π
      return Math.max(0, Math.min(Math.PI * 2, newPhi));
    });

    setLastPointer([e.clientX, e.clientY]);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
    setLastPointer(null);
    canvasRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          // ✨ توهج متدرج من الأزرق إلى البنفسجي يتناسب مع خلفية rgb-animated
          filter: isDark
            ? 'drop-shadow(0 0 40px rgba(139,92,246,0.4)) drop-shadow(0 0 60px rgba(56,189,248,0.3))'
            : 'drop-shadow(0 0 30px rgba(168,85,247,0.25)) drop-shadow(0 0 45px rgba(129,140,248,0.2))',
          // Clip to show hemisphere effect - emerging from side/bottom
          // Ellipse creates a half-sphere view from the side
          clipPath: isRTL
            ? 'ellipse(130% 110% at 100% 50%)'
            : 'ellipse(130% 110% at 0% 50%)',
        }}
      />
    </div>
  );
}

