'use client';

import { useEffect, useState } from 'react';

export default function InteractionLayer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add('has-motion');
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.top-nav a[href^="#"], .side-nav-panel a[href^="#"]'));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      document.documentElement.classList.toggle('is-at-top', window.scrollY < 40);

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
      window.removeEventListener('scroll', updateScroll);
      document.documentElement.classList.remove('is-at-top');
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}
