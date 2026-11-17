import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AuditTimeline } from '../components/AuditTimeline';
import { DecisionWorkbench, WorkbenchScreen } from '../components/DecisionWorkbench';
import { MemberRosterList } from '../components/MemberRosterList';
import { MobileDecisionDock } from '../components/MobileDecisionDock';
import { ProtocolRail } from '../components/ProtocolRail';
import { ReadinessDiagnostics } from '../components/ReadinessDiagnostics';
import { StatusBadge, ToneIcon } from '../components/StatusBadge';
import { TopNavbar } from '../components/TopNavbar';
import {
  RESPONSE_ORDER,
  RESPONSE_TONES,
  STATUS_TONES,
  createUid,
  decodeProposalSnapshot,
  encodeProposalSnapshot,
  evaluateReadiness,
  formatIsoDate,
  formatMeetingTime,
  nowTimeWIB,
  validateProposalDraft
} from '../domain/readiness';
import {
  AuditEntry,
  ProposalDraftInput,
  ProposalItem,
  ProposalStore,
  ResponseKey,
  SemanticTone,
  ValidationErrorCode
} from '../domain/types';
import { useLanguage } from '../i18n/LanguageContext';

const STORAGE_KEY = 'drb_q304_core_v2';

function loadProposalStore(): ProposalStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 2, activeId: null, proposals: [] };
    const parsed = JSON.parse(raw) as ProposalStore;
    if (!parsed || !Array.isArray(parsed.proposals)) {
      return { version: 2, activeId: null, proposals: [] };
    }
    return parsed;
  } catch {
    return { version: 2, activeId: null, proposals: [] };
  }
}

function saveProposalStore(store: ProposalStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore storage quota errors
  }
}

function makeEmptyDraft(): ProposalDraftInput {
  return {
    title: '',
    date: '2026-11-24',
    time: '19:30',
    tz: 'WIB',
    mode: 'Google Meet',
    members: [
      { name: '', required: true, response: 'no_response' },
      { name: '', required: true, response: 'no_response' },
      { name: '', required: false, response: 'no_response' }
    ]
  };
}

export const CoreMvpQ304Page: React.FC = () => {
  const { locale, t } = useLanguage();
  const [store, setStore] = useState<ProposalStore>(loadProposalStore);
  const [showBuilder, setShowBuilder] = useState<boolean>(
    () => loadProposalStore().proposals.length === 0
  );
  const [draft, setDraft] = useState<ProposalDraftInput>(makeEmptyDraft);
  const [formErrors, setFormErrors] = useState<ValidationErrorCode[]>([]);
  const [screen, setScreen] = useState<WorkbenchScreen>('board');
  const [inlineName, setInlineName] = useState<string>('');
  const [inlineRole, setInlineRole] = useState<'required' | 'optional'>('optional');
  const [copiedSnapshot, setCopiedSnapshot] = useState<boolean>(false);
  const [toast, setToast] = useState<{ text: string; tone: SemanticTone } | null>(null);

  const panelRef = useRef<HTMLElement | null>(null);

  const importSnapshotFromHash = useCallback(() => {
    const hash = window.location.hash || '';
    if (!hash.startsWith('#snapshot=')) return;
    const token = hash.slice('#snapshot='.length);
    const decoded = decodeProposalSnapshot(token);
    const freshStore = loadProposalStore();

    if (decoded) {
      const exists = freshStore.proposals.find((p) => p.id === decoded.id);
      const nextProposals = exists
        ? freshStore.proposals
        : [{ ...decoded, id: decoded.id || createUid('prop') }, ...freshStore.proposals];
      const nextActiveId = decoded.id || nextProposals[0].id;
      const updatedStore: ProposalStore = {
        version: 2,
        activeId: nextActiveId,
        proposals: nextProposals
      };
      saveProposalStore(updatedStore);
      setStore(updatedStore);
      setShowBuilder(false);
      setScreen('board');
      setToast({ text: t.q304.toastSnapshotLoaded(decoded.title), tone: 'good' });
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      setToast({ text: t.q304.toastSnapshotInvalid, tone: 'alert' });
    }
  }, [t.q304]);

  useEffect(() => {
    setToast(null);
  }, [locale]);

  useEffect(() => {
    importSnapshotFromHash();
    const onHash = () => importSnapshotFromHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [importSnapshotFromHash]);

  const activeProposal: ProposalItem | null =
    store.proposals.find((p) => p.id === store.activeId) || store.proposals[0] || null;

  const updateStore = (updater: (prev: ProposalStore) => ProposalStore) => {
    setStore((prev) => {
      const next = updater(prev);
      saveProposalStore(next);
      return next;
    });
  };

  const mutateActiveProposal = (mutator: (p: ProposalItem) => ProposalItem) => {
    if (!activeProposal) return;
    updateStore((prev) => ({
      ...prev,
      proposals: prev.proposals.map((p) => (p.id === activeProposal.id ? mutator(p) : p))
    }));
  };

  const scrollToPanelOnMobile = () => {
    setTimeout(() => {
      if (window.innerWidth <= 1020 && panelRef.current) {
        panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  const handleFillSample = () => {
    setDraft({
      title: t.q304.sampleTitle,
      date: '2026-11-22',
      time: '20:00',
      tz: 'WIB',
      mode: t.q304.sampleMode,
      members: [
        { name: 'Nadia', required: true, response: 'available_certain' },
        { name: 'Rafi', required: true, response: 'no_response' },
        { name: 'Salsa', required: true, response: 'maybe_tentative' },
        { name: 'Tegar', required: false, response: 'unavailable' }
      ]
    });
    setFormErrors([]);
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const { errors, cleanTitle, validMembers } = validateProposalDraft(draft);
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    const stamp = nowTimeWIB();
    const newId = createUid('prop');
    const requiredCount = validMembers.filter((m) => m.required).length;

    const created: ProposalItem = {
      id: newId,
      title: cleanTitle,
      date: draft.date,
      time: draft.time,
      tz: draft.tz,
      mode: draft.mode.trim() || 'Online',
      status: 'proposal',
      finalReason: '',
      finalAt: '',
      announcedAt: '',
      updatedAt: stamp,
      members: validMembers.map((m) => ({
        id: createUid('m'),
        name: m.name,
        required: m.required,
        response: m.response,
        updatedAt: m.response === 'no_response' ? '—' : stamp,
        driftedAfterFinal: false
      })),
      history: [
        {
          id: createUid('aud'),
          kind: 'proposal_created',
          tone: 'accent',
          at: stamp,
          proposalTitle: cleanTitle,
          totalMembers: validMembers.length,
          requiredCount
        }
      ]
    };

    updateStore((prev) => ({
      version: 2,
      activeId: created.id,
      proposals: [created, ...prev.proposals]
    }));

    setFormErrors([]);
    setDraft(makeEmptyDraft());
    setShowBuilder(false);
    setScreen('board');
    setToast({ text: t.q304.toastCreated(cleanTitle), tone: 'good' });
  };

  const handleCopySnapshot = () => {
    if (!activeProposal) return;
    const token = encodeProposalSnapshot(activeProposal);
    const snapUrl = `${window.location.origin}${window.location.pathname}#snapshot=${token}`;
    const finish = () => {
      setCopiedSnapshot(true);
      setTimeout(() => setCopiedSnapshot(false), 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(snapUrl).then(finish).catch(finish);
    } else {
      finish();
    }
  };

  const handleDeleteActive = () => {
    if (!activeProposal) return;
    const title = activeProposal.title;
    updateStore((prev) => {
      const remaining = prev.proposals.filter((p) => p.id !== activeProposal.id);
      if (remaining.length === 0) setShowBuilder(true);
      return {
        version: 2,
        activeId: remaining[0]?.id || null,
        proposals: remaining
      };
    });
    setScreen('board');
    setToast({ text: t.q304.toastDeleted(title), tone: 'warn' });
  };

  const handleInlineAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProposal) return;
    const cleanName = inlineName.trim();
    if (!cleanName) {
      setToast({ text: t.q304.toastInlineNameEmpty, tone: 'alert' });
      return;
    }
    if (activeProposal.members.some((m) => m.name.toLowerCase() === cleanName.toLowerCase())) {
      setToast({ text: t.q304.toastInlineDupe(cleanName), tone: 'alert' });
      return;
    }

    const at = nowTimeWIB();
    const isReq = inlineRole === 'required';

    mutateActiveProposal((p) => {
      const wasFinalAndReq = p.status === 'final' && isReq;
      const newAudit: AuditEntry[] = [
        {
          id: createUid('aud'),
          kind: 'member_added',
          tone: 'accent',
          at,
          actorName: cleanName,
          roleChangedTo: inlineRole
        }
      ];
      if (wasFinalAndReq) {
        newAudit.unshift({
          id: createUid('aud'),
          kind: 'post_final_drift',
          tone: 'alert',
          at,
          actorName: cleanName
        });
      }
      return {
        ...p,
        status: wasFinalAndReq ? 'needs_review' : p.status,
        updatedAt: at,
        members: [
          ...p.members,
          {
            id: createUid('m'),
            name: cleanName,
            required: isReq,
            response: 'no_response',
            updatedAt: '—',
            driftedAfterFinal: wasFinalAndReq
          }
        ],
        history: [...newAudit, ...p.history]
      };
    });

    setInlineName('');
    setToast({ text: t.q304.toastInlineAdded(cleanName), tone: 'good' });
  };

  const handleSaveMemberUpdate = (
    idx: number,
    nextResp: ResponseKey,
    nextReq: boolean
  ) => {
    if (!activeProposal) return;
    const target = activeProposal.members[idx];
    if (!target) return;

    const remainingRequired = activeProposal.members.filter((m, i) =>
      i === idx ? nextReq : m.required
    ).length;

    if (remainingRequired === 0) {
      setToast({ text: t.q304.toastMinOneRequired, tone: 'alert' });
      return;
    }

    const respChanged = target.response !== nextResp;
    const roleChanged = target.required !== nextReq;

    if (!respChanged && !roleChanged) {
      setScreen('board');
      return;
    }

    const at = nowTimeWIB();
    const wasFinal = activeProposal.status === 'final';

    mutateActiveProposal((p) => {
      const entries: AuditEntry[] = [
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
          actorName: target.name,
          fromResponse: target.response,
          toResponse: nextResp,
          roleChangedTo: roleChanged ? (nextReq ? 'required' : 'optional') : undefined
        }
      ];

      if (wasFinal) {
        entries.unshift({
          id: createUid('aud'),
          kind: 'post_final_drift',
          tone: 'alert',
          at,
          actorName: target.name
        });
      }

      return {
        ...p,
        status: wasFinal ? 'needs_review' : p.status,
        lastDriftActor: wasFinal ? target.name : p.lastDriftActor,
        lastDriftFrom: wasFinal ? target.response : p.lastDriftFrom,
        lastDriftTo: wasFinal ? nextResp : p.lastDriftTo,
        lastDriftAt: wasFinal ? at : p.lastDriftAt,
        updatedAt: at,
        members: p.members.map((m, i) =>
          i === idx
            ? {
                ...m,
                response: nextResp,
                required: nextReq,
                updatedAt: at,
                driftedAfterFinal: wasFinal ? true : m.driftedAfterFinal
              }
            : m
        ),
        history: [...entries, ...p.history]
      };
    });

    setToast({
      text: wasFinal
        ? t.q303.toastDrift(target.name)
        : t.q303.toastResponseSaved(target.name, t.responses[nextResp].label, at),
      tone: wasFinal ? 'alert' : 'good'
    });
    setScreen('board');
  };

  const evaluation = activeProposal ? evaluateReadiness(activeProposal.members) : null;

  return (
    <>
      <TopNavbar
        mode="q304"
        rightSlot={
          <>
            <span className="meta-chip hide-mobile" data-testid="storage-count">
              {t.nav.storedLocalCount(store.proposals.length)}
            </span>
            <button
              type="button"
              className="btn primary btn-sm"
              onClick={() => {
                setShowBuilder((v) => !v);
                setFormErrors([]);
              }}
              data-testid="btn-toggle-builder"
            >
              {t.nav.newProposalBtn}
            </button>
          </>
        }
      />

      <main className={`container workspace${activeProposal ? ' has-dock' : ''}`}>
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

        {store.proposals.length > 0 && (
          <nav className="switcher-bar" aria-label="Saved proposals">
            <div className="proposal-tabs">
              {store.proposals.map((p) => {
                const dotTone =
                  p.status === 'final'
                    ? 'good'
                    : p.status === 'provisional'
                      ? 'warn'
                      : p.status === 'needs_review'
                        ? 'alert'
                        : '';
                const isActive = activeProposal?.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`prop-tab${isActive ? ' is-active' : ''}`}
                    onClick={() => {
                      updateStore((prev) => ({ ...prev, activeId: p.id }));
                      setShowBuilder(false);
                      setScreen('board');
                    }}
                  >
                    <span className={`prop-tab-dot ${dotTone}`} aria-hidden="true" />
                    <span>{p.title}</span>
                  </button>
                );
              })}
            </div>

            {activeProposal && (
              <div className="switcher-actions">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleCopySnapshot}
                  data-testid="btn-copy-snapshot"
                  title={t.q304.copySnapshotBtn}
                >
                  <span className="hide-mobile">
                    {copiedSnapshot ? t.q304.snapshotCopied : t.q304.copySnapshotBtn}
                  </span>
                  <span className="mobile-only-label">
                    {copiedSnapshot ? '✓ Copied' : 'Snapshot'}
                  </span>
                </button>
                <button
                  type="button"
                  className="btn btn-sm danger-ghost"
                  onClick={handleDeleteActive}
                  title={t.q304.deleteProposalBtn}
                  aria-label={t.q304.deleteProposalBtn}
                >
                  <span className="hide-mobile">{t.q304.deleteProposalBtn}</span>
                  <span className="mobile-only-label">✕</span>
                </button>
              </div>
            )}
          </nav>
        )}

        {(showBuilder || store.proposals.length === 0) && (
          <section className="builder-shell" aria-labelledby="builder-heading">
            <div className="builder-head">
              <div>
                <p className="eyebrow">
                  {store.proposals.length === 0 ? t.q304.emptyEyebrow : t.q304.addEyebrow}
                </p>
                <h1 id="builder-heading">
                  {store.proposals.length === 0 ? t.q304.emptyHeading : t.q304.addHeading}
                </h1>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--ink-secondary)' }}>
                  {t.q304.builderSub}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleFillSample}
                  data-testid="btn-fill-sample"
                >
                  {t.q304.fillSampleBtn}
                </button>
                {store.proposals.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      setShowBuilder(false);
                      setFormErrors([]);
                    }}
                  >
                    {t.q304.closeBuilderBtn}
                  </button>
                )}
              </div>
            </div>

            {formErrors.length > 0 && (
              <div
                className="callout alert"
                role="alert"
                data-testid="form-error-box"
                style={{ marginTop: 0, marginBottom: '18px' }}
              >
                <strong style={{ display: 'block', marginBottom: '4px' }}>
                  {t.q304.formErrorHeading}
                </strong>
                <ul>
                  {formErrors.map((err, idx) => (
                    <li key={idx}>{t.q304.formatValidationError(err)}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleCreateProposal} noValidate data-testid="create-proposal-form">
              <div className="builder-grid">
                <div className="form-panel">
                  <div className="form-panel-title">
                    <span>{t.q304.panel1Title}</span>
                  </div>
                  <div className="field-row">
                    <label className="field-label" htmlFor="f-title">
                      {t.q304.titleLabel}
                    </label>
                    <input
                      type="text"
                      id="f-title"
                      value={draft.title}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                      placeholder={t.q304.titlePlaceholder}
                    />
                  </div>
                  <div className="field-row field-cols-2">
                    <div>
                      <label className="field-label" htmlFor="f-date">
                        {t.q304.dateLabel}
                      </label>
                      <input
                        type="date"
                        id="f-date"
                        value={draft.date}
                        onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="f-time">
                        {t.q304.timeLabel}
                      </label>
                      <input
                        type="time"
                        id="f-time"
                        value={draft.time}
                        onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="field-row field-cols-2">
                    <div>
                      <label className="field-label" htmlFor="f-tz">
                        {t.q304.tzLabel}
                      </label>
                      <select
                        id="f-tz"
                        value={draft.tz}
                        onChange={(e) =>
                          setDraft({ ...draft, tz: e.target.value as 'WIB' | 'WITA' | 'WIT' })
                        }
                      >
                        <option value="WIB">WIB</option>
                        <option value="WITA">WITA</option>
                        <option value="WIT">WIT</option>
                      </select>
                    </div>
                    <div>
                      <label className="field-label" htmlFor="f-mode">
                        {t.q304.modeLabel}
                      </label>
                      <input
                        type="text"
                        id="f-mode"
                        value={draft.mode}
                        onChange={(e) => setDraft({ ...draft, mode: e.target.value })}
                        placeholder={t.q304.modePlaceholder}
                      />
                    </div>
                  </div>
                  <span className="field-hint">{t.q304.ruleHint}</span>
                </div>

                <div className="form-panel">
                  <div className="form-panel-title">
                    <span>{t.q304.panel2Title}</span>
                    <span className="diag-label">{t.q304.min2Label}</span>
                  </div>
                  <div className="roster-rows">
                    {draft.members.map((m, idx) => (
                      <div key={idx} className="roster-item" data-roster-row={idx}>
                        <input
                          type="text"
                          value={m.name}
                          placeholder={t.q304.memberPlaceholder(idx + 1)}
                          onChange={(e) => {
                            const copy = [...draft.members];
                            copy[idx] = { ...copy[idx], name: e.target.value };
                            setDraft({ ...draft, members: copy });
                          }}
                        />
                        <select
                          value={m.required ? 'required' : 'optional'}
                          onChange={(e) => {
                            const copy = [...draft.members];
                            copy[idx] = { ...copy[idx], required: e.target.value === 'required' };
                            setDraft({ ...draft, members: copy });
                          }}
                        >
                          <option value="required">{t.common.requiredRole}</option>
                          <option value="optional">{t.common.optionalRole}</option>
                        </select>
                        <select
                          value={m.response}
                          onChange={(e) => {
                            const copy = [...draft.members];
                            copy[idx] = { ...copy[idx], response: e.target.value as ResponseKey };
                            setDraft({ ...draft, members: copy });
                          }}
                        >
                          {RESPONSE_ORDER.map((rk) => (
                            <option key={rk} value={rk}>
                              {t.responses[rk].label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="btn-icon-remove"
                          onClick={() => {
                            if (draft.members.length > 2) {
                              setDraft({
                                ...draft,
                                members: draft.members.filter((_, i) => i !== idx)
                              });
                            } else {
                              const copy = [...draft.members];
                              copy[idx] = { name: '', required: idx === 0, response: 'no_response' };
                              setDraft({ ...draft, members: copy });
                            }
                          }}
                          aria-label="Remove row"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        members: [
                          ...draft.members,
                          { name: '', required: false, response: 'no_response' }
                        ]
                      })
                    }
                  >
                    {t.q304.addRowBtn}
                  </button>
                </div>
              </div>

              <div className="builder-footer">
                <span className="field-hint">{t.q304.builderFooterHint}</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {store.proposals.length > 0 && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setShowBuilder(false);
                        setFormErrors([]);
                      }}
                    >
                      {t.common.cancelBtn}
                    </button>
                  )}
                  <button type="submit" className="btn primary" data-testid="btn-submit-proposal">
                    {t.q304.submitProposalBtn}
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        {activeProposal && evaluation && (
          <>
            <section className="hero-shell" aria-labelledby="active-prop-title">
              <div className="hero-main">
                <div>
                  <p className="eyebrow">
                    {t.q304.savedProposalEyebrow(activeProposal.updatedAt)}
                  </p>
                  <h1 className="hero-title" id="active-prop-title">
                    {activeProposal.title}
                  </h1>
                  <div className="meta-strip">
                    <span className="meta-chip">
                      {formatIsoDate(activeProposal.date, locale)}
                    </span>
                    <span className="meta-chip">
                      {formatMeetingTime(activeProposal.time, activeProposal.tz)}
                    </span>
                    <span className="meta-chip">{activeProposal.mode}</span>
                    <span className="meta-chip rule-chip">
                      {t.q304.ruleChipDynamic(evaluation.requiredMembers.length)}
                    </span>
                  </div>
                </div>

                <div className="status-box" aria-live="polite">
                  <div className="status-box-top">
                    <span className="diag-label">{t.common.statusDecisionLabel}</span>
                    <StatusBadge
                      label={t.statuses[activeProposal.status].label}
                      tone={STATUS_TONES[activeProposal.status]}
                    />
                  </div>
                  <p className="status-box-caption">
                    {t.statuses[activeProposal.status].caption}
                  </p>
                </div>
              </div>

              <ProtocolRail
                status={activeProposal.status}
                history={activeProposal.history}
                persistentMode
              />
            </section>

            <ReadinessDiagnostics
              evaluation={evaluation}
              totalMembers={activeProposal.members.length}
            />

            <div className="main-grid">
              <MemberRosterList
                members={activeProposal.members}
                editingIndex={typeof screen === 'number' ? screen : null}
                onSelectEdit={(idx) => {
                  const next = screen === idx ? 'board' : idx;
                  setScreen(next);
                  if (typeof next === 'number') scrollToPanelOnMobile();
                }}
                bottomSlot={
                  <form className="inline-add-member" onSubmit={handleInlineAddMember}>
                    <input
                      type="text"
                      value={inlineName}
                      onChange={(e) => setInlineName(e.target.value)}
                      placeholder={t.q304.inlineAddPlaceholder}
                    />
                    <select
                      value={inlineRole}
                      onChange={(e) =>
                        setInlineRole(e.target.value as 'required' | 'optional')
                      }
                    >
                      <option value="required">{t.common.requiredRole}</option>
                      <option value="optional">{t.common.optionalRole}</option>
                    </select>
                    <button type="submit" className="btn btn-sm">
                      {t.q304.inlineAddBtn}
                    </button>
                  </form>
                }
              />

              <div className="side-stack">
                <DecisionWorkbench
                  screen={screen}
                  status={activeProposal.status}
                  members={activeProposal.members}
                  evaluation={evaluation}
                  meetingTitle={activeProposal.title}
                  dateFormatted={formatIsoDate(activeProposal.date, locale)}
                  timeFormatted={formatMeetingTime(activeProposal.time, activeProposal.tz)}
                  modeFormatted={activeProposal.mode}
                  finalReason={activeProposal.finalReason}
                  finalAt={activeProposal.finalAt}
                  announcedAt={activeProposal.announcedAt}
                  lastDriftSummary={
                    activeProposal.lastDriftActor &&
                    activeProposal.lastDriftFrom &&
                    activeProposal.lastDriftTo
                      ? `${activeProposal.lastDriftActor} (${t.responses[activeProposal.lastDriftFrom].label} → ${t.responses[activeProposal.lastDriftTo].label} · ${activeProposal.lastDriftAt})`
                      : undefined
                  }
                  allowRoleChange
                  panelRef={panelRef}
                  onChangeScreen={(next) => {
                    setScreen(next);
                    scrollToPanelOnMobile();
                  }}
                  onSaveMemberUpdate={handleSaveMemberUpdate}
                  onMarkProvisional={() => {
                    const at = nowTimeWIB();
                    const names = evaluation.pendingRequired.map((m) => m.name);
                    mutateActiveProposal((p) => ({
                      ...p,
                      status: 'provisional',
                      updatedAt: at,
                      members: p.members.map((m) => ({ ...m, driftedAfterFinal: false })),
                      history: [
                        {
                          id: createUid('aud'),
                          kind: 'protocol_provisional',
                          tone: 'warn',
                          at,
                          targetNames: names
                        },
                        ...p.history
                      ]
                    }));
                    setToast({ text: t.q303.toastProvisional, tone: 'warn' });
                    setScreen('followup');
                  }}
                  onLockFinal={(reason) => {
                    const at = nowTimeWIB();
                    mutateActiveProposal((p) => ({
                      ...p,
                      status: 'final',
                      finalReason: reason,
                      finalAt: at,
                      announcedAt: '',
                      lastDriftActor: undefined,
                      updatedAt: at,
                      members: p.members.map((m) => ({ ...m, driftedAfterFinal: false })),
                      history: [
                        {
                          id: createUid('aud'),
                          kind: 'final_locked',
                          tone: 'good',
                          at,
                          reasonText: reason
                        },
                        ...p.history
                      ]
                    }));
                    setToast({ text: t.q303.toastFinalized(at), tone: 'good' });
                    setScreen('board');
                  }}
                  onMarkAnnounced={() => {
                    const at = nowTimeWIB();
                    mutateActiveProposal((p) => ({
                      ...p,
                      announcedAt: at,
                      updatedAt: at,
                      history: [
                        {
                          id: createUid('aud'),
                          kind: 'announced',
                          tone: 'good',
                          at
                        },
                        ...p.history
                      ]
                    }));
                    setToast({ text: t.q303.toastAnnounced(at), tone: 'good' });
                    setScreen('board');
                  }}
                />

                <AuditTimeline history={activeProposal.history} />
              </div>
            </div>
          </>
        )}

        <footer className="workspace-footer">
          <span>{t.q304.footerNote}</span>
          {store.proposals.length > 0 && (
            <button
              type="button"
              className="btn btn-sm danger-ghost"
              onClick={() => {
                updateStore(() => ({ version: 2, activeId: null, proposals: [] }));
                setDraft(makeEmptyDraft());
                setShowBuilder(true);
                setScreen('board');
                setToast({ text: t.q304.toastCleared, tone: 'warn' });
              }}
            >
              {t.q304.clearAllBtn}
            </button>
          )}
        </footer>
      </main>

      {activeProposal && evaluation && (
        <MobileDecisionDock
          readyCount={evaluation.readyCount}
          requiredTotal={evaluation.requiredMembers.length}
          statusLabel={t.statuses[activeProposal.status].label}
          subtext={activeProposal.title}
          ctaLabel={
            typeof screen === 'number'
              ? t.common.mobileJumpForm
              : activeProposal.status === 'final'
                ? t.common.mobileJumpAnnounce
                : t.common.mobileJumpDecision
          }
          onJump={() => {
            if (screen === 'board') {
              setScreen(activeProposal.status === 'final' ? 'announcement' : 'review');
            } else {
              scrollToPanelOnMobile();
            }
          }}
        />
      )}
    </>
  );
};
