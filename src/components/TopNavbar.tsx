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
    mode === 'hub'
      ? '5026231159 · SI Capstone'
      : mode === 'q303-isolated'
        ? t.nav.simBadge
        : t.nav.mvpBadge;

  const shortHub = locale === 'id' ? 'Hub' : 'Hub';
  const shortQ303 = 'Q3.03';
  const shortQ304 = 'Q3.04';

  const BrandEmblem = (
    <span className="brand-mark" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="9.5" width="3.2" height="6.5" rx="1" fill="currentColor" opacity="0.45" />
        <rect x="7.4" y="5.5" width="3.2" height="10.5" rx="1" fill="currentColor" opacity="0.75" />
        <rect x="12.8" y="2" width="3.2" height="14" rx="1" fill="currentColor" />
      </svg>
    </span>
  );

  return (
    <header className="topbar">
      <div className="container topbar-row">
        {mode === 'q303-isolated' ? (
          <div className="brand">
            {BrandEmblem}
            <div className="brand-meta">
              <span className="brand-name">{brandTitle}</span>
              <span className="brand-tag">{badgeText}</span>
            </div>
          </div>
        ) : (
          <Link className="brand" to="/">
            {BrandEmblem}
            <div className="brand-meta">
              <span className="brand-name">{brandTitle}</span>
              <span className={`brand-tag${mode === 'q304' ? ' tone-good' : ''}`}>{badgeText}</span>
            </div>
          </Link>
        )}

        {mode !== 'q303-isolated' && (
          <nav className="top-nav-desktop" aria-label="Main routes">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `route-pill${isActive ? ' is-active' : ''}`}
            >
              <span className="route-pill-idx">01</span>
              <span>{t.nav.hubRoute}</span>
            </NavLink>
            <NavLink
              to="/q3-03"
              className={({ isActive }) => `route-pill${isActive ? ' is-active' : ''}`}
            >
              <span className="route-pill-idx">02</span>
              <span>{t.nav.q303Route}</span>
            </NavLink>
            <NavLink
              to="/q3-04-core"
              className={({ isActive }) => `route-pill${isActive ? ' is-active' : ''}`}
            >
              <span className="route-pill-idx">03</span>
              <span>{t.nav.q304Route}</span>
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

      {mode !== 'q303-isolated' && (
        <nav className="top-nav-mobile" aria-label="Mobile routes">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-route-tab${isActive ? ' is-active' : ''}`}
          >
            <span className="route-pill-idx">01</span>
            <span>{shortHub}</span>
          </NavLink>
          <NavLink
            to="/q3-03"
            className={({ isActive }) => `mobile-route-tab${isActive ? ' is-active' : ''}`}
          >
            <span className="route-pill-idx">02</span>
            <span>{shortQ303}</span>
          </NavLink>
          <NavLink
            to="/q3-04-core"
            className={({ isActive }) => `mobile-route-tab${isActive ? ' is-active' : ''}`}
          >
            <span className="route-pill-idx">03</span>
            <span>{shortQ304}</span>
          </NavLink>
        </nav>
      )}
    </header>
  );
};
