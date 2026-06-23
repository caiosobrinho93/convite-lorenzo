'use client';

export default function WebCorners() {
  return (
    <>
      {/* Top Left */}
      <div className="web-corner-tl" style={{ width: 160, height: 160 }}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 L160 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M0 0 L0 160" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          {[20, 40, 60, 80, 100, 120, 140, 160].map((d) => (
            <path
              key={d}
              d={`M0 ${d} L${d} 0`}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
            />
          ))}
          {[40, 80, 120].map((r) => (
            <path
              key={r}
              d={`M0 0 Q${r / 2} ${r / 2} 0 ${r}`}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.8"
              fill="none"
            />
          ))}
        </svg>
      </div>

      {/* Top Right */}
      <div className="web-corner-tr" style={{ width: 160, height: 160 }}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 L160 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M0 0 L0 160" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          {[20, 40, 60, 80, 100, 120, 140, 160].map((d) => (
            <path
              key={d}
              d={`M0 ${d} L${d} 0`}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      </div>
    </>
  );
}
