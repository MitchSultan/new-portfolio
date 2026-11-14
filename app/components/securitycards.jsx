'use client';

import { useEffect, useRef } from 'react';
import { Newsreader } from 'next/font/google';

const serif = Newsreader({ subsets: ['latin'], weight: ['400', '500'] });

/* -------------------------------------------------------------------------- */
/*  Physics                                                                   */
/* -------------------------------------------------------------------------- */

// Max tilt in degrees, lift toward the viewer in px, and camera distance in px.
const MAX_TILT = 10;
const LIFT = 56;
const PERSPECTIVE = 900;

// Damped spring per axis: a = (-k * (x - target) - c * v) / mass  (mass = 1).
// Damping ratio = c / (2 * sqrt(k)). Under 1 = a little overshoot, like a real object settling.
const SPRINGS = {
  rx: { k: 170, c: 15 }, // ratio ~0.58
  ry: { k: 170, c: 15 },
  z: { k: 130, c: 13 }, //  ratio ~0.57
  sx: { k: 260, c: 30 }, // sheen follows the pointer, nearly critically damped
  sy: { k: 260, c: 30 },
  so: { k: 200, c: 26 },
};
const AXES = Object.keys(SPRINGS);
const DT = 1 / 120; // fixed physics step so behaviour is identical at 60, 120 or 144 Hz
const EPS = 0.01;

/**
 * Pointer position over the (untransformed) slot sets spring targets.
 * Edge nearest the pointer rises toward the viewer, the opposite edge recedes,
 * and the whole card is lifted on the z-axis. Leaving sets every target back to rest.
 */
function usePhysicsTilt(slotRef, cardRef) {
  useEffect(() => {
    const slot = slotRef.current;
    const card = cardRef.current;
    if (!slot || !card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pos = { rx: 0, ry: 0, z: 0, sx: 50, sy: 50, so: 0 };
    const vel = { rx: 0, ry: 0, z: 0, sx: 0, sy: 0, so: 0 };
    const target = { rx: 0, ry: 0, z: 0, sx: 50, sy: 50, so: 0 };

    let raf = 0;
    let last = 0;
    let acc = 0;

    const render = () => {
      card.style.transform = `perspective(${PERSPECTIVE}px) translateZ(${pos.z}px) rotateX(${pos.rx}deg) rotateY(${pos.ry}deg)`;

      // A lifted object casts a longer, softer shadow, shifted away from the raised edge.
      const lift = Math.max(pos.z, 0);
      const x = -pos.ry * 1.6;
      const y = 14 + lift * 0.7 + pos.rx * 1.6;
      const blur = 28 + lift * 1.5;
      const alpha = 0.28 + lift * 0.004;
      card.style.boxShadow = `${x}px ${y}px ${blur}px rgba(0,0,0,${alpha})`;

      card.style.setProperty('--rx', pos.rx.toFixed(3));
      card.style.setProperty('--ry', pos.ry.toFixed(3));
      card.style.setProperty('--sx', `${pos.sx.toFixed(2)}%`);
      card.style.setProperty('--sy', `${pos.sy.toFixed(2)}%`);
      card.style.setProperty('--so', Math.max(pos.so, 0).toFixed(3));
    };

    const step = (dt) => {
      for (const a of AXES) {
        const { k, c } = SPRINGS[a];
        const accel = -k * (pos[a] - target[a]) - c * vel[a];
        vel[a] += accel * dt; // semi-implicit Euler: stable for stiff springs
        pos[a] += vel[a] * dt;
      }
    };

    const atRest = () =>
      AXES.every(
        (a) => Math.abs(pos[a] - target[a]) < EPS && Math.abs(vel[a]) < EPS
      );

    const tick = (now) => {
      acc += Math.min((now - last) / 1000, 0.05);
      last = now;
      while (acc >= DT) {
        step(DT);
        acc -= DT;
      }
      if (atRest()) {
        for (const a of AXES) {
          pos[a] = target[a];
          vel[a] = 0;
        }
        render();
        raf = 0;
        return;
      }
      render();
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      acc = 0;
      raf = requestAnimationFrame(tick);
    };

    const aim = (e) => {
      // Measure the slot, not the card: the card moves, so measuring it would feed back into itself.
      const r = slot.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      target.ry = -(px - 0.5) * 2 * MAX_TILT; // pointer on the right: right edge comes forward
      target.rx = (py - 0.5) * 2 * MAX_TILT; //  pointer low: bottom edge comes forward
      target.z = LIFT;
      target.sx = px * 100;
      target.sy = py * 100;
      target.so = 1;
      wake();
    };

    const onEnter = (e) => {
      if (e.pointerType === 'touch') return;
      aim(e);
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      aim(e);
    };
    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.z = 0;
      target.so = 0;
      wake();
    };

    slot.addEventListener('pointerenter', onEnter);
    slot.addEventListener('pointermove', onMove);
    slot.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      slot.removeEventListener('pointerenter', onEnter);
      slot.removeEventListener('pointermove', onMove);
      slot.removeEventListener('pointerleave', onLeave);
    };
  }, [slotRef, cardRef]);
}

function PhysicsCard({ tone, children }) {
  const slotRef = useRef(null);
  const cardRef = useRef(null);
  usePhysicsTilt(slotRef, cardRef);

  return (
    <li ref={slotRef} className="sec-slot">
      <article ref={cardRef} className={`sec-card sec-card--${tone}`}>
        {children}
        <span className="sec-sheen" aria-hidden="true" />
      </article>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Graphics                                                                  */
/* -------------------------------------------------------------------------- */

const C = 20; // grid cell size in the 240 x 240 artboards

const TILES = [
  { c: 0, r: 0, s: 4, color: '#6d7bf2', shape: 'qc', rot: 0 },
  { c: 4, r: 0, s: 2, color: '#f2b84b', shape: 'sq' },
  { c: 6, r: 0, s: 3, color: '#ef6f6c', shape: 'circle' },
  { c: 9, r: 1, s: 3, color: '#3fb8af', shape: 'qc', rot: 2 },
  { c: 2, r: 4, s: 3, color: '#3fb8af', shape: 'sq' },
  { c: 5, r: 5, s: 4, color: '#b07cf0', shape: 'qc', rot: 1 },
  { c: 0, r: 7, s: 2, color: '#ef6f6c', shape: 'circle' },
  { c: 9, r: 6, s: 3, color: '#f2b84b', shape: 'qc', rot: 3 },
  { c: 3, r: 9, s: 3, color: '#6d7bf2', shape: 'circle' },
  { c: 7, r: 10, s: 2, color: '#3fb8af', shape: 'sq' },
];

function Tile({ c, r, s, color, shape, rot = 0 }) {
  const x = c * C;
  const y = r * C;
  const size = s * C;
  const cx = x + size / 2;
  const cy = y + size / 2;
  if (shape === 'circle') {
    return <circle cx={cx} cy={cy} r={size / 2} fill={color} />;
  }
  if (shape === 'qc') {
    return (
      <path
        d={`M${x} ${y} L${x + size} ${y} A${size} ${size} 0 0 1 ${x} ${y + size} Z`}
        fill={color}
        transform={`rotate(${rot * 90} ${cx} ${cy})`}
      />
    );
  }
  return <rect x={x} y={y} width={size} height={size} rx="3" fill={color} />;
}

// Fine permission grid: hairlines, one dot per cell, brighter dots where access is granted.
function PermissionGraphic() {
  const lines = Array.from({ length: 13 }, (_, i) => i * C);
  const cells = [];
  for (let col = 0; col < 12; col++) {
    for (let row = 0; row < 12; row++) {
      const granted = (col * 7 + row * 3) % 5 === 0;
      cells.push(
        <circle
          key={`${col}-${row}`}
          cx={col * C + C / 2}
          cy={row * C + C / 2}
          r={granted ? 2.4 : 1.1}
          fill="#fff"
          opacity={granted ? 0.8 : 0.18}
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label="Grid of roles and permissions">
      {lines.map((p) => (
        <g key={p} stroke="#fff" strokeOpacity="0.09" strokeWidth="0.5">
          <line x1={p} y1="0" x2={p} y2="240" />
          <line x1="0" y1={p} x2="240" y2={p} />
        </g>
      ))}
      {cells}
      {TILES.map((t, i) => (
        <Tile key={i} {...t} />
      ))}
    </svg>
  );
}

// Concentric arcs: time-limited access shrinking toward the center.
function AccessRingsGraphic() {
  const ring = (r, w, arc, color, key) => {
    const circ = 2 * Math.PI * r;
    return (
      <circle
        key={key}
        cx="120"
        cy="120"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={w}
        strokeDasharray={`${arc * circ} ${circ}`}
        transform="rotate(-90 120 120)"
      />
    );
  };
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label="Concentric access timers">
      <circle
        cx="120"
        cy="120"
        r="110"
        fill="none"
        stroke="#14161d"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="1.5 7"
      />
      {ring(90, 14, 0.8, '#14161d', 'a')}
      {ring(68, 14, 0.58, '#ff3b57', 'b')}
      {ring(46, 14, 0.36, '#2f6bff', 'c')}
      <circle cx="120" cy="120" r="14" fill="#14161d" />
    </svg>
  );
}

// Stacked blocks: one column per day, one block per recorded action, newest block in white.
const AUDIT_HEIGHTS = [3, 5, 2, 7, 4, 9, 3, 6, 10, 4, 5, 2];
const AUDIT_COLORS = ['#6d7bf2', '#3fb8af', '#f2b84b', '#b07cf0', '#ef6f6c'];

function AuditGraphic() {
  const blocks = [];
  AUDIT_HEIGHTS.forEach((h, col) => {
    for (let j = 0; j < h; j++) {
      const isTop = j === h - 1;
      blocks.push(
        <rect
          key={`${col}-${j}`}
          x={col * C + 2}
          y={224 - j * C}
          width="16"
          height="16"
          rx="3"
          fill={isTop ? '#eceff4' : AUDIT_COLORS[col % AUDIT_COLORS.length]}
          opacity={isTop ? 1 : 0.9}
        />
      );
    }
  });
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label="Actions recorded per day">
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={i}
          x1="0"
          x2="240"
          y1={i * C}
          y2={i * C}
          stroke="#fff"
          strokeOpacity="0.07"
          strokeWidth="0.5"
        />
      ))}
      {blocks}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function SecurityCards() {
  const headingStyle = { fontFamily: serif.style.fontFamily };

  return (
    <section className="sec">
      <style>{css}</style>

      <div className="sec-head">
        <h2 className="sec-title" style={headingStyle}>
          Access you can see, grant and take back.
        </h2>
      </div>

      <ul className="sec-grid">
        <PhysicsCard tone="dark">
          <h3 className="sec-h" style={headingStyle}>
            Every permission, in plain sight.
          </h3>
          <p className="sec-p">
            See who can open, edit or share each record, down to the individual field.
          </p>
          <div className="sec-art">
            <PermissionGraphic />
          </div>
        </PhysicsCard>

        <PhysicsCard tone="pale">
          <h3 className="sec-h" style={headingStyle}>
            Access that expires on its own.
          </h3>
          <p className="sec-p">
            Give someone exactly what they need, for exactly as long as they need it.
          </p>
          <div className="sec-art">
            <AccessRingsGraphic />
          </div>
          <div className="sec-access">
            <p className="sec-access-msg">
              <strong>Access granted</strong> to the design team until Friday, 5 pm.
            </p>
            <span className="sec-glow" aria-hidden="true" />
          </div>
        </PhysicsCard>

        <PhysicsCard tone="dark">
          <h3 className="sec-h" style={headingStyle}>
            Every action leaves a trail.
          </h3>
          <p className="sec-p">
            Each view, change and export is recorded, so you can answer who did what and when.
          </p>
          <div className="sec-art">
            <AuditGraphic />
          </div>
        </PhysicsCard>
      </ul>
    </section>
  );
}

const css = `
.sec {
  background: #252936;
  color: #eceff4;
  padding: clamp(64px, 10vw, 120px) 24px;
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
}
.sec-head { max-width: 1200px; margin: 0 auto 56px; }
.sec-title {
  margin: 0;
  max-width: 20ch;
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  line-height: 1.08;
  font-weight: 400;
  letter-spacing: -0.015em;
}
.sec-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}
@media (min-width: 960px) {
  .sec-grid { grid-template-columns: repeat(3, 1fr); gap: 28px; }
}

/* The slot never transforms: it keeps hit-testing stable while the card moves. */
.sec-slot { display: flex; min-height: 580px; }

.sec-card {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 28px;
  overflow: hidden;
  transform: perspective(900px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
  will-change: transform;
}
.sec-card--dark {
  --sheen: rgba(255, 255, 255, 0.13);
  background: #0b0d13;
  color: #eceff4;
  border: 1px solid rgba(255, 255, 255, 0.07);
}
.sec-card--pale {
  --sheen: rgba(255, 255, 255, 0.95);
  background: #eceef3;
  color: #14161d;
}

.sec-h {
  margin: 0 0 14px;
  font-size: clamp(1.75rem, 2.4vw, 2.2rem);
  line-height: 1.12;
  font-weight: 400;
  letter-spacing: -0.01em;
}
.sec-p { margin: 0; max-width: 34ch; font-size: 0.97rem; line-height: 1.55; opacity: 0.68; }

.sec-art {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 28px;
  /* Graphic shifts slightly against the tilt, so it reads as sitting deeper than the surface. */
  transform: translate(calc(var(--ry, 0) * -1.2px), calc(var(--rx, 0) * 1.2px));
}
.sec-art svg { width: 100%; height: auto; max-height: 340px; }

.sec-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--so, 0);
  background: radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), var(--sheen), transparent 60%);
}

.sec-access { position: relative; margin-top: 28px; }
.sec-access-msg {
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 16px 18px;
  border-radius: 16px;
  background: #fff;
  font-size: 0.95rem;
  line-height: 1.4;
}
.sec-glow {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: -18px;
  height: 34px;
  background: linear-gradient(90deg, #ff3b57, #2f6bff);
  filter: blur(22px);
  opacity: 0.85;
}

@media (prefers-reduced-motion: reduce) {
  .sec-card { will-change: auto; }
}
`;