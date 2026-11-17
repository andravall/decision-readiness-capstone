import React, { useEffect, useRef, useState } from 'react';
import { RESPONSE_ORDER, ReadinessEvaluation } from '../domain/readiness';
import { MemberItem, ProtocolStatusKey, ResponseKey } from '../domain/types';
import { useLanguage } from '../i18n/LanguageContext';
import { ToneIcon } from './StatusBadge';

export type WorkbenchScreen = 'board' | 'review' | 'followup' | 'announcement' | number;

interface DecisionWorkbenchProps {
  screen: WorkbenchScreen;
  status: ProtocolStatusKey;
  members: MemberItem[];
  evaluation: ReadinessEvaluation;
  meetingTitle: string;
  dateFormatted: string;
  timeFormatted: string;
  modeFormatted: string;
  finalReason: string;
  finalAt: string;
  announcedAt: string;
  lastDriftSummary?: string;
  allowRoleChange?: boolean;
  isSimulation?: boolean;
  panelRef?: React.RefObject<HTMLElement | null>;
  onChangeScreen: (next: WorkbenchScreen) => void;
  onSaveMemberUpdate: (memberIdx: number, nextResp: ResponseKey, nextReq: boolean) => void;
  onMarkProvisional: () => void;
  onLockFinal: (reason: string) => void;
  onMarkAnnounced: () => void;
}

export const DecisionWorkbench: React.FC<DecisionWorkbenchProps> = ({
  screen,
  status,
  members,
  evaluation,
  meetingTitle,
  dateFormatted,
  timeFormatted,
  modeFormatted,
  finalReason,
  finalAt,
  announcedAt,
  lastDriftSummary,
  allowRoleChange = false,
  isSimulation = false,
  panelRef,
  onChangeScreen,
  onSaveMemberUpdate,
  onMarkProvisional,
  onLockFinal,
  onMarkAnnounced
}) => {
  const { locale, t } = useLanguage();
  const { requiredMembers, optionalMembers, pendingRequired, readyCount, canFinalize } = evaluation;

  const editingMember = typeof screen === 'number' ? members[screen] : null;
  const [selectedResp, setSelectedResp] = useState<ResponseKey>('no_response');
  const [selectedReq, setSelectedReq] = useState<boolean>(true);
  const [reasonDraft, setReasonDraft] = useState<string>('');
  const [copiedWa, setCopiedWa] = useState<boolean>(false);
  const reasonRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editingMember) {
      setSelectedResp(editingMember.response);
      setSelectedReq(editingMember.required);
    }
  }, [editingMember]);

  useEffect(() => {
    if (screen === 'review') {
      setReasonDraft(status === 'needs_review' && finalReason ? finalReason : '');
    }
  }, [screen, status, finalReason]);

  const panelStateCls =
    status === 'final'
      ? ' state-good'
      : status === 'provisional'
        ? ' state-warn'
        : status === 'needs_review'
          ? ' state-alert'
          : '';

  const copyToClipboard = (text: string) => {
    const done = () => {
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      done();
    }
  };

  const joinNames = (names: string[]) => {
    if (names.length <= 1) return names[0] || (locale === 'id' ? 'teman-teman' : 'team');
    if (names.length === 2) {
      return locale === 'id' ? `${names[0]} dan ${names[1]}` : `${names[0]} and ${names[1]}`;
    }
    const head = names.slice(0, -1).join(', ');
    const tail = names[names.length - 1];
    return locale === 'id' ? `${head}, dan ${tail}` : `${head}, and ${tail}`;
  };

  const renderContent = () => {
    if (typeof screen === 'number' && editingMember) {
      return (
        <>
          <div className="panel-eyebrow">
            <span>{t.workbench.updateEyebrow}</span>
            <span>{editingMember.required ? t.common.requiredRole : t.common.optionalRole}</span>
          </div>
          <h2 id="panel-title">{t.workbench.updateTitle(editingMember.name)}</h2>
          <p className="panel-lead">{t.workbench.updateLead}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSaveMemberUpdate(screen, selectedResp, selectedReq);
            }}
          >
            <div
              className="radio-cards"
              role="radiogroup"
              aria-label={t.workbench.updateTitle(editingMember.name)}
            >
              {RESPONSE_ORDER.map((rKey) => {
                const checked = selectedResp === rKey;
                const isCurrent = editingMember.response === rKey;
                return (
                  <label
                    key={rKey}
                    className={`radio-card${checked ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="member-response-opt"
                      value={rKey}
                      checked={checked}
                      onChange={() => setSelectedResp(rKey)}
                    />
                    <span className="radio-card-body">
                      <span className="radio-card-top">
                        <span className="radio-card-title">{t.responses[rKey].label}</span>
                        {isCurrent && (
                          <span className="radio-card-current">{t.common.currentTag}</span>
                        )}
                      </span>
                      <span className="radio-card-desc">{t.responses[rKey].desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>

            {allowRoleChange && (
              <div className="field-row">
                <label className="field-label" htmlFor="member-role-select">
                  {t.workbench.roleFieldLabel}
                </label>
                <select
                  id="member-role-select"
                  value={selectedReq ? 'required' : 'optional'}
                  onChange={(e) => setSelectedReq(e.target.value === 'required')}
                >
                  <option value="required">{t.workbench.roleRequiredOption}</option>
                  <option value="optional">{t.workbench.roleOptionalOption}</option>
                </select>
              </div>
            )}

            <div className="actions">
              <button type="submit" className="btn primary" data-testid="btn-save-member">
                {t.common.saveBtn}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => onChangeScreen('board')}
              >
                {t.common.cancelBtn}
              </button>
            </div>
          </form>
        </>
      );
    }

    if (screen === 'review') {
      const optCtx = optionalMembers.length
        ? optionalMembers.map((m) => `${m.name}: ${t.responses[m.response].label}`).join('; ')
        : t.common.noOptionalMsg;

      return (
        <>
          <div className="panel-eyebrow">
            <span>{t.workbench.reviewEyebrow}</span>
            <span>Confirmation Protocol</span>
          </div>
          <h2 id="panel-title">{t.workbench.reviewTitle}</h2>
          <p className="panel-lead">{t.workbench.reviewLead}</p>

          <ul className="rule-checklist">
            <li>
              <span>
                {t.workbench.check1Label(
                  requiredMembers.length,
                  t.responses.available_certain.label
                )}
              </span>
              <span className={`rule-status ${canFinalize ? 'pass' : 'wait'}`}>
                {canFinalize
                  ? t.workbench.check1Pass(readyCount, requiredMembers.length)
                  : t.workbench.check1Wait(readyCount, requiredMembers.length)}
              </span>
            </li>
            <li>
              <span>{t.workbench.check2Label(optCtx)}</span>
              <span className="rule-status info">{t.workbench.check2Info}</span>
            </li>
            <li>
              <span>{t.workbench.check3Label}</span>
              <span className={`rule-status ${canFinalize ? 'info' : 'wait'}`}>
                {canFinalize ? t.workbench.check3Required : t.workbench.check3Locked}
              </span>
            </li>
          </ul>

          {canFinalize ? (
            <>
              <div className="callout good">
                <div className="callout-title">
                  <ToneIcon tone="good" />
                  <span>{t.workbench.allMetCalloutTitle}</span>
                </div>
                {t.workbench.allMetCalloutBody}
              </div>

              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const clean = reasonDraft.trim();
                  if (!clean) {
                    if (reasonRef.current) {
                      reasonRef.current.setCustomValidity(t.workbench.reasonEmptyError);
                      reasonRef.current.reportValidity();
                    }
                    return;
                  }
                  onLockFinal(clean);
                }}
              >
                <label className="field-label" htmlFor="final-reason-textarea">
                  {t.workbench.reasonLabel}
                </label>
                <span className="field-hint">{t.workbench.reasonHint}</span>
                <textarea
                  id="final-reason-textarea"
                  ref={reasonRef}
                  value={reasonDraft}
                  onChange={(e) => {
                    e.target.setCustomValidity('');
                    setReasonDraft(e.target.value);
                  }}
                  placeholder={t.workbench.reasonPlaceholder}
                  style={{ marginTop: '8px' }}
                  required
                />
                <div className="actions">
                  <button type="submit" className="btn primary" data-testid="btn-lock-final">
                    {t.workbench.lockFinalBtn}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => onChangeScreen('board')}
                  >
                    {t.common.backBtn}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="callout warn">
                <div className="callout-title">
                  <ToneIcon tone="warn" />
                  <span>{t.workbench.blockedCalloutTitle}</span>
                </div>
                {t.workbench.blockedCalloutLead}
                <ul>
                  {pendingRequired.map((m) => (
                    <li key={m.id}>
                      <strong>{m.name}</strong> — {t.responses[m.response].label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={onMarkProvisional}
                  data-testid="btn-mark-provisional"
                >
                  {t.workbench.markProvisionalBtn}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => onChangeScreen('board')}
                >
                  {t.common.backBtn}
                </button>
              </div>
            </>
          )}
        </>
      );
    }

    if (screen === 'followup') {
      const waText = t.workbench.composeClarifyWa({
        title: meetingTitle,
        dateStr: dateFormatted,
        timeStr: timeFormatted,
        mode: modeFormatted,
        names: joinNames(pendingRequired.map((m) => m.name))
      });

      return (
        <>
          <div className="panel-eyebrow">
            <span>{t.workbench.waFollowupEyebrow}</span>
            <span>{t.statuses.provisional.label}</span>
          </div>
          <h2 id="panel-title">{t.workbench.waFollowupTitle}</h2>
          <p className="panel-lead">{t.workbench.waFollowupLead}</p>

          <div className="wa-preview">
            <div className="wa-preview-bar">
              <span>{t.workbench.waPreviewHeaderClarify}</span>
              <span>
                {isSimulation ? t.workbench.waPreviewBadgeSim : t.workbench.waPreviewBadgeReady}
              </span>
            </div>
            <pre data-testid="wa-clarify-text">{waText}</pre>
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onChangeScreen('board')}
            >
              {t.common.backToBoardBtn}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => copyToClipboard(waText)}
            >
              {copiedWa ? t.common.copiedFeedback : t.common.copyTextBtn}
            </button>
          </div>
        </>
      );
    }

    if (screen === 'announcement') {
      const waFinal = t.workbench.composeFinalWa({
        title: meetingTitle,
        dateStr: dateFormatted,
        timeStr: timeFormatted,
        mode: modeFormatted,
        reason: finalReason
      });

      return (
        <>
          <div className="panel-eyebrow">
            <span>{t.workbench.waAnnounceEyebrow}</span>
            <span>{t.statuses.final.label}</span>
          </div>
          <h2 id="panel-title">{t.workbench.waAnnounceTitle}</h2>
          <p className="panel-lead">{t.workbench.waAnnounceLead}</p>

          <div className="wa-preview">
            <div className="wa-preview-bar">
              <span>{t.workbench.waPreviewHeaderFinal}</span>
              <span>
                {isSimulation ? t.workbench.waPreviewBadgeSim : t.workbench.waPreviewBadgeReady}
              </span>
            </div>
            <pre data-testid="wa-final-text">{waFinal}</pre>
          </div>

          {announcedAt && (
            <p
              className="diag-subtext"
              style={{ color: 'var(--good-ink)', fontWeight: 600 }}
            >
              {t.workbench.announcedRecordedAt(announcedAt)}
            </p>
          )}

          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={onMarkAnnounced}
              data-testid="btn-mark-announced"
            >
              {announcedAt
                ? t.workbench.reMarkAnnouncedBtn
                : isSimulation
                  ? t.workbench.markAnnouncedSimBtn
                  : t.workbench.markAnnouncedRealBtn}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => copyToClipboard(waFinal)}
            >
              {copiedWa ? t.common.copiedFeedback : t.common.copyTextBtn}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => onChangeScreen('board')}
            >
              {t.common.backBtn}
            </button>
          </div>
        </>
      );
    }

    // Default 'board' view
    if (status === 'final') {
      return (
        <>
          <div className="panel-eyebrow">
            <span>{t.common.statusDecisionLabel}</span>
            <span>{t.workbench.boardFinalEyebrow(finalAt)}</span>
          </div>
          <h2 id="panel-title">{t.workbench.boardFinalTitle}</h2>
          <div className="callout good">
            <div className="callout-title">
              <ToneIcon tone="good" />
              <span>{t.workbench.boardFinalReasonTitle}</span>
            </div>
            {finalReason}
          </div>
          <p className="diag-subtext">
            {announcedAt
              ? t.workbench.boardFinalAnnouncedSub(announcedAt)
              : t.workbench.boardFinalReadySub}
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onChangeScreen('announcement')}
              data-testid="btn-open-announcement"
            >
              {t.workbench.openAnnounceBtn}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => onChangeScreen('review')}
            >
              {t.workbench.inspectRulesBtn}
            </button>
          </div>
        </>
      );
    }

    if (status === 'needs_review') {
      const blockingList = pendingRequired
        .map((m) => `${m.name} (${t.responses[m.response].label})`)
        .join(', ');

      return (
        <>
          <div className="panel-eyebrow">
            <span>{t.workbench.boardDriftEyebrow}</span>
            <span>{t.workbench.boardDriftBadge}</span>
          </div>
          <h2 id="panel-title">{t.workbench.boardDriftTitle}</h2>
          <div className="callout alert">
            <div className="callout-title">
              <ToneIcon tone="alert" />
              <span>{t.workbench.boardDriftCalloutTitle}</span>
            </div>
            {lastDriftSummary && (
              <div style={{ marginBottom: '6px', fontWeight: 600 }}>
                {t.workbench.boardDriftChangePrefix} {lastDriftSummary}
              </div>
            )}
            {pendingRequired.length > 0
              ? t.workbench.boardDriftBlockingMsg(blockingList)
              : t.workbench.boardDriftStillMetMsg}
          </div>
          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onChangeScreen('review')}
              data-testid="btn-open-review"
            >
              {t.workbench.reReviewBtn}
            </button>
          </div>
        </>
      );
    }

    if (canFinalize) {
      return (
        <>
          <div className="panel-eyebrow">
            <span>{t.common.statusDecisionLabel}</span>
            <span>
              {readyCount}/{requiredMembers.length} {t.responses.available_certain.short}
            </span>
          </div>
          <h2 id="panel-title">{t.workbench.boardReadyTitle}</h2>
          <div className="callout good">
            <div className="callout-title">
              <ToneIcon tone="good" />
              <span>{t.workbench.boardReadyCalloutTitle}</span>
            </div>
            {t.workbench.boardReadyCalloutBody}
          </div>
          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onChangeScreen('review')}
              data-testid="btn-open-review"
            >
              {t.workbench.reviewDecisionBtn}
            </button>
          </div>
        </>
      );
    }

    const names = pendingRequired.map((m) => m.name).join(', ');
    return (
      <>
        <div className="panel-eyebrow">
          <span>{t.common.statusDecisionLabel}</span>
          <span>
            {status === 'provisional'
              ? t.workbench.boardWaitEyebrowProvisional
              : t.workbench.boardWaitEyebrowInitial}
          </span>
        </div>
        <h2 id="panel-title">
          {status === 'provisional'
            ? t.workbench.boardWaitTitleProvisional
            : t.workbench.boardWaitTitleInitial}
        </h2>
        <div className="callout warn">
          <div className="callout-title">
            <ToneIcon tone="warn" />
            <span>{t.workbench.boardWaitFollowupTitle(names)}</span>
          </div>
          {status === 'provisional'
            ? t.workbench.boardWaitProvisionalBody
            : t.workbench.boardWaitInitialBody(pendingRequired.length)}
        </div>
        <div className="actions">
          <button
            type="button"
            className="btn primary"
            onClick={() => onChangeScreen('review')}
            data-testid="btn-open-review"
          >
            {t.workbench.reviewDecisionBtn}
          </button>
          {status === 'provisional' && (
            <button
              type="button"
              className="btn"
              onClick={() => onChangeScreen('followup')}
            >
              {t.workbench.openWaDraftBtn}
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <section
      className={`card decision-card${panelStateCls}`}
      id="decision-panel"
      ref={panelRef}
      aria-label="Coordinator decision workbench"
    >
      {renderContent()}
      {status === 'needs_review' && finalReason && (
        <div className="previous-reason-box">
          <strong>{t.workbench.prevReasonTitle(finalAt)}</strong>
          <div>{finalReason}</div>
        </div>
      )}
    </section>
  );
};
