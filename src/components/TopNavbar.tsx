import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useExperienceEffects';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';
import { BrandLogo } from './BrandLogo';
import {
  CompassHubIcon,
  CoreDatabaseCheckIcon,
  MoonNightIcon,
  PrototypeCursorIcon,
  SunDayIcon
} from './ProjectIcons';

interface TopNavbarProps {
  mode: 'hub' | 'q303-isolated' | 'q304';
  rightSlot?: React.ReactNode;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ mode, rightSlot }) => {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();

  const brandTitle = mode === 'hub' ? t.nav.hubTitle : t.nav.boardTitle;
  const compactBrandTitle = mode === 'hub' ? 'Readiness Hub' : 'Readiness OS';
  const badgeText =
    mode === 'hub'
      ? '5026231159 · SI Capstone'
      : mode === 'q303-isolated'
        ? t.nav.simBadge
        : t.nav.mvpBadge;

  const BrandEmblem = <BrandLogo />;

  return (
    <header className="topbar-shell">
      <div className="container">
        <div className="topbar-capsule">
          <div className="topbar-row">
            {mode === 'q303-isolated' ? (
              <div className="brand">
                {BrandEmblem}
                <div className="brand-meta">
                  <span className="brand-name brand-full">{brandTitle}</span>
                  <span className="brand-name brand-compact">{compactBrandTitle}</span>
                  <span className="brand-tag">{badgeText}</span>
                </div>
              </div>
            ) : (
              <Link className="brand" to="/">
                {BrandEmblem}
                <div className="brand-meta">
                  <span className="brand-name brand-full">{brandTitle}</span>
                  <span className="brand-name brand-compact">{compactBrandTitle}</span>
                  <span className={`brand-tag${mode === 'q304' ? ' tone-good' : ''}`}>
                    {badgeText}
                  </span>
                </div>
              </Link>
            )}

            {mode !== 'q303-isolated' && (
              <nav className="top-nav-desktop" aria-label="Main routes">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `route-pill interactive-icon-trigger${isActive ? ' is-active' : ''}`
                  }
                >
                  <CompassHubIcon size={14} />
                  <span>{t.nav.hubRoute}</span>
                </NavLink>
                <NavLink
                  to="/q3-03"
                  className={({ isActive }) =>
                    `route-pill interactive-icon-trigger${isActive ? ' is-active' : ''}`
                  }
                >
                  <PrototypeCursorIcon size={14} />
                  <span>{t.nav.q303Route}</span>
                </NavLink>
                <NavLink
                  to="/q3-04-core"
                  className={({ isActive }) =>
                    `route-pill interactive-icon-trigger${isActive ? ' is-active' : ''}`
                  }
                >
                  <CoreDatabaseCheckIcon size={14} />
                  <span>{t.nav.q304Route}</span>
                </NavLink>
              </nav>
            )}

            <div className="topbar-right">
              <button
                type="button"
                className="theme-toggle-btn interactive-icon-trigger"
                onClick={toggleTheme}
                aria-label={
                  theme === 'dark'
                    ? locale === 'id'
                      ? 'Ubah ke tampilan terang'
                      : 'Switch to light theme'
                    : locale === 'id'
                      ? 'Ubah ke tampilan gelap'
                      : 'Switch to dark theme'
                }
                title={theme === 'dark' ? 'Daylight Mode' : 'Carbon Dark Mode'}
                data-testid="theme-toggle"
              >
                {theme === 'dark' ? <SunDayIcon size={14} /> : <MoonNightIcon size={14} />}
              </button>

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
                className={({ isActive }) =>
                  `mobile-route-tab interactive-icon-trigger${isActive ? ' is-active' : ''}`
                }
              >
                <CompassHubIcon size={13} />
                <span>Hub</span>
              </NavLink>
              <NavLink
                to="/q3-03"
                className={({ isActive }) =>
                  `mobile-route-tab interactive-icon-trigger${isActive ? ' is-active' : ''}`
                }
              >
                <PrototypeCursorIcon size={13} />
                <span>Q3.03</span>
              </NavLink>
              <NavLink
                to="/q3-04-core"
                className={({ isActive }) =>
                  `mobile-route-tab interactive-icon-trigger${isActive ? ' is-active' : ''}`
                }
              >
                <CoreDatabaseCheckIcon size={13} />
                <span>Q3.04</span>
              </NavLink>
            </nav>
          )}

          <div className="scroll-progress-wrap" aria-hidden="true">
            <div
              className="scroll-progress-bar"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
