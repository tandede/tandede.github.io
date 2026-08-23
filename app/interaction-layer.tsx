'use client';

import { useEffect, useState } from 'react';

export default function InteractionLayer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add('has-motion');
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const motionItems = Array.from(document.querySelectorAll<HTMLElement>('[data-motion]'));
    const glowItems = Array.from(document.querySelectorAll<HTMLElement>('[data-glow]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.top-nav a[href^="#"], .side-nav-panel a[href^="#"]'));
    const detailPage = document.querySelector<HTMLElement>('.detail-page');
    if (detailPage) {
      const detailAccent = window.getComputedStyle(detailPage).getPropertyValue('--detail-accent').trim();
      if (detailAccent) document.documentElement.style.setProperty('--progress-color', detailAccent);
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-motion-visible');
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -7% 0px' },
    );
    motionItems.forEach((item) => motionObserver.observe(item));

    const updateGlow = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      const bounds = target.getBoundingClientRect();
      target.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
      target.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
    };
    glowItems.forEach((item) => item.addEventListener('pointermove', updateGlow));

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      document.documentElement.classList.toggle('is-at-top', window.scrollY < 40);
      document.documentElement.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.075, 54)}px`);

      let activeId = 'top';
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 150) activeId = section.id;
      });

      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${activeId}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      motionObserver.disconnect();
      glowItems.forEach((item) => item.removeEventListener('pointermove', updateGlow));
      window.removeEventListener('scroll', updateScroll);
      document.documentElement.classList.remove('is-at-top');
      document.documentElement.style.removeProperty('--hero-shift');
      document.documentElement.style.removeProperty('--progress-color');
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}
