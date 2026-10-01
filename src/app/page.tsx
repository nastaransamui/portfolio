'use client';

import { useEffect, useRef } from 'react';
import { useUI } from 'src/hooks/UIProvider';
import BlogModal from 'src/shared/BlogModal';
import Header from 'src/shared/Header';
import AboutSection from 'src/shared/sections/AboutSection';
import BlogSection from 'src/shared/sections/BlogSection';
import ContactSection from 'src/shared/sections/ContactSection';
import HomeSection from 'src/shared/sections/HomeSection';
import PortfolioSection from 'src/shared/sections/PortfolioSection';


export default function Home() {

  const { setNav, setMobileMenuOpen, setStretchyOpen, isMobile, setIsMobile,
    activeProject, setActiveProject, mobileMenuOpen,
  } = useUI();

  const stretchyRef = useRef<HTMLDivElement>(null);
  const changeNav = (id: string) => {
    setNav(id);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${id}`);
      if (window.innerWidth < 1025) {
        setMobileMenuOpen(true);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1025;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile, setMobileMenuOpen]);

  useEffect(() => {
    const handleHash = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash && ['home', 'about', 'work', 'contact', 'blog'].includes(currentHash)) {
        setNav(currentHash);
        if (window.innerWidth < 1025 && currentHash !== 'home') {
          setMobileMenuOpen(true);
        }
      }
    };

    const timer = setTimeout(handleHash, 0);
    window.addEventListener('hashchange', handleHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [setMobileMenuOpen, setNav]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (stretchyRef.current && !stretchyRef.current.contains(e.target as Node)) {
        setStretchyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setStretchyOpen]);



  return (
    <div className="page animated" style={{ animationDuration: '500ms' }}>
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Header & Navigation */}
      <Header changeNav={changeNav} stretchyRef={stretchyRef} />

      {/* Main Content Area */}
      <main id="main" className={isMobile && mobileMenuOpen ? 'open' : ''}>
        <span
          className={`back-mobile ${activeProject !== null ? 'close-project' : ''}`}
          id="back-mobile"
          onClick={() => {
            if (activeProject !== null) {
              setActiveProject(null);
            } else {
              setMobileMenuOpen(false);
              changeNav('home');
            }
          }}
        >
          <i className={activeProject !== null ? 'fa fa-close' : 'fa fa-arrow-left'}></i>
        </span>

        {/* Home Section */}
        <HomeSection changeNav={changeNav} />

        {/* About Section */}
        <AboutSection />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Blog Details Modal Popup */}
        <BlogModal />
      </main>
    </div>
  );
}
