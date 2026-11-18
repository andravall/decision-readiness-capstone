import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRightIcon } from './ProjectIcons';

interface MobileDecisionDockProps {
  readyCount: number;
  requiredTotal: number;
  statusLabel: string;
  subtext: string;
  ctaLabel: string;
  onJump: () => void;
}

export const MobileDecisionDock: React.FC<MobileDecisionDockProps> = ({
  readyCount,
  requiredTotal,
  statusLabel,
  subtext,
  ctaLabel,
  onJump
}) => {
  const { locale } = useLanguage();
  const pct = requiredTotal > 0 ? Math.round((readyCount / requiredTotal) * 100) : 0;
  const isComplete = requiredTotal > 0 && readyCount >= requiredTotal;
  const r = 13.5;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const compactHeadline =
    locale === 'id'
      ? `${statusLabel} · ${readyCount}/${requiredTotal} wajib`
      : `${statusLabel} · ${readyCount}/${requiredTotal} req.`;

  return (
    <div className={`mobile-dock${isComplete ? ' is-ready' : ''}`} aria-label="Mobile quick summary">
      <div className="mobile-dock-left">
        <div className="mobile-dock-ring" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 34 34">
            <circle
              className="mobile-dock-ring-track"
              cx="17"
              cy="17"
              r={r}
              fill="none"
              strokeWidth="3.2"
            />
            <circle
              className={`mobile-dock-ring-fill${isComplete ? ' is-complete' : ''}`}
              cx="17"
              cy="17"
              r={r}
              fill="none"
              strokeWidth="3.2"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <span className="mobile-dock-ring-num">
            {readyCount}/{requiredTotal}
          </span>
        </div>

        <div className="mobile-dock-info">
          <span className="mobile-dock-ratio">{compactHeadline}</span>
          <span className="mobile-dock-sub">{subtext}</span>
        </div>
      </div>

      <button
        type="button"
        className="btn primary btn-sm mobile-dock-btn interactive-icon-trigger"
        onClick={onJump}
        data-testid="mobile-dock-cta"
      >
        <span>{ctaLabel}</span>
        <ArrowRightIcon size={12} />
      </button>
    </div>
  );
};
