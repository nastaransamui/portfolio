/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useUI } from 'src/hooks/UIProvider';
import Typewriter from '../Typewriter';
import { typewriterWords } from '../constants';

type Props = {
  changeNav: (id: string) => void;
}

const HomeSection: FC<Props> = ({ changeNav }) => {
  const { nav } = useUI();
  return (
    <section id="home" className={nav === 'home' ? 'active' : ''}>
      <div className="main-text-container">
        <img className="leftimagepicture" src="img/profile.png" alt="Portrait of Majid Vezvaee" />
        <div className="main-text" id="selector">
          <h3>Hi there !</h3>
          <h1 className="ah-headline d-flex">
            I&apos;m&nbsp;
            <Typewriter words={typewriterWords} />
          </h1>
          <p>
            I&apos;m a Frontend engineer with experience building React and Next.js applications for healthcare and business platforms. Focused on maintainable UI architecture, complex forms, role-based access, and API-driven interfaces. Comfortable working with real-time data,
            changing requirements, and incomplete backend contracts while keeping user workflows clear and reliable.
          </p>
          <div className="call-to-actions-home">
            <div className="text-left">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  changeNav('about');
                }}
                className="btn link-portfolio-one"
              >
                <span>
                  <i className="fa fa-user"></i>more about me
                </span>
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  changeNav('work');
                }}
                className="btn btn-secondary link-portfolio-two"
              >
                <span>
                  <i className="fa fa-suitcase"></i>portfolio
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
