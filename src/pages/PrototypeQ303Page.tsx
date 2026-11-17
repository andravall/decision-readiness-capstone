import React, { useEffect, useRef, useState } from 'react';
import { AuditTimeline } from '../components/AuditTimeline';
import { DecisionWorkbench, WorkbenchScreen } from '../components/DecisionWorkbench';
import { MemberRosterList } from '../components/MemberRosterList';
import { MobileDecisionDock } from '../components/MobileDecisionDock';
import { ProtocolRail } from '../components/ProtocolRail';
import { ReadinessDiagnostics } from '../components/ReadinessDiagnostics';
import { StatusBadge, ToneIcon } from '../components/StatusBadge';
import { TopNavbar } from '../components/TopNavbar';
import {
  RESPONSE_TONES,
  STATUS_TONES,
  createUid,
  evaluateReadiness
} from '../domain/readiness';
import { AuditEntry, MemberItem, ProtocolStatusKey, ResponseKey, SemanticTone } from '../domain/types';
import { useLanguage } from '../i18n/LanguageContext';

const INITIAL_Q303_MEMBERS: MemberItem[] = [
  { id: 'm1', name: 'Alya', required: true, response: 'available_certain', updatedAt: '18.02 WIB', driftedAfterFinal: false },
  { id: 'm2', name: 'Bima', required: true, response: 'no_response', updatedAt: '—', driftedAfterFinal: false },
  { id: 'm3', name: 'Citra', required: true, response: 'maybe_tentative', updatedAt: '18.06 WIB', driftedAfterFinal: false },
  { id: 'm4', name: 'Damar', required: false, response: 'available_certain', updatedAt: '18.07 WIB', driftedAfterFinal: false },
  { id: 'm5', name: 'Eka', required: false, response: 'unavailable', updatedAt: '18.10 WIB', driftedAfterFinal: false }
];

export const PrototypeQ303Page: React.FC = () => {
  const { locale, t } = useLanguage();
  const [members, setMembers] = useState<MemberItem[]>(() =>
    INITIAL_Q303_MEMBERS.map((m) => ({ ...m }))
  );
  const [status, setStatus] = useState<ProtocolStatusKey>('proposal');
  const [history, setHistory] = useState<AuditEntry[]>([]);
  const [screen, setScreen] = useState<WorkbenchScreen>('board');
  const [clock, setClock] = useState<number>(10);
  const [finalReason, setFinalReason] = useState<string>('');
  const [finalAt, setFinalAt] = useState<string>('');
  const [announcedAt, setAnnouncedAt] = useState<string>('');
  const [lastDriftActor, setLastDriftActor] = useState<string>('');
  const [lastDriftFrom, setLastDriftFrom] = useState<ResponseKey | null>(null);
  const [lastDriftTo, setLastDriftTo] = useState<ResponseKey | null>(null);
  const [lastDriftAt, setLastDriftAt] = useState<string>('');
  const [toast, setToast] = useState<{ text: string; tone: SemanticTone } | null>(null);

  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setToast(null);
  }, [locale]);

  const evaluation = evaluateReadiness(members);

  const nextSimulatedTime = () => {
    const next = clock + 1;
    setClock(next);
    return `18.${String(next).padStart(2, '0')} WIB`;
  };

  const scrollToPanelOnMobile = () => {
    setTimeout(() => {
      if (window.innerWidth <= 1020 && panelRef.current) {
        panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  const handleReset = (showBanner = true) => {
    setMembers(INITIAL_Q303_MEMBERS.map((m) => ({ ...m })));
    setStatus('proposal');
    setHistory([]);
    setScreen('board');
    setClock(10);
    setFinalReason('');
    setFinalAt('');
    setAnnouncedAt('');
    setLastDriftActor('');
    setLastDriftFrom(null);
    setLastDriftTo(null);
    setLastDriftAt('');
    setToast(showBanner ? { text: t.q303.toastReset, tone: 'accent' } : null);
  };

  const handleSaveMember = (idx: number, nextResp: ResponseKey) => {
    const current = members[idx];
    if (!current) return;

    if (current.response === nextResp) {
      setToast({ text: t.q303.toastNoChange(current.name), tone: 'accent' });
      setScreen('board');
      return;
    }

    const at = nextSimulatedTime();
    const prevResp = current.response;
    const wasFinal = status === 'final';

    const updatedMembers = members.map((m, i) =>
      i === idx
        ? {
            ...m,
            response: nextResp,
            updatedAt: at,
            driftedAfterFinal: wasFinal ? true : m.driftedAfterFinal
          }
        : m
    );
    setMembers(updatedMembers);

    const newEntries: AuditEntry[] = [
      {
        id: createUid('aud'),
        kind: 'response_updated',
        tone:
          RESPONSE_TONES[nextResp] === 'good'
            ? 'good'
            : RESPONSE_TONES[nextResp] === 'alert'
              ? 'alert'
              : 'accent',
        at,
        actorName: current.name,
        fromResponse: prevResp,
        toResponse: nextResp
      }
    ];

    if (wasFinal) {
      setStatus('needs_review');
      setLastDriftActor(current.name);
      setLastDriftFrom(prevResp);
      setLastDriftTo(nextResp);
      setLastDriftAt(at);
      newEntries.unshift({
        id: createUid('aud'),
        kind: 'post_final_drift',
        tone: 'alert',
        at,
        actorName: current.name
      });
      setToast({ text: t.q303.toastDrift(current.name), tone: 'alert' });
    } else {
      setToast({
        text: t.q303.toastResponseSaved(current.name, t.responses[nextResp].label, at),
        tone: RESPONSE_TONES[nextResp] === 'good' ? 'good' : 'accent'
      });
    }

    setHistory((prev) => [...newEntries, ...prev]);
    setScreen('board');
  };

  const handleMarkProvisional = () => {
    const at = nextSimulatedTime();
    const targetNames = evaluation.pendingRequired.map((m) => m.name);
    setStatus('provisional');
    setMembers((prev) => prev.map((m) => ({ ...m, driftedAfterFinal: false })));
    setHistory((prev) => [
      {
        id: createUid('aud'),
        kind: 'protocol_provisional',
        tone: 'warn',
        at,
        targetNames
      },
      ...prev
    ]);
    setToast({ text: t.q303.toastProvisional, tone: 'warn' });
    setScreen('followup');
  };

  const handleLockFinal = (reason: string) => {
    const at = nextSimulatedTime();
    setStatus('final');
    setFinalReason(reason);
    setFinalAt(at);
    setAnnouncedAt('');
    setLastDriftActor('');
    setMembers((prev) => prev.map((m) => ({ ...m, driftedAfterFinal: false })));
    setHistory((prev) => [
      {
        id: createUid('aud'),
        kind: 'final_locked',
        tone: 'good',
        at,
        reasonText: reason
      },
      ...prev
    ]);
    setToast({ text: t.q303.toastFinalized(at), tone: 'good' });
    setScreen('board');
  };

  const handleMarkAnnounced = () => {
    const at = nextSimulatedTime();
    setAnnouncedAt(at);
    setHistory((prev) => [
      {
        id: createUid('aud'),
        kind: 'announced',
        tone: 'good',
        at
      },
      ...prev
    ]);
    setToast({ text: t.q303.toastAnnounced(at), tone: 'good' });
    setScreen('board');
  };

  const lastDriftSummary =
    lastDriftActor && lastDriftFrom && lastDriftTo
      ? `${lastDriftActor} (${t.responses[lastDriftFrom].label} → ${t.responses[lastDriftTo].label} · ${lastDriftAt})`
      : undefined;

  const mobileCta =
    typeof screen === 'number'
      ? t.common.mobileJumpForm
      : status === 'final'
        ? t.common.mobileJumpAnnounce
        : t.common.mobileJumpDecision;

  return (
    <>
      <TopNavbar
        mode="q303-isolated"
        rightSlot={
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => handleReset(true)}
            data-testid="reset-top"
          >
            {t.nav.resetShort}
          </button>
        }
      />

      <main className="container workspace has-dock">
        {toast && (
          <div
            className={`live-toast${
              toast.tone === 'warn'
                ? ' tone-warn'
                : toast.tone === 'good'
                  ? ' tone-good'
                  : toast.tone === 'alert'
                    ? ' tone-alert'
                    : ''
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="live-toast-content">
              <ToneIcon tone={toast.tone} />
              <span>{toast.text}</span>
            </div>
            <button
              type="button"
              className="live-toast-dismiss"
              onClick={() => setToast(null)}
            >
              {t.common.closeBtn}
            </button>
          </div>
        )}

        <section className="hero-shell" aria-labelledby="q303-title">
          <div className="hero-main">
            <div>
              <p className="eyebrow">{t.q303.eyebrow}</p>
              <h1 className="hero-title" id="q303-title">
                {t.q303.meetingTitle}
              </h1>
              <div className="meta-strip">
                <span className="meta-chip">{t.q303.meetingDate}</span>
                <span className="meta-chip">{t.q303.meetingTime}</span>
                <span className="meta-chip">{t.q303.meetingMode}</span>
                <span className="meta-chip rule-chip">{t.q303.scenarioRuleChip}</span>
              </div>
            </div>

            <div className="status-box" aria-live="polite">
              <div className="status-box-top">
                <span className="diag-label">{t.common.statusDecisionLabel}</span>
                <StatusBadge
                  label={t.statuses[status].label}
                  tone={STATUS_TONES[status]}
                />
              </div>
              <p className="status-box-caption">{t.statuses[status].caption}</p>
            </div>
          </div>

          <ProtocolRail status={status} history={history} />
        </section>

        <ReadinessDiagnostics evaluation={evaluation} totalMembers={members.length} />

        <div className="main-grid">
          <MemberRosterList
            members={members}
            editingIndex={typeof screen === 'number' ? screen : null}
            onSelectEdit={(idx) => {
              const next = screen === idx ? 'board' : idx;
              setScreen(next);
              if (typeof next === 'number') scrollToPanelOnMobile();
            }}
          />

          <div className="side-stack">
            <DecisionWorkbench
              screen={screen}
              status={status}
              members={members}
              evaluation={evaluation}
              meetingTitle={t.q303.meetingTitle}
              dateFormatted={t.q303.meetingDate}
              timeFormatted={t.q303.meetingTime}
              modeFormatted={t.q303.meetingMode}
              finalReason={finalReason}
              finalAt={finalAt}
              announcedAt={announcedAt}
              lastDriftSummary={lastDriftSummary}
              isSimulation
              panelRef={panelRef}
              onChangeScreen={(next) => {
                setScreen(next);
                scrollToPanelOnMobile();
              }}
              onSaveMemberUpdate={handleSaveMember}
              onMarkProvisional={handleMarkProvisional}
              onLockFinal={handleLockFinal}
              onMarkAnnounced={handleMarkAnnounced}
            />

            <AuditTimeline history={history} />
          </div>
        </div>

        <footer className="workspace-footer">
          <span>{t.q303.footerNote}</span>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => handleReset(true)}
            data-testid="reset-bottom"
          >
            {t.q303.resetFullBtn}
          </button>
        </footer>
      </main>

      <MobileDecisionDock
        readyCount={evaluation.readyCount}
        requiredTotal={evaluation.requiredMembers.length}
        statusLabel={t.statuses[status].label}
        subtext={
          evaluation.canFinalize
            ? t.common.mobileAllMet
            : t.common.mobilePendingCount(evaluation.pendingRequired.length)
        }
        ctaLabel={mobileCta}
        onJump={() => {
          if (screen === 'board') {
            setScreen(status === 'final' ? 'announcement' : 'review');
          } else {
            scrollToPanelOnMobile();
          }
        }}
      />
    </>
  );
};
