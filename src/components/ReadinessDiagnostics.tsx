import React from 'react';
import { RESPONSE_TONES, ReadinessEvaluation } from '../domain/readiness';
import { handleSpotlightMove } from '../hooks/useExperienceEffects';
import { useLanguage } from '../i18n/LanguageContext';
import {
  AlertGateIcon,
  LayersOptionalIcon,
  ShieldLockIcon,
  UsersCheckIcon
} from './ProjectIcons';

interface ReadinessDiagnosticsProps {
  evaluation: ReadinessEvaluation;
  totalMembers: number;
}

export const ReadinessDiagnostics: React.FC<ReadinessDiagnosticsProps> = ({
  evaluation,
  totalMembers
}) => {
  const { t } = useLanguage();
  const { requiredMembers, optionalMembers, pendingRequired, readyCount, canFinalize } = evaluation;

  const optSummary = optionalMembers.length
    ? optionalMembers.map((m) => `${m.name} (${t.responses[m.response].short})`).join(', ')
    : t.common.noOptionalMsg;

  const pct =
    requiredMembers.length > 0 ? Math.round((readyCount / requiredMembers.length) * 100) : 0;

  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <section className="diagnostics" aria-label={t.common.readinessTitle} aria-live="polite">
      <div
        className="diag-card spotlight-card interactive-icon-trigger"
        onPointerMove={handleSpotlightMove}
      >
        <div className="diag-ring-layout">
          <div className="diag-ring-copy">
            <div className="diag-head">
              <span className="diag-label-with-icon">
                <span className={`icon-chip ${canFinalize ? 'tone-good' : 'tone-accent'}`}>
                  <UsersCheckIcon size={14} />
                </span>
                <span className="diag-label">{t.common.readinessTitle}</span>
              </span>
              <span className="diag-label">{t.common.ruleTarget(requiredMembers.length)}</span>
            </div>
            <div className="diag-metric">
              <strong data-testid="ready-ratio">
                {readyCount} / {requiredMembers.length}
              </strong>
              <span>{t.common.requiredConfirmedSuffix}</span>
            </div>
          </div>

          <div className="radial-gauge" aria-hidden="true">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <circle
                className="radial-gauge-track"
                cx="26"
                cy="26"
                r={radius}
                fill="none"
                strokeWidth="4.5"
              />
              <circle
                className={`radial-gauge-fill${canFinalize ? ' is-complete' : ''}`}
                cx="26"
                cy="26"
                r={radius}
                fill="none"
                strokeWidth="4.5"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="radial-gauge-pct">{pct}%</span>
          </div>
        </div>

        <div className="req-segments">
          {requiredMembers.map((m) => {
            const tone = RESPONSE_TONES[m.response];
            const sym =
              tone === 'good' ? '✓' : tone === 'alert' ? '✕' : tone === 'warn' ? '◐' : '○';
            return (
              <div
                key={m.id}
                className={`req-seg seg-${tone}`}
                title={`${m.name}: ${t.responses[m.response].label}`}
              >
                <span className="req-seg-name">{m.name}</span>
                <span aria-hidden="true">{sym}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="diag-card spotlight-card interactive-icon-trigger"
        onPointerMove={handleSpotlightMove}
      >
        <div>
          <div className="diag-head">
            <span className="diag-label-with-icon">
              <span className={`icon-chip ${canFinalize ? 'tone-good' : 'tone-warn'}`}>
                {canFinalize ? <ShieldLockIcon size={14} /> : <AlertGateIcon size={14} />}
              </span>
              <span className="diag-label">{t.common.blockersTitle}</span>
            </span>
            <span className="diag-label">
              {canFinalize ? t.common.zeroPending : t.common.pendingCountLabel(pendingRequired.length)}
            </span>
          </div>
          <div className="diag-metric">
            <strong>
              {canFinalize
                ? t.common.readyToReviewMetric
                : t.common.peopleCountMetric(pendingRequired.length)}
            </strong>
            <span>{canFinalize ? t.common.ruleMetSub : t.common.blockingFinalSub}</span>
          </div>
        </div>
        {canFinalize ? (
          <p className="diag-subtext" style={{ color: 'var(--good-ink)', fontWeight: 600 }}>
            {t.common.noBlockersMsg}
          </p>
        ) : (
          <div className="blocker-chips">
            {pendingRequired.map((m) => {
              const tone = RESPONSE_TONES[m.response];
              return (
                <span
                  key={m.id}
                  className={`blocker-chip${tone === 'alert' ? ' is-alert' : ''}`}
                >
                  {m.name} · {t.responses[m.response].label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div
        className="diag-card spotlight-card interactive-icon-trigger"
        onPointerMove={handleSpotlightMove}
      >
        <div>
          <div className="diag-head">
            <span className="diag-label-with-icon">
              <span className="icon-chip tone-neutral">
                <LayersOptionalIcon size={14} />
              </span>
              <span className="diag-label">{t.common.optionalTitle}</span>
            </span>
            <span className="diag-label">{t.common.membersCount(totalMembers)}</span>
          </div>
          <div className="diag-metric">
            <strong>{t.common.optionalCountMetric(optionalMembers.length)}</strong>
            <span>{t.common.notBlockingSub}</span>
          </div>
        </div>
        <p className="diag-subtext">{optSummary}</p>
      </div>
    </section>
  );
};
