import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { VisualArtifactItem } from '../i18n/translations';

interface DiagramLightboxProps {
  artifact: VisualArtifactItem | null;
  onClose: () => void;
}

export const DiagramLightbox: React.FC<DiagramLightboxProps> = ({ artifact, onClose }) => {
  const { t } = useLanguage();
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!artifact) return;
    setZoomed(window.innerWidth < 768);
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [artifact, onClose]);

  if (!artifact) return null;

  const imgWidth = zoomed
    ? `${Math.max(1180, Math.round(window.innerWidth * 1.65))}px`
    : '100%';

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={artifact.title}>
      <div className="lightbox-bar">
        <strong style={{ fontSize: '13.5px' }}>
          {artifact.tab} — {artifact.title}
        </strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-sm" onClick={() => setZoomed(false)}>
            {t.hub.fitScreenBtn}
          </button>
          <button type="button" className="btn btn-sm" onClick={() => setZoomed(true)}>
            {t.hub.zoomInBtn}
          </button>
          <a
            className="btn btn-sm"
            href={artifact.svg}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hub.svgVectorBtn}
          </a>
          <button type="button" className="btn primary btn-sm" onClick={onClose}>
            {t.common.closeBtn} ✕
          </button>
        </div>
      </div>
      <div
        className="lightbox-canvas"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <img
          src={artifact.png}
          alt={artifact.title}
          style={{
            width: imgWidth,
            maxWidth: zoomed ? 'none' : '1360px'
          }}
        />
      </div>
    </div>
  );
};
