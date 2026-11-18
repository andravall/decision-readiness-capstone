import React, { useEffect, useRef, useState } from 'react';
import { Locale } from '../domain/types';
import { useTheme } from '../i18n/ThemeContext';
import { VisualArtifactItem } from '../i18n/translations';
import {
  ChartCompareIcon,
  CompassHubIcon,
  FlowBranchIcon,
  PulseImpactIcon,
  ShareLinkIcon,
  WireframeGridIcon
} from './ProjectIcons';

interface BlueprintStudioProps {
  locale: Locale;
  visuals: VisualArtifactItem[];
  expandLabel: string;
  svgLabel: string;
  mobileHint: string;
  onOpenLightbox: (item: VisualArtifactItem) => void;
}

interface BlueprintMeta {
  code: string;
  phaseTag: string;
  highlights: string[];
  metricLabel: string;
  metricValue: string;
}

const BLUEPRINT_DETAILS: Record<Locale, BlueprintMeta[]> = {
  id: [
    {
      code: 'SHEET 01 · Q3.02',
      phaseTag: 'Blueprint Alur',
      metricLabel: 'Percabangan Utama',
      metricValue: '3 Jalur Keputusan',
      highlights: [
        'Memisahkan jalur klarifikasi Sementara ke WhatsApp saat respons wajib belum utuh',
        'Menuntut penulisan alasan sadar koordinator sebelum mengunci status Final',
        'Membuka jalur Tinjau Ulang otomatis bila respons berubah sesudah Final'
      ]
    },
    {
      code: 'SHEET 02 · Q3.03',
      phaseTag: 'Arsitektur Layar',
      metricLabel: 'Cakupan Antarmuka',
      metricValue: '6 Keadaan Layar',
      highlights: [
        'Memetakan transisi papan utama, form pembaruan respons, dan panel tinjauan keputusan',
        'Menyediakan pratinjau draf pesan klarifikasi maupun pengumuman jadwal final',
        'Menjaga struktur informasi konsisten dari sketsa awal ke prototipe interaktif'
      ]
    },
    {
      code: 'SHEET 03 · Q2.05',
      phaseTag: 'Evaluasi Eksperimen',
      metricLabel: 'Durasi Baca Rata-Rata',
      metricValue: '40 dtk vs 75 dtk',
      highlights: [
        'Ketepatan identifikasi status pada skenario K1–K3 setara (3/3 benar di chat & board)',
        'Selisih rata-rata 35 detik mendukung kemudahan baca skenario secara indikatif',
        'Verdict H1 ditetapkan Inconclusive karena bukti prosedur asal seri K belum lengkap'
      ]
    },
    {
      code: 'SHEET 04 · Q2.06',
      phaseTag: 'Jejak Penalaran',
      metricLabel: 'Rantai Bukti',
      metricValue: '6 Simpul Kausal',
      highlights: [
        'Menghubungkan penyempitan masalah Q1 dengan 6 alternatif solusi pada Q2.02',
        'Mencatat koreksi terbuka skor matriks awal: Board 17/20 vs Protokol 19/20',
        'Menjelaskan dasar keputusan validasi tambahan sebelum perluasan fitur MVP'
      ]
    },
    {
      code: 'SHEET 05 · Q2.07',
      phaseTag: 'Refleksi Inovasi',
      metricLabel: 'Transformasi Lensa',
      metricValue: '3 Fase Pemahaman',
      highlights: [
        'Bergeser dari asumsi bahwa tampilan rapi otomatis menyelesaikan masalah koordinasi',
        'Membedakan opini responden (R1–R3) dari pengukuran perilaku komparatif (K1–K3)',
        'Menimbang manfaat kemudahan baca board terhadap beban pembaruan status manual (H3)'
      ]
    }
  ],
  en: [
    {
      code: 'SHEET 01 · Q3.02',
      phaseTag: 'Flow Blueprint',
      metricLabel: 'Core Branches',
      metricValue: '3 Decision Paths',
      highlights: [
        'Separates Provisional WhatsApp follow-up loops when required responses are incomplete',
        'Requires deliberate written coordinator rationale before locking Final status',
        'Triggers automatic Needs Re-review state if any member changes status post-final'
      ]
    },
    {
      code: 'SHEET 02 · Q3.03',
      phaseTag: 'Screen Structure',
      metricLabel: 'Interface States',
      metricValue: '6 Screen States',
      highlights: [
        'Maps transitions across main readiness board, member response form, and review gate',
        'Includes dedicated preview states for WhatsApp clarification and final announcement',
        'Preserves strict information hierarchy from low-fi skeleton to live interactive UI'
      ]
    },
    {
      code: 'SHEET 03 · Q2.05',
      phaseTag: 'Experiment Audit',
      metricLabel: 'Mean Reading Time',
      metricValue: '40s vs 75s',
      highlights: [
        'Equal 3/3 scenario accuracy across both chat summary and board conditions (K1–K3)',
        '35-second mean difference provides indicative support for faster status scanning',
        'H1 verdict held Inconclusive due to incomplete raw procedural logs in series K'
      ]
    },
    {
      code: 'SHEET 04 · Q2.06',
      phaseTag: 'Reasoning Trail',
      metricLabel: 'Evidence Chain',
      metricValue: '6 Causal Nodes',
      highlights: [
        'Traces narrowed Q1 pain through six solution alternatives evaluated in Q2.02',
        'Documents open matrix score correction: Board 17/20 vs Protocol 19/20',
        'Anchors the decision to conduct targeted validation prior to full MVP expansion'
      ]
    },
    {
      code: 'SHEET 05 · Q2.07',
      phaseTag: 'Mindshift Map',
      metricLabel: 'Lens Evolution',
      metricValue: '3 Inquiry Phases',
      highlights: [
        'Moves past assuming clean visual structure automatically solves group coordination',
        'Separates exploratory opinions (R1–R3) from comparative task timing (K1–K3)',
        'Balances board reading speed against manual status-update effort (H3)'
      ]
    }
  ]
};

export const BlueprintStudio: React.FC<BlueprintStudioProps> = ({
  locale,
  visuals,
  expandLabel,
  svgLabel,
  mobileHint,
  onOpenLightbox
}) => {
  const { theme } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [stageScale, setStageScale] = useState<1 | 1.45>(1);
  const [darkMat, setDarkMat] = useState(() => theme === 'dark');
  const [loupeActive, setLoupeActive] = useState(true);

  useEffect(() => {
    setDarkMat(theme === 'dark');
  }, [theme]);
  const [loupePos, setLoupePos] = useState<{
    visible: boolean;
    x: number;
    y: number;
    pctX: number;
    pctY: number;
  }>({ visible: false, x: 0, y: 0, pctX: 50, pctY: 50 });

  const frameRef = useRef<HTMLDivElement | null>(null);

  const currentVisual = visuals[activeIdx] || visuals[0];
  const metaList = BLUEPRINT_DETAILS[locale];
  const currentMeta = metaList[activeIdx] || metaList[0];

  const icons = [
    <FlowBranchIcon key="i0" size={16} />,
    <WireframeGridIcon key="i1" size={16} />,
    <ChartCompareIcon key="i2" size={16} />,
    <CompassHubIcon key="i3" size={16} />,
    <PulseImpactIcon key="i4" size={16} />
  ];

  useEffect(() => {
    setStageScale(1);
    setLoupePos((prev) => ({ ...prev, visible: false }));
  }, [activeIdx]);

  const handleStep = (dir: -1 | 1) => {
    setActiveIdx((prev) => (prev + dir + visuals.length) % visuals.length);
  };

  const handleFramePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!loupeActive || stageScale > 1 || e.pointerType === 'touch') return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setLoupePos({ visible: true, x, y, pctX, pctY });
  };

  return (
    <section className="blueprint-studio-v2" aria-label="Interactive Blueprint Inspector">
      {/* LEFT COLUMN: SELECTOR DECK + LIVE OBSIDIAN DOSSIER (ZERO DEAD SPACE!) */}
      <div className="bp-sidebar">
        <div className="bp-deck-list" role="tablist" aria-label="Select visual blueprint">
          {visuals.map((v, idx) => {
            const isActive = idx === activeIdx;
            const meta = metaList[idx] || metaList[0];
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`bp-deck-card interactive-icon-trigger${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <span className="bp-deck-icon">
                  {icons[idx] || <WireframeGridIcon size={16} />}
                </span>
                <span className="bp-deck-text">
                  <span className="bp-deck-eyebrow">
                    {String(idx + 1).padStart(2, '0')} · {meta.phaseTag}
                  </span>
                  <span className="bp-deck-title">{v.tab}</span>
                </span>
                <span className="bp-deck-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Key-Takeaway Inspector Box filling the lower sidebar */}
        <aside className="bp-dossier" key={`${locale}-${activeIdx}`}>
          <div className="bp-dossier-top">
            <span className="bp-dossier-code">{currentMeta.code}</span>
            <div className="bp-stepper-btns">
              <button
                type="button"
                className="bp-step-btn"
                onClick={() => handleStep(-1)}
                aria-label={locale === 'id' ? 'Diagram sebelumnya' : 'Previous diagram'}
              >
                ←
              </button>
              <span className="bp-step-count">
                {activeIdx + 1}/{visuals.length}
              </span>
              <button
                type="button"
                className="bp-step-btn"
                onClick={() => handleStep(1)}
                aria-label={locale === 'id' ? 'Diagram berikutnya' : 'Next diagram'}
              >
                →
              </button>
            </div>
          </div>

          <div className="bp-metric-Callout">
            <span className="bp-metric-label">{currentMeta.metricLabel}</span>
            <strong className="bp-metric-val">{currentMeta.metricValue}</strong>
          </div>

          <ul className="bp-highlights">
            {currentMeta.highlights.map((pt, i) => (
              <li key={i}>
                <span className="bp-hl-num">0{i + 1}</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE CAD DRAFTING STAGE + MAGNIFIER LOUPE */}
      <div className="bp-main-stage">
        <div className="bp-toolbar">
          <div className="bp-title-block">
            <div className="bp-coord-line">
              <span className="bp-live-dot" aria-hidden="true" />
              <span>{currentMeta.code}</span>
              <span>·</span>
              <span>{locale === 'id' ? 'RESOLUSI RETINA 2X' : 'RETINA 2X VECTOR'}</span>
            </div>
            <h3>{currentVisual.title}</h3>
            <p>{currentVisual.caption}</p>
          </div>

          <div className="bp-tools">
            {/* Inline Scale Switch */}
            <div className="bp-tool-group hide-mobile" role="group" aria-label="Canvas zoom">
              <button
                type="button"
                className={`bp-tool-pill${stageScale === 1 ? ' is-on' : ''}`}
                onClick={() => setStageScale(1)}
              >
                100%
              </button>
              <button
                type="button"
                className={`bp-tool-pill${stageScale > 1 ? ' is-on' : ''}`}
                onClick={() => setStageScale(1.45)}
              >
                145%
              </button>
            </div>

            {/* Interactive Magnifier Loupe Toggle (Desktop) */}
            <button
              type="button"
              className={`btn btn-sm hide-mobile${loupeActive && stageScale === 1 ? ' obsidian' : ''}`}
              onClick={() => setLoupeActive((v) => !v)}
              title={
                locale === 'id'
                  ? 'Aktifkan kaca pembesar interaktif saat kursor diarahkan ke diagram'
                  : 'Toggle interactive optical magnifier lens on hover'
              }
            >
              <span>🔍 {locale === 'id' ? 'Lensa 2.2×' : 'Loupe 2.2×'}</span>
            </button>

            {/* Backdrop Mat Contrast Switch */}
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setDarkMat((v) => !v)}
              title={locale === 'id' ? 'Ubah kontras meja gambar' : 'Toggle drafting mat contrast'}
            >
              <span>{darkMat ? '☀ Light' : '☾ Dark'}</span>
            </button>

            <button
              type="button"
              className="btn btn-sm diagram-preview-trigger"
              onClick={() => onOpenLightbox(currentVisual)}
            >
              {expandLabel}
            </button>

            <a
              className="btn btn-sm"
              href={currentVisual.svg}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShareLinkIcon size={12} />
              <span>{svgLabel}</span>
            </a>
          </div>
        </div>

        {/* CAD Canvas Frame with Corner Crosshairs & Live Optical Loupe */}
        <div
          ref={frameRef}
          className={`bp-canvas-viewport${darkMat ? ' is-dark-mat' : ''}${
            stageScale > 1 ? ' is-zoomed' : ''
          }${loupeActive && stageScale === 1 ? ' has-loupe' : ''}`}
          onPointerMove={handleFramePointerMove}
          onPointerLeave={() => setLoupePos((prev) => ({ ...prev, visible: false }))}
        >
          <span className="bp-corner tl" aria-hidden="true" />
          <span className="bp-corner tr" aria-hidden="true" />
          <span className="bp-corner bl" aria-hidden="true" />
          <span className="bp-corner br" aria-hidden="true" />

          <div
            className="bp-canvas-inner"
            style={{
              width: stageScale > 1 ? `${stageScale * 100}%` : '100%'
            }}
          >
            <img
              key={currentVisual.id}
              className="blueprint-img-enter"
              src={currentVisual.png}
              alt={currentVisual.title}
              onClick={() => onOpenLightbox(currentVisual)}
            />
          </div>

          {loupeActive && stageScale === 1 && loupePos.visible && (
            <div
              className="bp-optical-loupe"
              style={{
                left: `${loupePos.x}px`,
                top: `${loupePos.y}px`,
                backgroundImage: `url(${currentVisual.png})`,
                backgroundPosition: `${loupePos.pctX}% ${loupePos.pctY}%`
              }}
              aria-hidden="true"
            >
              <span className="bp-loupe-tag">2.2×</span>
            </div>
          )}
        </div>

        <div className="bp-stage-footer">
          <span className="bp-hint-desktop hide-mobile">
            {loupeActive && stageScale === 1
              ? locale === 'id'
                ? 'Arahkan kursor ke diagram untuk membaca detail dengan Lensa 2.2×, atau klik gambar untuk layar penuh.'
                : 'Hover anywhere over the blueprint to inspect details with the 2.2× Optical Loupe, or click for fullscreen.'
              : locale === 'id'
                ? 'Klik gambar untuk membuka mode layar penuh beresolusi tinggi.'
                : 'Click the blueprint to open fullscreen high-resolution view.'}
          </span>
          <span className="mobile-zoom-hint">{mobileHint}</span>
          <div className="bp-dots" aria-hidden="true">
            {visuals.map((v, i) => (
              <span key={v.id} className={`bp-dot${i === activeIdx ? ' is-active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
