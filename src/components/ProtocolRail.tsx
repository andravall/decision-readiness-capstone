import React from 'react';
import { AuditEntry, ProtocolStatusKey } from '../domain/types';
import { useLanguage } from '../i18n/LanguageContext';

interface ProtocolRailProps {
  status: ProtocolStatusKey;
  history: AuditEntry[];
  persistentMode?: boolean;
}

export const ProtocolRail: React.FC<ProtocolRailProps> = ({ status, history, persistentMode }) => {
  const { locale, t } = useLanguage();

  const steps: { key: ProtocolStatusKey; num: string; label: string; shortLabel: string }[] = [
    {
      key: 'proposal',
      num: '01',
      label: t.protocolSteps.s1,
      shortLabel: locale === 'id' ? 'Usulan' : 'Proposed'
    },
    {
      key: 'provisional',
      num: '02',
      label: t.protocolSteps.s2,
      shortLabel: locale === 'id' ? 'Sementara' : 'Provisional'
    },
    {
      key: 'final',
      num: '03',
      label: t.protocolSteps.s3,
      shortLabel: 'Final'
    }
  ];

  const hadProvisional = history.some((h) => h.kind === 'protocol_provisional');

  return (
    <div className="protocol-rail" aria-label="Confirmation Protocol stages">
      <div className="protocol-steps">
        {steps.map((step, idx) => {
          let cls = 'p-step';
          if (status === step.key) {
            const tone =
              step.key === 'final' ? ' tone-good' : step.key === 'provisional' ? ' tone-warn' : '';
            cls += ` is-active${tone}`;
          } else if (
            (step.key === 'proposal' && status !== 'proposal') ||
            (step.key === 'provisional' &&
              (status === 'final' || status === 'needs_review') &&
              hadProvisional) ||
            (step.key === 'final' && status === 'needs_review')
          ) {
            cls += ' is-done';
          }

          return (
            <React.Fragment key={step.key}>
              <span className={cls}>
                <span className="p-step-num">{step.num}</span>
                <span className="hide-mobile">{step.label}</span>
                <span className="mobile-only-label">{step.shortLabel}</span>
              </span>
              {idx < steps.length - 1 && <span className="p-connector" aria-hidden="true" />}
            </React.Fragment>
          );
        })}

        {status === 'needs_review' && (
          <>
            <span className="p-connector" aria-hidden="true" />
            <span className="p-step is-active tone-alert">
              <span className="p-step-num">!</span>
              <span>{t.protocolSteps.drift}</span>
            </span>
          </>
        )}
      </div>
      <span className="diag-label hide-mobile">
        {persistentMode ? t.protocolSteps.persistentNote : t.protocolSteps.agencyNote}
      </span>
    </div>
  );
};
