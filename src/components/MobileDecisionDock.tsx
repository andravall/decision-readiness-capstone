import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="mobile-dock" aria-label="Mobile quick summary">
      <div className="mobile-dock-info">
        <span className="mobile-dock-ratio">
          {t.common.mobileConfirmedShort(readyCount, requiredTotal, statusLabel)}
        </span>
        <span className="mobile-dock-sub">{subtext}</span>
      </div>
      <button type="button" className="btn primary btn-sm" onClick={onJump} data-testid="mobile-dock-cta">
        {ctaLabel}
      </button>
    </div>
  );
};
