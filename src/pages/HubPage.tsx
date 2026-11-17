import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DiagramLightbox } from '../components/DiagramLightbox';
import { TopNavbar } from '../components/TopNavbar';
import { useLanguage } from '../i18n/LanguageContext';
import { VisualArtifactItem } from '../i18n/translations';

export const HubPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeVisualIdx, setActiveVisualIdx] = useState(0);
  const [activePhase, setActivePhase] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q3+'>('ALL');
  const [lightboxItem, setLightboxItem] = useState<VisualArtifactItem | null>(null);
  const [copiedRoute, setCopiedRoute] = useState<'q303' | 'q304' | null>(null);

  const currentVisual = t.hub.visuals[activeVisualIdx] || t.hub.visuals[0];
  const filteredQuests =
    activePhase === 'ALL'
      ? t.hub.quests
      : t.hub.quests.filter((q) => q.phase === activePhase);

  const handleCopyLink = (path: string, which: 'q303' | 'q304') => {
    const fullUrl = `${window.location.origin}${path}`;
    const finish = () => {
      setCopiedRoute(which);
      setTimeout(() => setCopiedRoute(null), 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(fullUrl).then(finish).catch(finish);
    } else {
      finish();
    }
  };

  return (
    <>
      <TopNavbar
        mode="hub"
        rightSlot={
          <Link className="btn primary btn-sm" to="/q3-04-core">
            {t.nav.openMvpCta}
          </Link>
        }
      />

      <main className="container workspace" id="top">
        <section className="hero-shell" aria-labelledby="hub-title">
          <div
            className="hero-main"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '28px'
            }}
          >
            <div>
              <p className="eyebrow">{t.hub.eyebrow}</p>
              <h1 className="hero-title" id="hub-title">
                {t.hub.heroTitle}
              </h1>
              <p className="hero-lead">{t.hub.heroLead}</p>
              <div className="meta-strip">
                <span className="meta-chip">
                  <strong>{t.hub.authorChipLabel}</strong> Mohammad Ferdinand Valliandra (Andra)
                </span>
                <span className="meta-chip">
                  <strong>NRP:</strong> 5026231159
                </span>
                <span className="meta-chip">{t.hub.workModeChip}</span>
              </div>
            </div>

            <div
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--line)',
                borderLeft: '3.5px solid var(--accent)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 22px'
              }}
            >
              <span className="diag-label">{t.hub.questionLabel}</span>
              <blockquote
                style={{
                  margin: '8px 0 12px',
                  font: '700 16.5px/1.4 var(--font-sans)',
                  letterSpacing: '-0.018em'
                }}
              >
                {t.hub.questionQuote}
              </blockquote>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--ink-secondary)' }}>
                <strong>{t.hub.candidateSummaryLabel}</strong> {t.hub.candidateSummaryBody}
              </p>
            </div>
          </div>

          <div className="epistemic-strip">
            <div className="ep-cell">
              <span className="diag-label">{t.hub.ep1Label}</span>
              <span className="ep-value">{t.hub.ep1Val}</span>
              <span className="diag-subtext">{t.hub.ep1Note}</span>
            </div>
            <div className="ep-cell">
              <span className="diag-label">{t.hub.ep2Label}</span>
              <span className="ep-value">{t.hub.ep2Val}</span>
              <span className="diag-subtext">{t.hub.ep2Note}</span>
            </div>
            <div className="ep-cell">
              <span className="diag-label">{t.hub.ep3Label}</span>
              <span className="ep-value">{t.hub.ep3Val}</span>
              <span className="diag-subtext">{t.hub.ep3Note}</span>
            </div>
            <div className="ep-cell">
              <span className="diag-label">{t.hub.ep4Label}</span>
              <span className="ep-value">{t.hub.ep4Val}</span>
              <span className="diag-subtext">{t.hub.ep4Note}</span>
            </div>
          </div>
        </section>

        <div className="section-head" id="routes">
          <div>
            <p className="eyebrow" style={{ marginBottom: '4px' }}>
              {t.hub.routesEyebrow}
            </p>
            <h2>{t.hub.routesTitle}</h2>
            <p>{t.hub.routesSub}</p>
          </div>
        </div>

        <section className="dock-grid" aria-label={t.hub.routesTitle}>
          <article className="dock-card featured-blue">
            <div>
              <span className="pill accent">{t.hub.cardQ303Pill}</span>
              <h3>{t.hub.cardQ303Title}</h3>
              <p>{t.hub.cardQ303Body}</p>
              <span className="route-code">{t.hub.cardQ303RouteLabel}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Link className="btn primary" to="/q3-03">
                {t.hub.cardQ303OpenBtn}
              </Link>
              <button
                type="button"
                className="btn"
                onClick={() => handleCopyLink('/q3-03', 'q303')}
              >
                {copiedRoute === 'q303' ? t.hub.cardQ303Copied : t.hub.cardQ303CopyBtn}
              </button>
            </div>
          </article>

          <article className="dock-card featured-green">
            <div>
              <span className="pill good">{t.hub.cardQ304Pill}</span>
              <h3>{t.hub.cardQ304Title}</h3>
              <p>{t.hub.cardQ304Body}</p>
              <span className="route-code">{t.hub.cardQ304RouteLabel}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Link className="btn primary" to="/q3-04-core">
                {t.hub.cardQ304OpenBtn}
              </Link>
              <button
                type="button"
                className="btn"
                onClick={() => handleCopyLink('/q3-04-core', 'q304')}
              >
                {copiedRoute === 'q304' ? t.hub.cardQ304Copied : t.hub.cardQ304CopyBtn}
              </button>
            </div>
          </article>

          <article className="dock-card">
            <div>
              <span className="pill">{t.hub.cardArchivePill}</span>
              <h3>{t.hub.cardArchiveTitle}</h3>
              <p>{t.hub.cardArchiveBody}</p>
              <ul className="version-list">
                <li>
                  <span>{t.hub.v1Label}</span>
                  <a href="/arsip/q3-03-v1/index.html">{t.hub.v1Open}</a>
                </li>
                <li>
                  <span>{t.hub.v2Label}</span>
                  <a href="/arsip/q3-03-v2/index.html">{t.hub.v2Open}</a>
                </li>
                <li>
                  <span>{t.hub.vAgyLabel}</span>
                  <Link to="/q3-03">{t.hub.vAgyOpen}</Link>
                </li>
              </ul>
            </div>
          </article>
        </section>

        <div className="section-head" id="visuals">
          <div>
            <p className="eyebrow" style={{ marginBottom: '4px' }}>
              {t.hub.visualsEyebrow}
            </p>
            <h2>{t.hub.visualsTitle}</h2>
            <p>{t.hub.visualsSub}</p>
          </div>
        </div>

        <section aria-label={t.hub.visualsTitle}>
          <div className="scroll-tabs-wrap">
            <div className="segmented-strip" role="tablist">
              {t.hub.visuals.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeVisualIdx}
                  className={`tab-btn${idx === activeVisualIdx ? ' is-active' : ''}`}
                  onClick={() => setActiveVisualIdx(idx)}
                >
                  {v.tab}
                </button>
              ))}
            </div>
          </div>

          <div className="visual-stage">
            <div className="visual-stage-head">
              <div>
                <strong style={{ display: 'block', fontSize: '15px' }}>
                  {currentVisual.title}
                </strong>
                <span style={{ fontSize: '12.5px', color: 'var(--ink-muted)' }}>
                  {currentVisual.caption}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setLightboxItem(currentVisual)}
                >
                  {t.hub.expandBtn}
                </button>
                <a
                  className="btn btn-sm"
                  href={currentVisual.svg}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.hub.svgVectorBtn}
                </a>
              </div>
            </div>

            <div className="visual-frame">
              <img
                src={currentVisual.png}
                alt={currentVisual.title}
                onClick={() => setLightboxItem(currentVisual)}
              />
            </div>
            <div className="mobile-zoom-hint">{t.hub.mobileTapZoomHint}</div>
          </div>
        </section>

        <div className="section-head" id="trail">
          <div>
            <p className="eyebrow" style={{ marginBottom: '4px' }}>
              {t.hub.trailEyebrow}
            </p>
            <h2>{t.hub.trailTitle}</h2>
            <p>{t.hub.trailSub}</p>
          </div>
          <div className="scroll-tabs-wrap" style={{ marginBottom: 0 }}>
            <div className="segmented-strip" role="group">
              {(
                [
                  { key: 'ALL', label: t.hub.filterAll(t.hub.quests.length) },
                  { key: 'Q1', label: t.hub.filterQ1 },
                  { key: 'Q2', label: t.hub.filterQ2 },
                  { key: 'Q3', label: t.hub.filterQ3 },
                  { key: 'Q3+', label: t.hub.filterNext }
                ] as const
              ).map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`tab-btn${activePhase === f.key ? ' is-active' : ''}`}
                  onClick={() => setActivePhase(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="trail-grid" aria-live="polite">
          {filteredQuests.map((q) => (
            <article key={q.code} className="quest-card">
              <div className="quest-top">
                <span className="quest-code">{q.code}</span>
                <span className={`pill ${q.tone}`}>{q.status}</span>
              </div>
              <h3>{q.title}</h3>
              <p className="quest-summary">{q.summary}</p>
              <div className="quest-boundary">{q.boundary}</div>
            </article>
          ))}
        </section>

        <footer className="workspace-footer">
          <span>{t.hub.footerLeft}</span>
          <span>{t.hub.footerRight}</span>
        </footer>
      </main>

      <DiagramLightbox artifact={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
};
