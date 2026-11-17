import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

interface TopNavbarProps {
  mode: 'hub' | 'q303-isolated' | 'q304';
  rightSlot?: React.ReactNode;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ mode, rightSlot }) => {
  const { locale, setLocale, t } = useLanguage();

  const brandTitle = mode === 'hub' ? t.nav.hubTitle : t.nav.boardTitle;
  const badgeText =
    mode === 'hub' ? '5026231159 · SI Capstone' : mode === 'q303-isolated' ? t.nav.simBadge : t.nav.mvpBadge;

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        {mode === 'q303-isolated' ? (
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="9" width="3.2" height="7" rx="1" fill="currentColor" opacity="0.45" />
                <rect x="7.4" y="5.5" width="3.2" height="10.5" rx="1" fill="currentColor" opacity="0.75" />
                <rect x="12.8" y="2" width="3.2" height="14" rx="1" fill="currentColor" />
              </svg>
            </span>
            <div className="brand-meta">
              <span className="brand-name">{brandTitle}</span>
              <span className="brand-tag">{badgeText}</span>
            </div>
          </div>
        ) : (
          <Link className="brand" to="/">
            <span className="brand-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="9" width="3.2" height="7" rx="1" fill="currentColor" opacity="0.45" />
                <rect x="7.4" y="5.5" width="3.2" height="10.5" rx="1" fill="currentColor" opacity="0.75" />
                <rect x="12.8" y="2" width="3.2" height="14" rx="1" fill="currentColor" />
              </svg>
            </span>
            <div className="brand-meta">
              <span className="brand-name">{brandTitle}</span>
              <span className={`brand-tag${mode === 'q304' ? ' tone-good' : ''}`}>{badgeText}</span>
            </div>
          </Link>
        )}

        {mode !== 'q303-isolated' && (
          <nav className="top-nav" aria-label="Main routes">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `route-pill${isActive ? ' is-active' : ''}`}
            >
              {t.nav.hubRoute}
            </NavLink>
            <NavLink
              to="/q3-03"
              className={({ isActive }) => `route-pill${isActive ? ' is-active' : ''}`}
            >
              {t.nav.q303Route}
            </NavLink>
            <NavLink
              to="/q3-04-core"
              className={({ isActive }) => `route-pill${isActive ? ' is-active' : ''}`}
            >
              {t.nav.q304Route}
            </NavLink>
          </nav>
        )}

        <div className="topbar-right">
          <div className="lang-switch" role="group" aria-label={t.nav.switchLangLabel}>
            <button
              type="button"
              className={`lang-btn${locale === 'id' ? ' is-active' : ''}`}
              onClick={() => setLocale('id')}
              aria-pressed={locale === 'id'}
              data-testid="lang-id"
            >
              ID
            </button>
            <button
              type="button"
              className={`lang-btn${locale === 'en' ? ' is-active' : ''}`}
              onClick={() => setLocale('en')}
              aria-pressed={locale === 'en'}
              data-testid="lang-en"
            >
              EN
            </button>
          </div>
          {rightSlot}
        </div>
      </div>
    </header>
  );
};
