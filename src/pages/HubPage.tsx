import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DiagramLightbox } from '../components/DiagramLightbox';
import {
  BoardMatrixIcon,
  CalendarProposalIcon,
  ChartCompareIcon,
  ChatClarifyIcon,
  ChatVsCommitIcon,
  CompassHubIcon,
  CoreDatabaseCheckIcon,
  FlowBranchIcon,
  NotionDocIcon,
  PhaseBadgeIcon,
  PrototypeCursorIcon,
  PulseImpactIcon,
  ShareLinkIcon,
  ShieldLockIcon,
  StopwatchScaleIcon,
  UsersCheckIcon,
  WireframeGridIcon
} from '../components/ProjectIcons';
import { TopNavbar } from '../components/TopNavbar';
import { handleSpotlightMove } from '../hooks/useExperienceEffects';
import { useLanguage } from '../i18n/LanguageContext';
import { VisualArtifactItem } from '../i18n/translations';

export const HubPage: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activeVisualIdx, setActiveVisualIdx] = useState(0);
  const [activePhase, setActivePhase] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5'>('ALL');
  const [stateFilter, setStateFilter] = useState<'all' | 'done' | 'upcoming'>('all');
  const [heroStageIdx, setHeroStageIdx] = useState<0 | 1 | 2>(0);
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

  const heroProtocolStages =
    locale === 'id'
      ? [
          {
            num: '01 · OPEN',
            label: 'Usulan waktu',
            icon: <CalendarProposalIcon size={15} />,
            badge: '1/3 Wajib Pasti',
            badgeTone: 'neutral',
            members: [
              { name: 'Alya', state: '✓ Pasti', cls: 'good' },
              { name: 'Bima', state: '○ Belum', cls: 'muted' },
              { name: 'Citra', state: '◐ Tentatif', cls: 'warn' }
            ],
            rule: 'Usulan waktu dibuka; papan kesiapan langsung menyorot anggota wajib yang belum membalas atau masih tentatif.'
          },
          {
            num: '02 · CLARIFY',
            label: 'Sementara',
            icon: <ChatClarifyIcon size={15} />,
            badge: 'Klarifikasi WA',
            badgeTone: 'warn',
            members: [
              { name: 'Alya', state: '✓ Pasti', cls: 'good' },
              { name: 'Bima', state: '💬 Ditanya', cls: 'accent' },
              { name: 'Citra', state: '✓ Pasti', cls: 'good' }
            ],
            rule: 'Selama syarat wajib hadir belum utuh, status ditahan Sementara dan klarifikasi terarah dikirim ke WhatsApp.'
          },
          {
            num: '03 · LOCK',
            label: 'Final sadar',
            icon: <ShieldLockIcon size={15} />,
            badge: '3/3 Terkunci',
            badgeTone: 'good',
            members: [
              { name: 'Alya', state: '✓ Pasti', cls: 'good' },
              { name: 'Bima', state: '✓ Pasti', cls: 'good' },
              { name: 'Citra', state: '✓ Pasti', cls: 'good' }
            ],
            rule: 'Saat seluruh anggota wajib menyatakan pasti, koordinator menetapkan status Final beserta alasan tertulis.'
          }
        ]
      : [
          {
            num: '01 · OPEN',
            label: 'Time proposal',
            icon: <CalendarProposalIcon size={15} />,
            badge: '1/3 Confirmed',
            badgeTone: 'neutral',
            members: [
              { name: 'Alya', state: '✓ Certain', cls: 'good' },
              { name: 'Bima', state: '○ No reply', cls: 'muted' },
              { name: 'Citra', state: '◐ Tentative', cls: 'warn' }
            ],
            rule: 'Time slot opens; the readiness board immediately highlights unanswered or tentative required members.'
          },
          {
            num: '02 · CLARIFY',
            label: 'Provisional',
            icon: <ChatClarifyIcon size={15} />,
            badge: 'WA Follow-up',
            badgeTone: 'warn',
            members: [
              { name: 'Alya', state: '✓ Certain', cls: 'good' },
              { name: 'Bima', state: '💬 Pinged', cls: 'accent' },
              { name: 'Citra', state: '✓ Certain', cls: 'good' }
            ],
            rule: 'While required certainty is incomplete, schedule stays Provisional with a targeted WhatsApp follow-up.'
          },
          {
            num: '03 · LOCK',
            label: 'Coordinator final',
            icon: <ShieldLockIcon size={15} />,
            badge: '3/3 Locked',
            badgeTone: 'good',
            members: [
              { name: 'Alya', state: '✓ Certain', cls: 'good' },
              { name: 'Bima', state: '✓ Certain', cls: 'good' },
              { name: 'Citra', state: '✓ Certain', cls: 'good' }
            ],
            rule: 'Once all required members confirm certainty, the coordinator deliberately locks Final status with rationale.'
          }
        ];

  const blueprintIcons = [
    <FlowBranchIcon key="b0" size={15} />,
    <WireframeGridIcon key="b1" size={15} />,
    <ChartCompareIcon key="b2" size={15} />,
    <CompassHubIcon key="b3" size={15} />,
    <PulseImpactIcon key="b4" size={15} />
  ];

  const activeHeroStage = heroProtocolStages[heroStageIdx];

  return (
    <>
      <TopNavbar
        mode="hub"
        rightSlot={
          <Link className="btn primary btn-sm interactive-icon-trigger" to="/q3-04-core">
            <CoreDatabaseCheckIcon size={13} />
            <span>{t.nav.openMvpCta}</span>
          </Link>
        }
      />

      <main className="container workspace page-enter" id="top">
        {/* 00 // ARCHITECTURAL EDITORIAL MASTHEAD */}
        <section className="hub-masthead" aria-labelledby="hub-title">
          <div className="hub-masthead-grid">
            <div className="hub-hero-copy">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-dot pulse-dot" aria-hidden="true" />
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
                    {locale === 'id' ? 'Pengerjaan' : 'Scope'}
                  </span>
                  <span className="author-cell-val">
                    {locale === 'id'
                      ? 'Q1.02 Tim · Q1.03+ Individu'
                      : 'Q1.02 Pair · Q1.03+ Solo'}
                  </span>
                </div>
              </div>
            </div>

            <aside
              className="hub-thesis-panel spotlight-dark"
              aria-label={t.hub.questionLabel}
              onPointerMove={handleSpotlightMove}
            >
              <div>
                <div className="thesis-index-bar">
                  <span>00 // {t.hub.questionLabel}</span>
                  <span>CONFIRMATION PROTOCOL</span>
                </div>
                <blockquote className="thesis-quote">{t.hub.questionQuote}</blockquote>
                <p className="thesis-body">
                  <strong>{t.hub.candidateSummaryLabel}</strong> {t.hub.candidateSummaryBody}
                </p>
              </div>

              <div>
                <div
                  className="thesis-mini-flow"
                  role="tablist"
                  aria-label="Confirmation Protocol interactive stage preview"
                >
                  {heroProtocolStages.map((st, idx) => {
                    const active = heroStageIdx === idx;
                    return (
                      <button
                        key={st.num}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        className={`thesis-flow-chip interactive-icon-trigger${active ? ' is-active' : ''}`}
                        onClick={() => setHeroStageIdx(idx as 0 | 1 | 2)}
                      >
                        <span className="thesis-chip-head">
                          <span className="thesis-flow-num">{st.num}</span>
                          <span className="thesis-chip-icon">{st.icon}</span>
                        </span>
                        <span className="thesis-flow-label">{st.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Mini Readiness Board Graphic */}
                <div className="hero-live-board-viz" key={heroStageIdx}>
                  <div className="hero-viz-top">
                    <div className="hero-viz-members">
                      {activeHeroStage.members.map((m) => (
                        <span key={m.name} className={`hero-viz-pill is-${m.cls}`}>
                          <strong>{m.name}</strong> {m.state}
                        </span>
                      ))}
                    </div>
                    <span className={`hero-viz-status is-${activeHeroStage.badgeTone}`}>
                      {activeHeroStage.badge}
                    </span>
                  </div>
                  <p className="thesis-stage-caption">{activeHeroStage.rule}</p>
                </div>
              </div>
            </aside>
          </div>

          <div className="epistemic-strip">
            <div className="ep-cell interactive-icon-trigger">
              <div className="ep-cell-head">
                <span className="ep-icon-tile tone-accent">
                  <ChatVsCommitIcon size={17} />
                </span>
                <span className="diag-label">{t.hub.ep1Label}</span>
              </div>
              <span className="ep-value">{t.hub.ep1Val}</span>
              <span className="diag-subtext">{t.hub.ep1Note}</span>
            </div>

            <div className="ep-cell interactive-icon-trigger">
              <div className="ep-cell-head">
                <span className="ep-icon-tile tone-good">
                  <BoardMatrixIcon size={17} />
                </span>
                <span className="diag-label">{t.hub.ep2Label}</span>
              </div>
              <span className="ep-value">{t.hub.ep2Val}</span>
              <span className="diag-subtext">{t.hub.ep2Note}</span>
            </div>

            <div className="ep-cell interactive-icon-trigger">
              <div className="ep-cell-head">
                <span className="ep-icon-tile tone-warn">
                  <StopwatchScaleIcon size={17} />
                </span>
                <span className="diag-label">{t.hub.ep3Label}</span>
              </div>
              <span className="ep-value">{t.hub.ep3Val}</span>
              <span className="diag-subtext">{t.hub.ep3Note}</span>
            </div>

            <div className="ep-cell interactive-icon-trigger">
              <div className="ep-cell-head">
                <span className="ep-icon-tile tone-accent">
                  <CoreDatabaseCheckIcon size={17} />
                </span>
                <span className="diag-label">{t.hub.ep4Label}</span>
              </div>
              <span className="ep-value">{t.hub.ep4Val}</span>
              <span className="diag-subtext">{t.hub.ep4Note}</span>
            </div>
          </div>
        </section>

        {/* 01 // INTERACTIVE PRODUCT WORKSPACES */}
        <div className="section-head" id="routes">
          <div>
            <span className="section-coord">
              <PrototypeCursorIcon size={14} />
              <span>01 // {t.hub.routesEyebrow}</span>
            </span>
            <h2>{t.hub.routesTitle}</h2>
            <p>{t.hub.routesSub}</p>
          </div>
        </div>

        <section className="dock-grid" aria-label={t.hub.routesTitle}>
          <article
            className="dock-card featured-blue spotlight-card interactive-icon-trigger"
            onPointerMove={handleSpotlightMove}
          >
            <div>
              <div className="dock-card-head-row">
                <span className="dock-icon-medallion tone-accent">
                  <PrototypeCursorIcon size={22} />
                </span>
                <span className="pill accent">{t.hub.cardQ303Pill}</span>
              </div>
              <h3>{t.hub.cardQ303Title}</h3>
              <p>{t.hub.cardQ303Body}</p>

              <div className="dock-feature-strip">
                <span className="dock-feature-chip">
                  <UsersCheckIcon size={13} />
                  <span>{locale === 'id' ? 'Wajib vs Opsional' : 'Required vs Optional'}</span>
                </span>
                <span className="dock-feature-chip">
                  <FlowBranchIcon size={13} />
                  <span>{locale === 'id' ? '3 Tahap Protokol' : '3 Protocol Stages'}</span>
                </span>
                <span className="dock-feature-chip">
                  <ChatClarifyIcon size={13} />
                  <span>{locale === 'id' ? 'Draf WhatsApp' : 'WhatsApp Drafts'}</span>
                </span>
              </div>

              <div className="route-bar">
                <span>/q3-03</span>
                <button
                  type="button"
                  className="route-copy-inline"
                  onClick={() => handleCopyLink('/q3-03', 'q303')}
                >
                  <ShareLinkIcon size={12} />
                  <span>
                    {copiedRoute === 'q303' ? t.hub.cardQ303Copied : t.hub.cardQ303CopyBtn}
                  </span>
                </button>
              </div>
            </div>
            <Link className="btn obsidian btn-full interactive-icon-trigger" to="/q3-03">
              <PrototypeCursorIcon size={15} />
              <span>{t.hub.cardQ303OpenBtn} →</span>
            </Link>
          </article>

          <article
            className="dock-card featured-green spotlight-card interactive-icon-trigger"
            onPointerMove={handleSpotlightMove}
          >
            <div>
              <div className="dock-card-head-row">
                <span className="dock-icon-medallion tone-good">
                  <CoreDatabaseCheckIcon size={22} />
                </span>
                <span className="pill good">{t.hub.cardQ304Pill}</span>
              </div>
              <h3>{t.hub.cardQ304Title}</h3>
              <p>{t.hub.cardQ304Body}</p>

              <div className="dock-feature-strip">
                <span className="dock-feature-chip">
                  <CalendarProposalIcon size={13} />
                  <span>{locale === 'id' ? 'Buat Usulan Baru' : 'Custom Proposals'}</span>
                </span>
                <span className="dock-feature-chip">
                  <CoreDatabaseCheckIcon size={13} />
                  <span>LocalStorage</span>
                </span>
                <span className="dock-feature-chip">
                  <ShareLinkIcon size={13} />
                  <span>URL Snapshot</span>
                </span>
              </div>

              <div className="route-bar">
                <span>/q3-04-core</span>
                <button
                  type="button"
                  className="route-copy-inline"
                  onClick={() => handleCopyLink('/q3-04-core', 'q304')}
                >
                  <ShareLinkIcon size={12} />
                  <span>
                    {copiedRoute === 'q304' ? t.hub.cardQ304Copied : t.hub.cardQ304CopyBtn}
                  </span>
                </button>
              </div>
            </div>
            <Link className="btn primary btn-full interactive-icon-trigger" to="/q3-04-core">
              <CoreDatabaseCheckIcon size={15} />
              <span>{t.hub.cardQ304OpenBtn} →</span>
            </Link>
          </article>
        </section>

        {/* 02 // MASTER-DETAIL BLUEPRINT STUDIO */}
        <div className="section-head" id="visuals">
          <div>
            <span className="section-coord">
              <WireframeGridIcon size={14} />
              <span>02 // {t.hub.visualsEyebrow}</span>
            </span>
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
                className={`blueprint-rail-btn interactive-icon-trigger${idx === activeVisualIdx ? ' is-active' : ''}`}
                onClick={() => setActiveVisualIdx(idx)}
              >
                <span className="blueprint-rail-icon">
                  {blueprintIcons[idx] || <WireframeGridIcon size={15} />}
                </span>
                <span className="blueprint-rail-label">{v.tab}</span>
              </button>
            ))}
          </div>

          <div className="blueprint-stage" key={currentVisual.id}>
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
                className="blueprint-img-enter"
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
            <span className="section-coord">
              <CompassHubIcon size={14} />
              <span>03 // {t.hub.trailEyebrow}</span>
            </span>
            <h2>{t.hub.trailTitle}</h2>
            <p>{t.hub.trailSub}</p>
          </div>
          <a
            className="btn btn-sm interactive-icon-trigger"
            href="https://idits.notion.site/ebd//374333dd1d2880d78769c73a477ba254"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NotionDocIcon size={13} />
            <span>{t.hub.coursePortalBtn}</span>
          </a>
        </div>

        {/* Semester Progress Telemetry */}
        <div className="trail-telemetry spotlight-card" onPointerMove={handleSpotlightMove}>
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
              {doneCount} / {allQuests.length}{' '}
              {locale === 'id' ? 'TAHAP AKTIF/SELESAI' : 'COMPLETED / ACTIVE'}
            </span>
          </div>

          <div className="trail-progress-track" aria-hidden="true">
            <div className="trail-progress-seg good" style={{ width: `${submittedPct}%` }} />
            <div className="trail-progress-seg accent" style={{ width: `${liveWebPct}%` }} />
          </div>

          <p className="trail-perm-note">{t.hub.notionPermNote}</p>
        </div>

        {/* Phase & Status Dual Filters with Interactive Quest Icons */}
        <div className="trail-controls">
          <div className="scroll-tabs-wrap" style={{ flex: '1 1 auto' }}>
            <div className="segmented-strip" role="group" aria-label="Filter by Quest phase">
              <button
                type="button"
                className={`tab-btn interactive-icon-trigger${activePhase === 'ALL' ? ' is-active' : ''}`}
                onClick={() => setActivePhase('ALL')}
              >
                <CompassHubIcon size={14} />
                <span>{t.hub.filterAll(allQuests.length)}</span>
              </button>
              {(
                [
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
                  className={`tab-btn interactive-icon-trigger${activePhase === f.key ? ' is-active' : ''}`}
                  onClick={() => setActivePhase(f.key)}
                >
                  <PhaseBadgeIcon phase={f.key} size={14} />
                  <span>{f.label}</span>
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

        <section
          className="trail-grid"
          aria-live="polite"
          key={`${activePhase}-${stateFilter}`}
        >
          {filteredQuests.map((q, idx) => {
            const spineCls = !q.completed
              ? ' is-upcoming'
              : q.tone === 'accent'
                ? ' tone-spine-accent'
                : q.tone === 'warn'
                  ? ' tone-spine-warn'
                  : '';

            return (
              <article
                key={q.code + q.challengeName}
                className={`quest-card spotlight-card card-stagger interactive-icon-trigger${spineCls}`}
                style={{ '--stagger-idx': Math.min(idx, 10) } as React.CSSProperties}
                onPointerMove={handleSpotlightMove}
              >
                <div className="quest-top">
                  <div className="quest-code-wrap">
                    <span className={`quest-phase-medallion tone-${q.completed ? q.tone : 'neutral'}`}>
                      <PhaseBadgeIcon phase={q.phase} size={14} />
                    </span>
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
                          <PrototypeCursorIcon size={13} />
                          <span>{lnk.label}</span>
                        </Link>
                      ) : (
                        <a
                          key={lnk.href}
                          href={lnk.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`quest-link-btn kind-${lnk.kind}`}
                        >
                          {lnk.kind === 'submission' ? (
                            <NotionDocIcon size={13} />
                          ) : (
                            <ShareLinkIcon size={12} />
                          )}
                          <span>{lnk.label}</span>
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
