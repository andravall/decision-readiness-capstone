import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const CompassHubIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-compass ${className}`} aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.65" />
    <polygon
      className="icon-part-needle"
      points="13.2,6.8 11.1,11.1 6.8,13.2 8.9,8.9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.18"
    />
  </svg>
);

export const PrototypeCursorIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-proto ${className}`} aria-hidden="true">
    <rect x="2.5" y="3" width="12" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.65" />
    <path d="M5.5 6.8H11.5M5.5 9.8H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      className="icon-part-cursor"
      d="M11.8 11.2L17.2 13.5L14.5 14.6L13.4 17.3L11.8 11.2Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const CoreDatabaseCheckIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-core ${className}`} aria-hidden="true">
    <ellipse cx="9" cy="5" rx="6" ry="2.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 5V13.2C3 14.5 5.7 15.6 9 15.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M3 9.1C3 10.4 5.7 11.5 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M15 5V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle className="icon-part-pop" cx="14.5" cy="14.2" r="4" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.5" />
    <path className="icon-part-pop" d="M12.8 14.2L14 15.4L16.3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CalendarProposalIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-cal ${className}`} aria-hidden="true">
    <rect x="2.8" y="4.2" width="14.4" height="13" rx="2.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.8 8.2H17.2M6.5 2.5V5.2M13.5 2.5V5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle className="icon-part-pop" cx="7" cy="11.6" r="1.1" fill="currentColor" />
    <circle cx="10" cy="11.6" r="1.1" fill="currentColor" fillOpacity="0.55" />
    <circle cx="13" cy="11.6" r="1.1" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export const ClockTickIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-clock ${className}`} aria-hidden="true">
    <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeWidth="1.65" />
    <path
      className="icon-part-hand"
      d="M10 5.8V10.2L13 11.9"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LocationModeIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-mode ${className}`} aria-hidden="true">
    <rect x="2.5" y="4.5" width="10.8" height="11" rx="2.3" stroke="currentColor" strokeWidth="1.6" />
    <path className="icon-part-slide" d="M13.3 8.4L17.5 6.2V13.8L13.3 11.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChatClarifyIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-chat ${className}`} aria-hidden="true">
    <path
      d="M3 5.8C3 4.4 4.1 3.3 5.5 3.3H13.5C14.9 3.3 16 4.4 16 5.8V11.2C16 12.6 14.9 13.7 13.5 13.7H7.4L3.8 16.5V13.7C3.3 13.3 3 12.3 3 11.2V5.8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle className="icon-part-dot1" cx="7" cy="8.5" r="1.05" fill="currentColor" />
    <circle className="icon-part-dot2" cx="9.6" cy="8.5" r="1.05" fill="currentColor" />
    <circle className="icon-part-dot3" cx="12.2" cy="8.5" r="1.05" fill="currentColor" />
  </svg>
);

export const ShieldLockIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-shield ${className}`} aria-hidden="true">
    <path
      d="M10 2.4L16.2 4.8V9.7C16.2 13.6 13.5 16.5 10 17.8C6.5 16.5 3.8 13.6 3.8 9.7V4.8L10 2.4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      className="icon-part-pop"
      d="M7.3 10.1L9.2 12L13 8"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChatVsCommitIcon: React.FC<IconProps> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M2.5 5.2C2.5 4 3.5 3 4.7 3H10.5C11.7 3 12.7 4 12.7 5.2V9.2C12.7 10.4 11.7 11.4 10.5 11.4H6.2L3.3 13.6V11.4C2.8 11 2.5 10.2 2.5 9.2V5.2Z" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
    <circle className="icon-part-pop" cx="14.2" cy="13.5" r="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.55" />
    <path className="icon-part-pop" d="M12.5 13.5L13.7 14.7L16.1 12.2" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoardMatrixIcon: React.FC<IconProps> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <rect x="2.8" y="2.8" width="6.2" height="6.2" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
    <rect x="11" y="2.8" width="6.2" height="6.2" rx="1.6" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.55" />
    <rect x="2.8" y="11" width="6.2" height="6.2" rx="1.6" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.75" />
    <rect className="icon-part-pop" x="11" y="11" width="6.2" height="6.2" rx="1.6" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.6" />
    <path className="icon-part-pop" d="M12.6 14.2L13.7 15.3L15.7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StopwatchScaleIcon: React.FC<IconProps> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon icon-clock ${className}`} aria-hidden="true">
    <path d="M7.8 2.3H12.2M10 2.3V4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="11.2" r="6.6" stroke="currentColor" strokeWidth="1.6" />
    <path className="icon-part-hand" d="M10 7.6V11.2L12.6 12.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const UsersCheckIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="7.5" cy="6.5" r="2.8" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.6 15.8C2.6 13.3 4.8 11.6 7.5 11.6C10.2 11.6 12.4 13.3 12.4 15.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path className="icon-part-pop" d="M13.2 10.2L14.8 11.8L17.8 8.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlertGateIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeWidth="1.6" />
    <path className="icon-part-pop" d="M10 6.4V10.6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="10" cy="13.5" r="1" fill="currentColor" />
  </svg>
);

export const LayersOptionalIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M10 3.2L17.2 7L10 10.8L2.8 7L10 3.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path className="icon-part-slide" d="M2.8 10.6L10 14.4L17.2 10.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.8 14L10 17.6L17.2 14" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FlowBranchIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="5.5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="5.5" cy="15" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    <circle className="icon-part-pop" cx="14.5" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5.5 7.2V12.8M7.7 5H10.5C12.2 5 13.5 6.2 13.8 7.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const WireframeGridIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <rect x="2.6" y="3.4" width="14.8" height="13.2" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.6 7.4H17.4M8.5 7.4V16.6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ChartCompareIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M3 16.5H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="5" y="9" width="3.2" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect className="icon-part-pop" x="11.5" y="4.5" width="3.2" height="12" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const RadarSignalIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.55" strokeOpacity="0.55" />
    <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.55" />
    <circle className="icon-part-pop" cx="10" cy="10" r="1.5" fill="currentColor" />
    <path className="icon-part-hand" d="M10 10L15 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const FlaskHypothesisIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M7.5 3H12.5M8.5 3V7.6L4.3 14.5C3.7 15.5 4.4 16.8 5.6 16.8H14.4C15.6 16.8 16.3 15.5 15.7 14.5L11.5 7.6V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.2 12.6H13.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const CubeModuleIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M10 2.5L16.8 6.3V13.7L10 17.5L3.2 13.7V6.3L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3.2 6.3L10 10.1L16.8 6.3M10 10.1V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const PulseImpactIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path className="icon-part-slide" d="M2.5 10.5H6L8.3 5.2L11.5 15L13.8 10.5H17.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const KeystoneDefenseIcon: React.FC<IconProps> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M10 2.5L16.8 6.5L10 10.5L3.2 6.5L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M5.6 8.2V13.2C5.6 14.8 7.6 16.2 10 16.2C12.4 16.2 14.4 14.8 14.4 13.2V8.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const NotionDocIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <rect x="3.5" y="2.5" width="13" height="15" rx="2.4" stroke="currentColor" strokeWidth="1.65" />
    <path d="M7 6.8H13M7 10H13M7 13.2H10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const ShareLinkIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M8.2 11.8L11.8 8.2" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    <path d="M6.5 13.5L5.2 14.8C3.9 16.1 3.9 18.1 5.2 19.4" stroke="currentColor" strokeWidth="0" />
    <path d="M11 6.2L12.6 4.6C13.9 3.3 16 3.3 17.3 4.6C18.6 5.9 18.6 8 17.3 9.3L15.7 10.9" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    <path d="M9 13.8L7.4 15.4C6.1 16.7 4 16.7 2.7 15.4C1.4 14.1 1.4 12 2.7 10.7L4.3 9.1" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
  </svg>
);

export const SunDayIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="10" cy="10" r="3.8" stroke="currentColor" strokeWidth="1.65" />
    <path
      d="M10 2.2V4.2M10 15.8V17.8M2.2 10H4.2M15.8 10H17.8M4.5 4.5L5.9 5.9M14.1 14.1L15.5 15.5M15.5 4.5L14.1 5.9M5.9 14.1L4.5 15.5"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
    />
  </svg>
);

export const MoonNightIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path
      d="M16.4 11.8C15.3 15 11.9 16.9 8.5 16.2C5.1 15.5 2.8 12.4 3.1 8.9C3.4 5.5 6.1 2.9 9.5 2.7C8.4 4.3 8.2 6.4 9.1 8.2C10.1 10.2 12.2 11.5 14.5 11.5C15.1 11.5 15.8 11.6 16.4 11.8Z"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchFilterIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="9" cy="9" r="5.6" stroke="currentColor" strokeWidth="1.65" />
    <path d="M13.3 13.3L17 17" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
  </svg>
);

export const ArrowUpRightIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon icon-ext-arrow ${className}`} aria-hidden="true">
    <path
      d="M12.6 9.6V12.1C12.6 12.87 11.97 13.5 11.2 13.5H3.9C3.13 13.5 2.5 12.87 2.5 12.1V4.8C2.5 4.03 3.13 3.4 3.9 3.4H6.4"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      opacity="0.55"
    />
    <g className="icon-part-ne">
      <path
        d="M7.1 8.9L13.3 2.7M9.1 2.7H13.3V6.9"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <g className="icon-part-slide">
      <path
        d="M3 8H12.8M8.7 3.9L12.8 8L8.7 12.1"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path
      d="M12.8 8H3.2M7.2 4L3.2 8L7.2 12"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M4 6.2L8 10.2L12 6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M4 9.8L8 5.8L12 9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const OpticalLoupeIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="9" cy="9" r="5.8" stroke="currentColor" strokeWidth="1.65" />
    <path d="M9 6.5V11.5M6.5 9H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.4 13.4L17.2 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ExpandCornersIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path
      d="M2.8 6V2.8H6M10 2.8H13.2V6M13.2 10V13.2H10M6 13.2H2.8V10"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ResetRotateIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path
      d="M3.2 6.2A5.2 5.2 0 1 1 3.5 10.6M3.2 3V6.3H6.5"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseXIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M4.2 4.2L11.8 11.8M11.8 4.2L4.2 11.8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export const CheckMiniIcon: React.FC<IconProps> = ({ size = 12, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path d="M3.2 8.3L6.4 11.5L12.8 4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HalfCircleMiniIcon: React.FC<IconProps> = ({ size = 12, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.65" />
    <path d="M8 2.5A5.5 5.5 0 0 1 8 13.5V2.5Z" fill="currentColor" />
  </svg>
);

export const EmptyCircleMiniIcon: React.FC<IconProps> = ({ size = 12, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.65" strokeDasharray="2.4 2.2" />
  </svg>
);

export const CourseBriefIcon: React.FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={`p-icon ${className}`} aria-hidden="true">
    <path
      d="M4 3.5C4 2.8 4.6 2.2 5.3 2.2H12.2L16 6V16.5C16 17.2 15.4 17.8 14.7 17.8H5.3C4.6 17.8 4 17.2 4 16.5V3.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M11.8 2.4V6.2H15.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="11.6" r="2.4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const PhaseBadgeIcon: React.FC<{ phase: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5'; size?: number }> = ({
  phase,
  size = 15
}) => {
  switch (phase) {
    case 'Q1':
      return <RadarSignalIcon size={size} />;
    case 'Q2':
      return <FlaskHypothesisIcon size={size} />;
    case 'Q3':
      return <CubeModuleIcon size={size} />;
    case 'Q4':
      return <PulseImpactIcon size={size} />;
    case 'Q5':
      return <KeystoneDefenseIcon size={size} />;
  }
};
