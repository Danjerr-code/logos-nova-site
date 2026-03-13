'use client';

import { useRef, useEffect } from 'react';

export default function SupernovaCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 500;
    const H = 500;
    const cx = 250;
    const cy = 250;
    const MAX_RADIUS = 180;
    const NUM_RAYS = 12;

    // Build particles — stagger starting positions
    const particles = Array.from({ length: NUM_RAYS }, (_, i) => ({
      angle: (i / NUM_RAYS) * Math.PI * 2,
      dist: (i / NUM_RAYS) * MAX_RADIUS,   // staggered start
      speed: MAX_RADIUS / 120,              // px per second
      size: 0.8 + Math.random() * 0.7,     // 0.8–1.5px
    }));

    let lastTime = null;

    function draw(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const elapsed = (timestamp - lastTime) / 1000; // seconds
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H);

      // ── 1. ORBITAL RING ────────────────────────────────────────────
      const ringAngle = ((timestamp / 1000) / 20) * Math.PI * 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ringAngle);
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 40, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // ── 2. PARTICLE RAYS ──────────────────────────────────────────
      particles.forEach(p => {
        p.dist += p.speed * elapsed;
        if (p.dist > MAX_RADIUS) p.dist = 0;

        const t = p.dist / MAX_RADIUS;
        const alpha = (1 - t) * 0.6;
        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha.toFixed(3)})`;
        ctx.fill();
      });

      // ── 3. CORE PULSE ─────────────────────────────────────────────
      const pulseT = (Math.sin((timestamp / 1000 / 3) * Math.PI * 2) + 1) / 2;
      const coreRadius = 8 + pulseT * 8; // 8–16px

      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(201, 168, 76, 0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201, 168, 76, 0.9)';
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ opacity: 0.85 }}
    />
  );
}
