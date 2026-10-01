import { FC, RefObject } from 'react';
import { navItems } from './constants';
import { useUI } from 'src/hooks/UIProvider';

type Props = {
  changeNav: (id: string) => void;
  stretchyRef: RefObject<HTMLDivElement | null>
}

const Header: FC<Props> = ({ changeNav, stretchyRef }) => {
  const { nav, stretchyOpen, setStretchyOpen } = useUI();
  return (
    <header id="header">
      <div className="nav-container">
        <div>
          <ul id="nav" className="navigation">
            {navItems.map((item) => (
              <li key={item.id} className={nav === item.id ? 'active' : ''}>
                <div>
                  <a
                    id={`link-${item.id}`}
                    href={`#${item.id}`}
                    className={nav === item.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      changeNav(item.id);
                    }}
                  >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Circular Stretchy Navigation (top left) */}
      <div
        ref={stretchyRef}
        className={`cd-stretchy-nav ${stretchyOpen ? 'nav-is-visible' : ''}`}
      >
        <a
          className="cd-nav-trigger"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setStretchyOpen(!stretchyOpen);
          }}
        >
          <span aria-hidden="true" />
        </a>
        <ul className="stretchy-nav">
          {navItems.map((item) => (
            <li key={item.id} className={nav === item.id ? 'active' : ''}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  changeNav(item.id);
                  setStretchyOpen(false);
                }}
              >
                <span>{item.dkMenuName}</span>
              </a>
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="stretchy-nav-bg" />
      </div>
    </header>
  );
}

export default Header;
