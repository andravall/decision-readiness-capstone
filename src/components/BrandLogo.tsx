import React, { useId } from 'react';

/**
 * "Chronos Convergence" Brand Emblem:
 * Unifies a 255° Schedule/Readiness gauge arc, synchronized check-hands,
 * and an emerald threshold node on an obsidian squircle.
 */
export const BrandLogo: React.FC<{ size?: number }> = ({ size = 34 }) => {
  const uid = useId().replace(/:/g, '');
  const bgId = `drb-bg-${uid}`;
  const rimId = `drb-rim-${uid}`;
  const arcId = `drb-arc-${uid}`;
  const gemId = `drb-gem-${uid}`;

  return (
    <span className="brand-mark" aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={bgId} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#11192C" />
            <stop offset="100%" stopColor="#070A12" />
          </linearGradient>
          <linearGradient id={rimId} x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.48" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient id={arcId} x1="12" y1="14" x2="50" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="55%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
          <linearGradient id={gemId} x1="41" y1="14" x2="50" y2="23" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        <rect width="64" height="64" rx="16" fill={`url(#${bgId})`} />
        <rect
          x="0.75"
          y="0.75"
          width="62.5"
          height="62.5"
          rx="15.25"
          stroke={`url(#${rimId})`}
          strokeWidth="1.5"
        />

        <circle cx="32" cy="32" r="20" stroke="#1E293B" strokeWidth="5.2" />

        <path
          d="M37.2 12.7A20 20 0 1 0 51.3 26.8"
          stroke={`url(#${arcId})`}
          strokeWidth="5.2"
          strokeLinecap="round"
        />

        <path
          d="M22.2 33.2L29.2 40.2L41.8 25.6"
          stroke="#F8FAFC"
          strokeWidth="5.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="46.1"
          cy="17.9"
          r="5.2"
          fill={`url(#${gemId})`}
          stroke="#090D18"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
};
