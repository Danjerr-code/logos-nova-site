export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 680 680"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(340,340)">
        <circle
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1"
          r="220"
          strokeDasharray="28 16 28 16 28 16 28 16 28 16 28 16 28 16 28 16"
          opacity="0.25"
        />
        <polygon fill="#c9a84c" points="0,-200 -14,-40 0,0 14,-40" />
        <polygon fill="#c9a84c" points="0,200 -14,40 0,0 14,40" />
        <polygon fill="#c9a84c" points="-200,0 -40,-14 0,0 -40,14" />
        <polygon fill="#c9a84c" points="200,0 40,-14 0,0 40,14" />
        <polygon
          fill="#c9a84c"
          points="0,0 -10,-28 -110,-110 -28,-10"
          opacity="0.85"
        />
        <polygon
          fill="#c9a84c"
          points="0,0 10,-28 110,-110 28,-10"
          opacity="0.85"
        />
        <polygon
          fill="#c9a84c"
          points="0,0 -10,28 -110,110 -28,10"
          opacity="0.85"
        />
        <polygon
          fill="#c9a84c"
          points="0,0 10,28 110,110 28,10"
          opacity="0.85"
        />
        <circle
          fill="none"
          stroke="#c9a84c"
          strokeWidth="2.5"
          r="185"
          opacity="0.7"
        />
        <line
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          x1="121"
          y1="-147"
          x2="131"
          y2="-159"
          opacity="0.6"
        />
        <line
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          x1="-121"
          y1="-147"
          x2="-131"
          y2="-159"
          opacity="0.6"
        />
        <line
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          x1="121"
          y1="147"
          x2="131"
          y2="159"
          opacity="0.6"
        />
        <line
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          x1="-121"
          y1="147"
          x2="-131"
          y2="159"
          opacity="0.6"
        />
        <circle
          fill="none"
          stroke="#c9a84c"
          strokeWidth="0.8"
          r="48"
          opacity="0.4"
        />
        <circle fill="#c9a84c" r="2.5" cx="34" cy="-34" opacity="0.7" />
        <circle fill="#c9a84c" r="2.5" cx="-34" cy="-34" opacity="0.7" />
        <circle fill="#c9a84c" r="2.5" cx="34" cy="34" opacity="0.7" />
        <circle fill="#c9a84c" r="2.5" cx="-34" cy="34" opacity="0.7" />
        <circle fill="#0a1628" r="14" />
        <circle fill="#ffffff" r="10" />
        <circle fill="#c9a84c" r="5" />
      </g>
    </svg>
  );
}
