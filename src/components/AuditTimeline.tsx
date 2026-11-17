import React from 'react';
import { AuditEntry } from '../domain/types';
import { useLanguage } from '../i18n/LanguageContext';

export const AuditTimeline: React.FC<{ history: AuditEntry[] }> = ({ history }) => {
  const { t } = useLanguage();

  return (
    <section className="card history-card" aria-labelledby="history-heading">
      <div className="history-head">
        <h2 id="history-heading">{t.common.historyTitle}</h2>
        <span className="diag-label">{t.common.recordsCount(history.length)}</span>
      </div>

      {history.length === 0 ? (
        <p className="history-empty">{t.common.historyEmpty}</p>
      ) : (
        <ol className="history-list">
          {history.map((item) => (
            <li key={item.id} className="history-item">
              <span className={`history-dot ${item.tone}`} aria-hidden="true" />
              <div className="history-meta">
                <time>{item.at}</time>
                <span className="history-kind">{t.workbench.auditKindLabels[item.kind]}</span>
              </div>
              <div>{t.workbench.formatAuditText(item, t)}</div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};
