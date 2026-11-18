import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useExperienceEffects';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';
import { BrandLogo } from './BrandLogo';
import {
  CompassHubIcon,
  MoonNightIcon,
  PrototypeCursorIcon,
  SunDayIcon,
  WireframeGridIcon
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
  const compactBrandTitle = mode === 'hub' ? t.nav.hubTitle : 'Readiness OS';
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

            {mode === 'hub' && (
              <nav className="top-nav-desktop" aria-label="Hub sections">
                <a className="route-pill interactive-icon-trigger" href="#top">
                  <span>{locale === 'id' ? 'Ikhtisar' : 'Overview'}</span>
                </a>
                <a className="route-pill interactive-icon-trigger" href="#routes">
                  <PrototypeCursorIcon size={13} />
                  <span>{locale === 'id' ? 'Ruang Kerja' : 'Workspaces'}</span>
                </a>
                <a className="route-pill interactive-icon-trigger" href="#visuals">
                  <WireframeGridIcon size={13} />
                  <span>Blueprint</span>
                </a>
                <a className="route-pill interactive-icon-trigger" href="#trail">
                  <CompassHubIcon size={13} />
                  <span>{locale === 'id' ? 'Peta Q1–Q5' : 'Q1–Q5 Roadmap'}</span>
                </a>
              </nav>
            )}

            <div className="topbar-right">
              {mode === 'q304' && (
                <Link className="btn btn-sm interactive-icon-trigger" to="/">
                  <CompassHubIcon size={13} />
                  <span className="hide-mobile">
                    {locale === 'id' ? 'Hub Utama' : 'Main Hub'}
                  </span>
                </Link>
              )}

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
