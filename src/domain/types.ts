export type Locale = 'id' | 'en';

export type ResponseKey =
  | 'available_certain'
  | 'maybe_tentative'
  | 'unknown_schedule'
  | 'no_response'
  | 'unavailable';

export type ProtocolStatusKey =
  | 'proposal'
  | 'provisional'
  | 'final'
  | 'needs_review';

export type SemanticTone = 'good' | 'warn' | 'neutral' | 'alert' | 'accent';

export type AuditKind =
  | 'proposal_created'
  | 'protocol_provisional'
  | 'response_updated'
  | 'member_added'
  | 'final_locked'
  | 'announced'
  | 'post_final_drift';

export interface MemberItem {
  id: string;
  name: string;
  required: boolean;
  response: ResponseKey;
  updatedAt: string; // '—' or '18.02 WIB'
  driftedAfterFinal: boolean;
}

export interface AuditEntry {
  id: string;
  kind: AuditKind;
  tone: SemanticTone;
  at: string;
  actorName?: string;
  fromResponse?: ResponseKey;
  toResponse?: ResponseKey;
  roleChangedTo?: 'required' | 'optional';
  targetNames?: string[];
  reasonText?: string;
  proposalTitle?: string;
  totalMembers?: number;
  requiredCount?: number;
}

export interface ProposalItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  tz: 'WIB' | 'WITA' | 'WIT';
  mode: string;
  status: ProtocolStatusKey;
  finalReason: string;
  finalAt: string;
  announcedAt: string;
  lastDriftActor?: string;
  lastDriftFrom?: ResponseKey;
  lastDriftTo?: ResponseKey;
  lastDriftAt?: string;
  updatedAt: string;
  members: MemberItem[];
  history: AuditEntry[];
}

export interface ProposalStore {
  version: 2;
  activeId: string | null;
  proposals: ProposalItem[];
}

export interface DraftMemberInput {
  name: string;
  required: boolean;
  response: ResponseKey;
}

export interface ProposalDraftInput {
  title: string;
  date: string;
  time: string;
  tz: 'WIB' | 'WITA' | 'WIT';
  mode: string;
  members: DraftMemberInput[];
}

export type ValidationErrorCode =
  | { code: 'title_short' }
  | { code: 'date_invalid' }
  | { code: 'time_invalid' }
  | { code: 'min_members' }
  | { code: 'duplicate_names'; names: string[] }
  | { code: 'no_required_member' };
