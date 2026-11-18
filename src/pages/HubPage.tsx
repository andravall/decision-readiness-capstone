import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlueprintStudio } from '../components/BlueprintStudio';
import { DiagramLightbox } from '../components/DiagramLightbox';
import {
  BoardMatrixIcon,
  CalendarProposalIcon,
  ChatClarifyIcon,
  ChatVsCommitIcon,
  CompassHubIcon,
  CoreDatabaseCheckIcon,
  FlowBranchIcon,
  NotionDocIcon,
  PhaseBadgeIcon,
  PrototypeCursorIcon,
  SearchFilterIcon,
  ShareLinkIcon,
  ShieldLockIcon,
  StopwatchScaleIcon,
  UsersCheckIcon,
  WireframeGridIcon
} from '../components/ProjectIcons';
import { TopNavbar } from '../components/TopNavbar';
import { useLanguage } from '../i18n/LanguageContext';
import { VisualArtifactItem } from '../i18n/translations';

type MiniStatus = 'certain' | 'tentative' | 'none';

const NEXT_MINI_STATUS: Record<MiniStatus, MiniStatus> = {
  none: 'tentative',
  tentative: 'certain',
  certain: 'none'
};

export const HubPage: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activePhase, setActivePhase] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5'>('ALL');
  const [stateFilter, setStateFilter] = useState<'all' | 'done' | 'upcoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllQuests, setShowAllQuests] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<VisualArtifactItem | null>(null);
  const [copiedRoute, setCopiedRoute] = useState<'q303' | 'q304' | null>(null);

  // Interactive Live Hero Mini-Board State
  const [heroRoster, setHeroRoster] = useState<{ name: string; status: MiniStatus }[]>([
    { name: 'Alya', status: 'certain' },
    { name: 'Bima', status: 'none' },
    { name: 'Citra', status: 'tentative' }
  ]);

  const tiltRef = useRef<HTMLDivElement | null>(null);

  const handleHeroTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${(-ny * 5.5).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(nx * 6.5).toFixed(2)}deg`);
  };

  const handleHeroTiltLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const toggleHeroMember = (idx: number) => {
    setHeroRoster((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, status: NEXT_MINI_STATUS[m.status] } : m))
    );
  };

  const heroReadyCount = heroRoster.filter((m) => m.status === 'certain').length;
  const heroAllReady = heroReadyCount === heroRoster.length;
  const heroPct = Math.round((heroReadyCount / heroRoster.length) * 100);
  const ringR = 18;
  const ringC = 2 * Math.PI * ringR;
  const ringOffset = ringC - (heroPct / 100) * ringC;

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

  const qNorm = searchQuery.trim().toLowerCase();
  const filteredQuests = allQuests.filter((q) => {
    const matchPhase = activePhase === 'ALL' || q.phase === activePhase;
    const matchState =
      stateFilter === 'all' ||
      (stateFilter === 'done' && q.completed) ||
      (stateFilter === 'upcoming' && !q.completed);
    const matchQuery =
      !qNorm ||
      q.code.toLowerCase().includes(qNorm) ||
      q.challengeName.toLowerCase().includes(qNorm) ||
      q.title.toLowerCase().includes(qNorm) ||
      q.summary.toLowerCase().includes(qNorm);
    return matchPhase && matchState && matchQuery;
  });

  const shouldTruncate =
    activePhase === 'ALL' && stateFilter === 'all' && !qNorm && !showAllQuests;
  const visibleQuests = shouldTruncate ? filteredQuests.slice(0, 8) : filteredQuests;

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

  const miniStatusLabel = (st: MiniStatus) => {
    if (locale === 'id') {
      return st === 'certain' ? '✓ Pasti hadir' : st === 'tentative' ? '◐ Tentatif' : '○ Belum balas';
    }
    return st === 'certain' ? '✓ Confirmed' : st === 'tentative' ? '◐ Tentative' : '○ No reply';
  };

  return (
    <>
      <TopNavbar mode="hub" />

      <main className="container workspace page-enter" id="top">
        {/* 00 // SCULPTURAL ASYMMETRIC HERO + INTERACTIVE 3D MINI-BOARD OS */}
        <section className="hero-stage" aria-labelledby="hub-title">
          <div className="hero-editorial-col">
            <div>
              <div className="hero-kicker">
                <span className="eyebrow-dot pulse-dot" aria-hidden="true" />
                <span>{t.hub.eyebrow}</span>
              </div>

              <h1 className="hub-display-title" id="hub-title">
                {t.hub.heroTitle}
              </h1>

              <p className="hub-lead">{t.hub.heroLead}</p>

              <div className="hero-cta-row">
                <Link className="btn primary btn-shimmer interactive-icon-trigger" to="/q3-04-core">
                  <CoreDatabaseCheckIcon size={15} />
                  <span>{t.hub.cardQ304OpenBtn} →</span>
                </Link>
                <Link className="btn interactive-icon-trigger" to="/q3-03">
                  <PrototypeCursorIcon size={15} />
                  <span>{t.hub.cardQ303OpenBtn}</span>
                </Link>
              </div>
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
                  {locale === 'id' ? 'Q1.02 Tim · Q1.03+ Individu' : 'Q1.02 Pair · Q1.03+ Solo'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: 3D-TILTING LIVE MINI READINESS OS WIDGET */}
          <div
            ref={tiltRef}
            className={`hero-os-card${heroAllReady ? ' is-all-ready' : ''}`}
            onPointerMove={handleHeroTiltMove}
            onPointerLeave={handleHeroTiltLeave}
          >
            <div className="hero-os-topbar">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="hero-os-domain">readiness-board.protocol</span>
              <span className={`hero-os-pill${heroAllReady ? ' is-ready' : ''}`}>
                {heroAllReady
                  ? locale === 'id'
                    ? '✓ Siap Final'
                    : '✓ Ready to Lock'
                  : locale === 'id'
                    ? '◐ Klarifikasi'
                    : '◐ Clarifying'}
              </span>
            </div>

            <div className="hero-os-body">
              <div className="hero-question-row">
                <div>
                  <span className="hero-q-label">{t.hub.questionLabel}</span>
                  <blockquote className="hero-q-quote">{t.hub.questionQuote}</blockquote>
                </div>

                <div className="hero-mini-ring" aria-hidden="true">
                  <svg width="46" height="46" viewBox="0 0 46 46">
                    <circle
                      className="radial-gauge-track"
                      cx="23"
                      cy="23"
                      r={ringR}
                      fill="none"
                      strokeWidth="4"
                    />
                    <circle
                      className={`radial-gauge-fill${heroAllReady ? ' is-complete' : ''}`}
                      cx="23"
                      cy="23"
                      r={ringR}
                      fill="none"
                      strokeWidth="4"
                      strokeDasharray={ringC}
                      strokeDashoffset={ringOffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="hero-mini-ring-txt">
                    {heroReadyCount}/{heroRoster.length}
                  </span>
                </div>
              </div>

              <div className="hero-interactive-label">
                <span>
                  {locale === 'id'
                    ? 'INTERAKTIF · KETUK BARIS ANGGOTA UNTUK UJI AMBANG KEPASTIAN'
                    : 'INTERACTIVE · TAP ANY MEMBER TO TEST READINESS THRESHOLD'}
                </span>
              </div>

              <div className="hero-roster-mini" role="group" aria-label="Interactive mini board demo">
                {heroRoster.map((m, idx) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`hero-member-btn state-${m.status}`}
                    onClick={() => toggleHeroMember(idx)}
                  >
                    <span className="hero-m-left">
                      <span className="hero-m-avatar">{m.name[0]}</span>
                      <span className="hero-m-name">{m.name}</span>
                      <span className="hero-m-req">
                        {locale === 'id' ? 'WAJIB' : 'REQ'}
                      </span>
                    </span>
                    <span className={`hero-m-badge state-${m.status}`}>
                      {miniStatusLabel(m.status)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="hero-protocol-bar">
                <span className={`hp-step${heroReadyCount < 2 ? ' is-on' : ' is-done'}`}>
                  <CalendarProposalIcon size={12} />
                  <span>01 {locale === 'id' ? 'Usulan' : 'Open'}</span>
                </span>
                <span className="hp-line" />
                <span
                  className={`hp-step${
                    heroReadyCount >= 1 && !heroAllReady
                      ? ' is-on warn'
                      : heroAllReady
                        ? ' is-done'
                        : ''
                  }`}
                >
                  <ChatClarifyIcon size={12} />
                  <span>02 {locale === 'id' ? 'Sementara' : 'Clarify'}</span>
                </span>
                <span className="hp-line" />
                <span className={`hp-step${heroAllReady ? ' is-on good' : ''}`}>
                  <ShieldLockIcon size={12} />
                  <span>03 Final</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO TELEMETRY STRIP (4 VISUAL DATA CARDS) */}
        <section className="bento-telemetry-grid" aria-label="Key project findings">
          <article className="bento-stat-card interactive-icon-trigger">
            <div className="ep-cell-head">
              <span className="ep-icon-tile tone-accent">
                <ChatVsCommitIcon size={16} />
              </span>
              <span className="diag-label">{t.hub.ep1Label}</span>
            </div>
            <strong className="ep-value">{t.hub.ep1Val}</strong>
            <div className="mini-compare-bars" aria-hidden="true">
              <div className="mcb-row">
                <span>Chat Poll</span>
                <div className="mcb-track">
                  <div className="mcb-fill muted" style={{ width: '52%' }} />
                </div>
              </div>
              <div className="mcb-row">
                <span>Final Lock</span>
                <div className="mcb-track">
                  <div className="mcb-fill accent" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
            <p className="diag-subtext">{t.hub.ep1Note}</p>
          </article>

          <article className="bento-stat-card interactive-icon-trigger">
            <div className="ep-cell-head">
              <span className="ep-icon-tile tone-good">
                <BoardMatrixIcon size={16} />
              </span>
              <span className="diag-label">{t.hub.ep2Label}</span>
            </div>
            <strong className="ep-value">{t.hub.ep2Val}</strong>
            <div className="mini-compare-bars" aria-hidden="true">
              <div className="mcb-row">
                <span>Board 17/20</span>
                <div className="mcb-track">
                  <div className="mcb-fill accent" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="mcb-row">
                <span>Protocol 19/20</span>
                <div className="mcb-track">
                  <div className="mcb-fill good" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
            <p className="diag-subtext">{t.hub.ep2Note}</p>
          </article>

          <article className="bento-stat-card interactive-icon-trigger">
            <div className="ep-cell-head">
              <span className="ep-icon-tile tone-warn">
                <StopwatchScaleIcon size={16} />
              </span>
              <span className="diag-label">{t.hub.ep3Label}</span>
            </div>
            <strong className="ep-value">{t.hub.ep3Val}</strong>
            <div className="mini-compare-bars" aria-hidden="true">
              <div className="mcb-row">
                <span>Board 40s</span>
                <div className="mcb-track">
                  <div className="mcb-fill good" style={{ width: '53%' }} />
                </div>
              </div>
              <div className="mcb-row">
                <span>Chat 75s</span>
                <div className="mcb-track">
                  <div className="mcb-fill warn" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
            <p className="diag-subtext">{t.hub.ep3Note}</p>
          </article>

          <article className="bento-stat-card interactive-icon-trigger">
            <div className="ep-cell-head">
              <span className="ep-icon-tile tone-accent">
                <CoreDatabaseCheckIcon size={16} />
              </span>
              <span className="diag-label">{t.hub.ep4Label}</span>
            </div>
            <strong className="ep-value">{t.hub.ep4Val}</strong>
            <div className="mini-route-pills">
              <Link to="/q3-03" className="mini-route-tag">
                <span>/q3-03</span>
                <span>Sim →</span>
              </Link>
              <Link to="/q3-04-core" className="mini-route-tag is-live">
                <span>/q3-04-core</span>
                <span>MVP →</span>
              </Link>
            </div>
            <p className="diag-subtext">{t.hub.ep4Note}</p>
          </article>
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
          <article className="dock-card featured-blue interactive-icon-trigger">
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
            <Link className="btn btn-full interactive-icon-trigger" to="/q3-03">
              <PrototypeCursorIcon size={15} />
              <span>{t.hub.cardQ303OpenBtn} →</span>
            </Link>
          </article>

          <article className="dock-card featured-green interactive-icon-trigger">
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
            <Link className="btn primary btn-shimmer btn-full interactive-icon-trigger" to="/q3-04-core">
              <CoreDatabaseCheckIcon size={15} />
              <span>{t.hub.cardQ304OpenBtn} →</span>
            </Link>
          </article>
        </section>

        {/* 02 // INTERACTIVE CAD BLUEPRINT STUDIO */}
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

        <BlueprintStudio
          locale={locale}
          visuals={t.hub.visuals}
          expandLabel={t.hub.expandBtn}
          svgLabel={t.hub.svgVectorBtn}
          mobileHint={t.hub.mobileTapZoomHint}
          onOpenLightbox={(item) => setLightboxItem(item)}
        />

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

        {/* Phase, Search & Status Controls */}
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

          <div className="trail-right-filters">
            <div className="trail-search-box">
              <SearchFilterIcon size={13} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'id' ? 'Cari Q1.04, H1, MVP...' : 'Search Q1.04, H1, MVP...'}
                aria-label={locale === 'id' ? 'Cari tahapan' : 'Search stages'}
              />
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
        </div>

        <section
          className="trail-grid"
          aria-live="polite"
          key={`${activePhase}-${stateFilter}-${qNorm}-${showAllQuests ? 'all' : 'compact'}`}
        >
          {visibleQuests.map((q, idx) => {
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
                className={`quest-card card-stagger interactive-icon-trigger${spineCls}`}
                style={{ '--stagger-idx': Math.min(idx, 10) } as React.CSSProperties}
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

        {activePhase === 'ALL' && stateFilter === 'all' && !qNorm && filteredQuests.length > 8 && (
          <div className="trail-expand-bar">
            <button
              type="button"
              className="btn primary btn-shimmer"
              onClick={() => setShowAllQuests((v) => !v)}
              data-testid="btn-toggle-all-quests"
            >
              {showAllQuests
                ? locale === 'id'
                  ? 'Ringkas tampilan daftar ↑'
                  : 'Collapse stage list ↑'
                : locale === 'id'
                  ? `Tampilkan seluruh ${filteredQuests.length} tahapan (Q1.02 → Q5.04) ↓`
                  : `Explore all ${filteredQuests.length} stages (Q1.02 → Q5.04) ↓`}
            </button>
          </div>
        )}

        <footer className="workspace-footer">
          <span>{t.hub.footerLeft}</span>
          <span>{t.hub.footerRight}</span>
        </footer>
      </main>

      <DiagramLightbox artifact={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
};
