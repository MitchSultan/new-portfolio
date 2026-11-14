'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

/**
 * Sphere that rotates as the page scrolls.
 * Scroll position is read from a ref (not state) so scrolling never triggers React re-renders.
 */
function ScrollSphere({ scrollRef, reducedMotion }) {
  const group = useRef();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const { y } = scrollRef.current;

    // Scroll drives the spin. Tune these multipliers to taste.
    const targetY = y * 0.005;
    const targetX = 0.35 + y * 0.0012;

    // damp() gives smooth, frame-rate independent easing toward the target.
    g.rotation.y = MathUtils.damp(g.rotation.y, targetY, 4, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, targetX, 4, delta);

    // Tiny idle drift so the sphere feels alive before the first scroll.
    if (!reducedMotion) {
      g.rotation.z += delta * 0.03;
    }
  });

  return (
    <group ref={group}>
      {/* Solid core */}
      <mesh>
        <icosahedronGeometry args={[1.6, 3]} />
        <meshStandardMaterial
          color="#0f1c2e"
          roughness={0.55}
          metalness={0.2}
          flatShading
        />
      </mesh>

      {/* Wireframe shell: makes the rotation clearly visible */}
      <mesh scale={1.004}>
        <icosahedronGeometry args={[1.6, 3]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function HeroSphere({
  title = 'Your headline goes here',
  subtitle = 'A short line that explains what you do.',
  scrollLength = '300vh', // how long the scroll-spin lasts
}) {
  const scrollRef = useRef({ y: 0 });
  const sectionRef = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      // Scroll distance measured from the top of this hero section
      const top = el.getBoundingClientRect().top;
      scrollRef.current.y = Math.max(0, -top);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // Tall wrapper creates the scroll distance
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: scrollLength, background: '#070d16' }}
    >
      {/* Sticky viewport-sized stage stays on screen while the wrapper scrolls past */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          style={{ position: 'absolute', inset: 0 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 5]} intensity={1.6} />
          <pointLight position={[-4, -2, 3]} intensity={12} color="#5eead4" />
          <ScrollSphere
            scrollRef={scrollRef}
            reducedMotion={reducedMotion.current}
          />
        </Canvas>

        {/* Text overlay. pointer-events none so it never blocks the canvas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '12vh',
            textAlign: 'center',
            color: '#e8f1f2',
            pointerEvents: 'none',
            padding: '0 1.5rem 12vh',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: '16ch',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              marginTop: '1rem',
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              opacity: 0.75,
              maxWidth: '44ch',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}