import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DiagramLightbox } from '../components/DiagramLightbox';
import { TopNavbar } from '../components/TopNavbar';
import { useLanguage } from '../i18n/LanguageContext';
import { VisualArtifactItem } from '../i18n/translations';

export const HubPage: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activeVisualIdx, setActiveVisualIdx] = useState(0);
  const [activePhase, setActivePhase] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5'>('ALL');
  const [stateFilter, setStateFilter] = useState<'all' | 'done' | 'upcoming'>('all');
  const [lightboxItem, setLightboxItem] = useState<VisualArtifactItem | null>(null);
  const [copiedRoute, setCopiedRoute] = useState<'q303' | 'q304' | null>(null);

  const currentVisual = t.hub.visuals[activeVisualIdx] || t.hub.visuals[0];

  const allQuests = t.hub.quests;
  const countByPhase = (ph: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5') =>
    allQuests.filter((q) => q.phase === ph).length;

  const doneCount = allQuests.filter((q) => q.completed).length;
  const upcomingCount = allQuests.filter((q) => !q.completed).length;
  const submittedNotionCount = allQuests.filter((q) =>
    q.links?.some((l) => l.kind === 'submission')
  ).length;
  const liveWebCount = allQuests.filter((q) =>
    q.links?.some((l) => l.kind === 'internal')
  ).length;

  const filteredQuests = allQuests.filter((q) => {
    const matchPhase = activePhase === 'ALL' || q.phase === activePhase;
    const matchState =
      stateFilter === 'all' ||
      (stateFilter === 'done' && q.completed) ||
      (stateFilter === 'upcoming' && !q.completed);
    return matchPhase && matchState;
  });

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

  const submittedPct = Math.round((submittedNotionCount / allQuests.length) * 100);
  const liveWebPct = Math.round((liveWebCount / allQuests.length) * 100);

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
        {/* 00 // ARCHITECTURAL EDITORIAL MASTHEAD */}
        <section className="hub-masthead" aria-labelledby="hub-title">
          <div className="hub-masthead-grid">
            <div className="hub-hero-copy">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-dot" aria-hidden="true" />
                  <span>{t.hub.eyebrow}</span>
                </p>
                <h1 className="hub-display-title" id="hub-title">
                  {t.hub.heroTitle}
                </h1>
                <p className="hub-lead">{t.hub.heroLead}</p>
              </div>

              <div className="author-ledger" aria-label="Project authorship">
                <div className="author-cell">
                  <span className="author-cell-key">
                    {locale === 'id' ? 'Penyusun' : 'Author'}
                  </span>
                  <span className="author-cell-val">M. Ferdinand Valliandra</span>
                </div>
                <div className="author-cell">
                  <span className="author-cell-key">NRP · Kelas</span>
                  <span className="author-cell-val" style={{ fontFamily: 'var(--font-mono)' }}>
                    5026231159 · SI-A
                  </span>
                </div>
                <div className="author-cell">
                  <span className="author-cell-key">
                    {locale === 'id' ? 'Kepengarangan' : 'Authorship'}
                  </span>
                  <span className="author-cell-val">
                    {locale === 'id'
                      ? 'Q1.02 Tim · Q1.03+ Individu'
                      : 'Q1.02 Pair · Q1.03+ Solo'}
                  </span>
                </div>
              </div>
            </div>

            <aside className="hub-thesis-panel" aria-label={t.hub.questionLabel}>
              <div>
                <div className="thesis-index-bar">
                  <span>00 // {t.hub.questionLabel}</span>
                  <span>WHATSAPP COORDINATION</span>
                </div>
                <blockquote className="thesis-quote">{t.hub.questionQuote}</blockquote>
                <p className="thesis-body">
                  <strong>{t.hub.candidateSummaryLabel}</strong> {t.hub.candidateSummaryBody}
                </p>
              </div>

              <div className="thesis-mini-flow" aria-label="Confirmation Protocol stages">
                <div className="thesis-flow-chip">
                  <span className="thesis-flow-num">01 · OPEN</span>
                  <span className="thesis-flow-label">
                    {locale === 'id' ? 'Usulan waktu' : 'Time proposal'}
                  </span>
                </div>
                <div className="thesis-flow-chip">
                  <span className="thesis-flow-num">02 · CLARIFY</span>
                  <span className="thesis-flow-label">
                    {locale === 'id' ? 'Sementara' : 'Provisional'}
                  </span>
                </div>
                <div className="thesis-flow-chip">
                  <span className="thesis-flow-num">03 · LOCK</span>
                  <span className="thesis-flow-label">
                    {locale === 'id' ? 'Final sadar' : 'Coordinator final'}
                  </span>
                </div>
              </div>
            </aside>
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

        {/* 01 // ISOLATED WORKSPACES */}
        <div className="section-head" id="routes">
          <div>
            <span className="section-coord">01 // {t.hub.routesEyebrow}</span>
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
              <div className="route-bar">
                <span>/q3-03</span>
                <button
                  type="button"
                  className="route-copy-inline"
                  onClick={() => handleCopyLink('/q3-03', 'q303')}
                >
                  {copiedRoute === 'q303' ? t.hub.cardQ303Copied : t.hub.cardQ303CopyBtn}
                </button>
              </div>
            </div>
            <Link className="btn obsidian btn-full" to="/q3-03">
              {t.hub.cardQ303OpenBtn} →
            </Link>
          </article>

          <article className="dock-card featured-green">
            <div>
              <span className="pill good">{t.hub.cardQ304Pill}</span>
              <h3>{t.hub.cardQ304Title}</h3>
              <p>{t.hub.cardQ304Body}</p>
              <div className="route-bar">
                <span>/q3-04-core</span>
                <button
                  type="button"
                  className="route-copy-inline"
                  onClick={() => handleCopyLink('/q3-04-core', 'q304')}
                >
                  {copiedRoute === 'q304' ? t.hub.cardQ304Copied : t.hub.cardQ304CopyBtn}
                </button>
              </div>
            </div>
            <Link className="btn primary btn-full" to="/q3-04-core">
              {t.hub.cardQ304OpenBtn} →
            </Link>
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

        {/* 02 // MASTER-DETAIL BLUEPRINT STUDIO */}
        <div className="section-head" id="visuals">
          <div>
            <span className="section-coord">02 // {t.hub.visualsEyebrow}</span>
            <h2>{t.hub.visualsTitle}</h2>
            <p>{t.hub.visualsSub}</p>
          </div>
        </div>

        <section className="blueprint-studio" aria-label={t.hub.visualsTitle}>
          <div className="blueprint-rail" role="tablist">
            {t.hub.visuals.map((v, idx) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={idx === activeVisualIdx}
                className={`blueprint-rail-btn${idx === activeVisualIdx ? ' is-active' : ''}`}
                onClick={() => setActiveVisualIdx(idx)}
              >
                <span className="blueprint-rail-idx">{String(idx + 1).padStart(2, '0')}</span>
                <span className="blueprint-rail-label">{v.tab}</span>
              </button>
            ))}
          </div>

          <div className="blueprint-stage">
            <div className="visual-stage-head">
              <div>
                <strong style={{ display: 'block', fontSize: '15px', letterSpacing: '-0.015em' }}>
                  {currentVisual.title}
                </strong>
                <span style={{ fontSize: '12.5px', color: 'var(--ink-muted)' }}>
                  {currentVisual.caption}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-sm diagram-preview-trigger"
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

        {/* 03 // COMPLETE CAPSTONE JOURNEY, SUBMISSIONS & CURRICULUM ROADMAP */}
        <div className="section-head" id="trail">
          <div>
            <span className="section-coord">03 // {t.hub.trailEyebrow}</span>
            <h2>{t.hub.trailTitle}</h2>
            <p>{t.hub.trailSub}</p>
          </div>
          <a
            className="btn btn-sm"
            href="https://idits.notion.site/ebd//374333dd1d2880d78769c73a477ba254"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hub.coursePortalBtn}
          </a>
        </div>

        {/* Semester Progress Telemetry */}
        <div className="trail-telemetry">
          <div className="trail-telemetry-top">
            <div className="trail-stats">
              <span className="trail-stat-item">
                <span className="trail-stat-dot good" aria-hidden="true" />
                <span>{t.hub.telemetrySubmitted(submittedNotionCount)}</span>
              </span>
              <span className="trail-stat-item">
                <span className="trail-stat-dot accent" aria-hidden="true" />
                <span>{t.hub.telemetryActiveWeb(liveWebCount)}</span>
              </span>
              <span className="trail-stat-item">
                <span className="trail-stat-dot upcoming" aria-hidden="true" />
                <span>{t.hub.telemetryUpcoming(upcomingCount)}</span>
              </span>
            </div>
            <span className="diag-label">
              {doneCount} / {allQuests.length} {locale === 'id' ? 'TAHAP AKTIF/SELESAI' : 'COMPLETED / ACTIVE'}
            </span>
          </div>

          <div className="trail-progress-track" aria-hidden="true">
            <div className="trail-progress-seg good" style={{ width: `${submittedPct}%` }} />
            <div className="trail-progress-seg accent" style={{ width: `${liveWebPct}%` }} />
          </div>

          <p className="trail-perm-note">{t.hub.notionPermNote}</p>
        </div>

        {/* Phase & Status Dual Filters */}
        <div className="trail-controls">
          <div className="scroll-tabs-wrap" style={{ flex: '1 1 auto' }}>
            <div className="segmented-strip" role="group" aria-label="Filter by Quest phase">
              {(
                [
                  { key: 'ALL', label: t.hub.filterAll(allQuests.length) },
                  { key: 'Q1', label: t.hub.filterQ1(countByPhase('Q1')) },
                  { key: 'Q2', label: t.hub.filterQ2(countByPhase('Q2')) },
                  { key: 'Q3', label: t.hub.filterQ3(countByPhase('Q3')) },
                  { key: 'Q4', label: t.hub.filterQ4(countByPhase('Q4')) },
                  { key: 'Q5', label: t.hub.filterQ5(countByPhase('Q5')) }
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

          <div className="scroll-tabs-wrap">
            <div className="state-switch" role="group" aria-label="Filter by completion status">
              <button
                type="button"
                className={`state-switch-btn${stateFilter === 'all' ? ' is-active' : ''}`}
                onClick={() => setStateFilter('all')}
              >
                {t.hub.stateFilterAll}
              </button>
              <button
                type="button"
                className={`state-switch-btn${stateFilter === 'done' ? ' is-active' : ''}`}
                onClick={() => setStateFilter('done')}
              >
                {t.hub.stateFilterDone(doneCount)}
              </button>
              <button
                type="button"
                className={`state-switch-btn${stateFilter === 'upcoming' ? ' is-active' : ''}`}
                onClick={() => setStateFilter('upcoming')}
              >
                {t.hub.stateFilterUpcoming(upcomingCount)}
              </button>
            </div>
          </div>
        </div>

        <section className="trail-grid" aria-live="polite">
          {filteredQuests.map((q) => {
            const spineCls = !q.completed
              ? ' is-upcoming'
              : q.tone === 'accent'
                ? ' tone-spine-accent'
                : q.tone === 'warn'
                  ? ' tone-spine-warn'
                  : '';

            return (
              <article key={q.code + q.challengeName} className={`quest-card${spineCls}`}>
                <div className="quest-top">
                  <div className="quest-code-wrap">
                    <span className="quest-code">{q.code}</span>
                    <span className="quest-challenge">· {q.challengeName}</span>
                  </div>
                  <span className={`pill ${q.tone}`}>{q.status}</span>
                </div>

                <h3>{q.title}</h3>
                <div className="quest-deliverable">{q.deliverable}</div>
                <p className="quest-summary">{q.summary}</p>

                {q.links && q.links.length > 0 && (
                  <div className="quest-links">
                    {q.links.map((lnk) =>
                      lnk.kind === 'internal' ? (
                        <Link
                          key={lnk.href}
                          to={lnk.href}
                          className="quest-link-btn kind-internal"
                        >
                          {lnk.label}
                        </Link>
                      ) : (
                        <a
                          key={lnk.href}
                          href={lnk.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`quest-link-btn kind-${lnk.kind}`}
                        >
                          {lnk.label}
                        </a>
                      )
                    )}
                  </div>
                )}

                <div className="quest-boundary">{q.boundary}</div>
              </article>
            );
          })}
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
