'use client';

import { useEffect, useRef, useState } from 'react';
import {
  PiArticle,
  PiBrain,
  PiBriefcaseBold,
  PiCpu,
  PiEnvelope,
  PiFolderOpenBold,
  PiHouseBold,
  PiListBold,
  PiPushPinBold,
  PiPushPinSlashBold,
  PiSidebarSimpleBold,
  PiXBold,
} from 'react-icons/pi';
import { SiGithub } from 'react-icons/si';

const navigationItems = [
  { href: '#top', label: '首页', english: 'HOME', icon: PiHouseBold },
  { href: '#focus', label: '研究方向', english: 'RESEARCH', icon: PiBrain },
  { href: '#research', label: '所选论文', english: 'SELECTED PUBLICATIONS', icon: PiArticle },
  { href: '#experience', label: '实习经历', english: 'EXPERIENCE', icon: PiBriefcaseBold },
  { href: '#projects', label: '代表项目', english: 'PROJECTS', icon: PiFolderOpenBold },
  { href: '#opensource', label: '开源贡献', english: 'OPEN SOURCE', icon: SiGithub },
  { href: '#contact', label: '联系我', english: 'CONTACT', icon: PiEnvelope },
];

export default function NavigationShell() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pinPreferenceLoaded = useRef(false);
  const visible = open || hovering || pinned;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPinned(window.localStorage.getItem('portfolio-nav-pinned') === 'true');
      pinPreferenceLoaded.current = true;
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (pinPreferenceLoaded.current) {
      window.localStorage.setItem('portfolio-nav-pinned', String(pinned));
    }
  }, [pinned]);

  useEffect(() => {
    document.documentElement.classList.toggle('nav-layout-open', visible);
    return () => document.documentElement.classList.remove('nav-layout-open');
  }, [visible]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPinned(false);
        setOpen(false);
        setHovering(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const closeIfFloating = () => {
    if (!pinned) {
      setOpen(false);
      setHovering(false);
    }
  };

  return (
    <>
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="返回首页"><span className="brand-mark"><PiCpu aria-hidden="true" /></span><span><strong>谭哲文</strong><small>ZHEWEN TAN</small></span></a>
        <nav className="top-nav" aria-label="主要导航">
          {navigationItems.slice(1, -1).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="nav-toggle" type="button" aria-controls="side-navigation" aria-expanded={visible} onClick={() => { if (visible) { setPinned(false); setOpen(false); setHovering(false); } else setOpen(true); }}><PiSidebarSimpleBold aria-hidden="true" />导航</button>
          <a className="nav-contact" href="#contact"><PiEnvelope aria-hidden="true" />联系我</a>
        </div>
      </header>

      <div className={`side-nav-shell${visible ? ' is-visible' : ''}${pinned ? ' is-pinned' : ''}`}>
        <button className="side-nav-edge" type="button" aria-label="展开页面导航" onMouseEnter={() => setHovering(true)} onFocus={() => setOpen(true)}><PiListBold aria-hidden="true" /></button>
        <aside id="side-navigation" className="side-nav-panel" aria-label="页面导航" aria-hidden={!visible} onMouseEnter={() => setHovering(true)} onMouseLeave={closeIfFloating}>
          <div className="side-nav-head"><div><span>NAVIGATION</span><strong>页面导航</strong></div><div><button type="button" aria-label={pinned ? '取消固定导航' : '固定导航'} aria-pressed={pinned} onClick={() => { setPinned((value) => !value); setOpen(true); }}>{pinned ? <PiPushPinSlashBold aria-hidden="true" /> : <PiPushPinBold aria-hidden="true" />}</button><button type="button" aria-label="收起导航" onClick={() => { setPinned(false); setOpen(false); setHovering(false); }}><PiXBold aria-hidden="true" /></button></div></div>
          <nav>{navigationItems.map((item, index) => { const Icon = item.icon; return <a href={item.href} key={item.href} tabIndex={visible ? 0 : -1} onClick={closeIfFloating}><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /><span><strong>{item.label}</strong><small>{item.english}</small></span></a>; })}</nav>
          <p><span />移到左侧边缘可临时展开；固定后页面会自动为导航让位。</p>
        </aside>
      </div>
      <button className={`side-nav-backdrop${visible ? ' is-visible' : ''}`} type="button" aria-label="关闭导航" tabIndex={visible ? 0 : -1} onClick={() => { setPinned(false); setOpen(false); setHovering(false); }} />
    </>
  );
}
