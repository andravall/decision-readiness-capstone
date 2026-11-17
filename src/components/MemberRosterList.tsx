import React from 'react';
import { RESPONSE_TONES } from '../domain/readiness';
import { MemberItem } from '../domain/types';
import { useLanguage } from '../i18n/LanguageContext';
import { StatusBadge } from './StatusBadge';

interface MemberRosterListProps {
  members: MemberItem[];
  editingIndex: number | null;
  onSelectEdit: (idx: number) => void;
  bottomSlot?: React.ReactNode;
}

export const MemberRosterList: React.FC<MemberRosterListProps> = ({
  members,
  editingIndex,
  onSelectEdit,
  bottomSlot
}) => {
  const { t } = useLanguage();

  const indexed = members.map((member, index) => ({ member, index }));
  const requiredList = indexed.filter((item) => item.member.required);
  const optionalList = indexed.filter((item) => !item.member.required);

  const renderGroup = (
    title: string,
    rule: string,
    items: { member: MemberItem; index: number }[]
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="role-group">
        <div className="role-group-bar">
          <span className="role-group-title">{title}</span>
          <span className="role-group-rule">{rule}</span>
        </div>
        <div>
          {items.map(({ member, index }) => {
            const isEditing = editingIndex === index;
            const tone = RESPONSE_TONES[member.response];
            const timeLabel =
              member.updatedAt === '—'
                ? t.common.notRecordedYet
                : `${t.common.updatedAtPrefix} ${member.updatedAt}`;

            return (
              <div
                key={member.id}
                className={`member-row${isEditing ? ' is-editing' : ''}`}
              >
                <div className="person-cell">
                  <span
                    className={`avatar${member.required ? ' is-required' : ''}`}
                    aria-hidden="true"
                  >
                    {member.name[0]?.toUpperCase() || '?'}
                  </span>
                  <div>
                    <div className="person-name-line">
                      <span className="person-name">{member.name}</span>
                      <span
                        className={`role-tag ${member.required ? 'required' : 'optional'}`}
                      >
                        {member.required ? t.common.requiredRole : t.common.optionalRole}
                      </span>
                      {member.driftedAfterFinal && (
                        <span className="drift-tag">{t.common.changedPostFinal}</span>
                      )}
                    </div>
                    <span className="person-meta">{timeLabel}</span>
                  </div>
                </div>

                <div className="member-status-cell">
                  <StatusBadge label={t.responses[member.response].label} tone={tone} />
                </div>

                <div>
                  <button
                    type="button"
                    className={`btn btn-sm${isEditing ? ' primary' : ''}`}
                    onClick={() => onSelectEdit(index)}
                    data-member-index={index}
                  >
                    {isEditing ? t.common.editingBtn : t.common.editBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="card members-card" aria-labelledby="members-heading">
      <div className="card-header">
        <div>
          <h2 className="card-title" id="members-heading">
            {t.common.membersSectionTitle}
          </h2>
          <p className="card-subtitle">{t.common.membersSectionSub}</p>
        </div>
        <span className="diag-label">{t.common.membersCount(members.length)}</span>
      </div>

      {renderGroup(
        t.common.requiredGroupTitle(String(requiredList.length).padStart(2, '0')),
        t.common.requiredGroupRule,
        requiredList
      )}
      {renderGroup(
        t.common.optionalGroupTitle(String(optionalList.length).padStart(2, '0')),
        t.common.optionalGroupRule,
        optionalList
      )}

      {bottomSlot}
    </section>
  );
};
