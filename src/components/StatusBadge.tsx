import React from 'react';
import { SemanticTone } from '../domain/types';

export const ToneIcon: React.FC<{ tone: SemanticTone }> = ({ tone }) => {
  if (tone === 'good' || tone === 'accent') {
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5.2 8.2l1.9 1.9 3.8-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (tone === 'warn') {
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.8v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="11.1" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  if (tone === 'alert') {
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 2.2l6.2 11a.8.8 0 01-.7 1.2H2.5a.8.8 0 01-.7-1.2l6.2-11a.8.8 0 011.4 0z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M8 6.3v3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.7" r="0.85" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2.4 2.2"
      />
    </svg>
  );
};

export const StatusBadge: React.FC<{
  label: string;
  tone: SemanticTone;
  large?: boolean;
}> = ({ label, tone, large }) => {
  return (
    <span className={`pill ${tone}${large ? ' status-lg' : ''}`}>
      <ToneIcon tone={tone} />
      <span>{label}</span>
    </span>
  );
};
