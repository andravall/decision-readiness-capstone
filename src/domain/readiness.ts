import {
  DraftMemberInput,
  Locale,
  MemberItem,
  ProposalDraftInput,
  ProposalItem,
  ProtocolStatusKey,
  ResponseKey,
  SemanticTone,
  ValidationErrorCode
} from './types';

export const RESPONSE_ORDER: ResponseKey[] = [
  'available_certain',
  'maybe_tentative',
  'unknown_schedule',
  'no_response',
  'unavailable'
];

export const RESPONSE_TONES: Record<ResponseKey, Exclude<SemanticTone, 'accent'>> = {
  available_certain: 'good',
  maybe_tentative: 'warn',
  unknown_schedule: 'warn',
  no_response: 'neutral',
  unavailable: 'alert'
};

export const STATUS_TONES: Record<ProtocolStatusKey, Exclude<SemanticTone, 'accent'>> = {
  proposal: 'neutral',
  provisional: 'warn',
  final: 'good',
  needs_review: 'alert'
};

export function createUid(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function nowTimeWIB(): string {
  try {
    const formatted = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta'
    })
      .format(new Date())
      .replace(':', '.');
    return `${formatted} WIB`;
  } catch {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}.${String(d.getMinutes()).padStart(2, '0')} WIB`;
  }
}

export function formatIsoDate(isoDate: string, locale: Locale): string {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate || '—';
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(dt);
}

export function formatMeetingTime(hhmm: string, tz: string): string {
  if (!hhmm) return '—';
  return `${hhmm.replace(':', '.')} ${tz || 'WIB'}`;
}

export interface ReadinessEvaluation {
  requiredMembers: MemberItem[];
  optionalMembers: MemberItem[];
  pendingRequired: MemberItem[];
  readyCount: number;
  canFinalize: boolean;
}

export function evaluateReadiness(members: MemberItem[]): ReadinessEvaluation {
  const requiredMembers = members.filter((m) => m.required);
  const optionalMembers = members.filter((m) => !m.required);
  const pendingRequired = requiredMembers.filter((m) => m.response !== 'available_certain');
  const readyCount = requiredMembers.length - pendingRequired.length;
  const canFinalize = requiredMembers.length > 0 && pendingRequired.length === 0;

  return {
    requiredMembers,
    optionalMembers,
    pendingRequired,
    readyCount,
    canFinalize
  };
}

export function validateProposalDraft(draft: ProposalDraftInput): {
  errors: ValidationErrorCode[];
  cleanTitle: string;
  validMembers: DraftMemberInput[];
} {
  const errors: ValidationErrorCode[] = [];
  const cleanTitle = (draft.title || '').trim();

  if (cleanTitle.length < 3) {
    errors.push({ code: 'title_short' });
  }
  if (!draft.date || !/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) {
    errors.push({ code: 'date_invalid' });
  }
  if (!draft.time || !/^\d{2}:\d{2}$/.test(draft.time)) {
    errors.push({ code: 'time_invalid' });
  }

  const validMembers: DraftMemberInput[] = draft.members
    .map((m) => ({
      name: (m.name || '').trim(),
      required: Boolean(m.required),
      response: RESPONSE_ORDER.includes(m.response) ? m.response : 'no_response'
    }))
    .filter((m) => m.name.length > 0);

  if (validMembers.length < 2) {
    errors.push({ code: 'min_members' });
  }

  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const m of validMembers) {
    const key = m.name.toLowerCase();
    if (seen.has(key)) duplicates.push(m.name);
    seen.add(key);
  }
  if (duplicates.length > 0) {
    errors.push({ code: 'duplicate_names', names: duplicates });
  }

  if (validMembers.length >= 2 && !validMembers.some((m) => m.required)) {
    errors.push({ code: 'no_required_member' });
  }

  return { errors, cleanTitle, validMembers };
}

export function encodeProposalSnapshot(proposal: ProposalItem): string {
  const json = JSON.stringify(proposal);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeProposalSnapshot(token: string): ProposalItem | null {
  try {
    const b64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as ProposalItem;
    if (!parsed || !parsed.title || !Array.isArray(parsed.members) || parsed.members.length < 2) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
