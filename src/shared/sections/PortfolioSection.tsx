/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useUI } from 'src/hooks/UIProvider';
import { projects } from '../constants';

const PortfolioSection: FC = () => {
  const { nav, activeProject, setActiveProject } = useUI();
  return (
    <section id="work" className={nav === 'work' ? 'active' : ''}>
      <div className={`portfolio-container ${activeProject !== null ? 'slide-out overflow-hidden' : ''}`}>
        <div className="container page-title text-center">
          <h2 className="text-center">
            my <span>portfolio</span>
          </h2>
          <span className="title-head-subtitle">
            a few recent design and coding projects. Want to see more? Email me.
          </span>
        </div>
        <div className="portfolio-section">
          <div className="container cd-container">
            <div>
              <ul className="row" id="portfolio-items">
                {projects.map((proj, idx) => (
                  <li key={idx} className="col-12 col-md-6 col-lg-4">
                    <button
                      type="button"
                      className="portfolio-project-button"
                      aria-label={`View details for ${proj.name}`}
                      onClick={() => setActiveProject(idx)}
                    >
                      <img src={proj.img} alt={proj.name} className="img-fluid" />
                      <div>
                        <span>{proj.name}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="portfolio-overlay"
          aria-label="Close project details"
          onClick={() => setActiveProject(null)}
        />
      </div>

      {/* Project Details Panel */}
      {projects.map((proj, idx) => (
        <div
          key={idx}
          className={`project-info-container ${activeProject === idx ? 'slide-in' : ''}`}
        >
          <div className="project-info-main-content">
            <img src={proj.img} alt={`${proj.name} screenshot`} />
          </div>
          <div className="projects-info row">
            <div className="col-12 col-sm-8 p-none">
              <h3 className="font-weight-600 uppercase" style={{ lineHeight: '37px' }}>{proj.name}</h3>
              <ul className="project-details">
                <li>
                  <i className="fa fa-file-text-o"></i>
                  <span className="font-weight-400 project-label"> Project </span>:
                  <span className="font-weight-600 uppercase">{proj.project}</span>
                </li>
                <li>
                  <i className="fa fa-user-o"></i>
                  <span className="font-weight-400 project-label"> Role </span>:
                  <span className="font-weight-600 uppercase">{proj.role}</span>
                </li>
                <li>
                  <i className="fa fa-check-circle-o"></i>
                  <span className="font-weight-400 project-label"> Status </span>:
                  <span className="font-weight-600 uppercase">{proj.status}</span>
                </li>
                <li>
                  <i className="fa fa-code"></i>
                  <span className="font-weight-400 project-label"> Technologies</span> :
                  <span className="font-weight-600 uppercase">{proj.technologies}</span>
                </li>
              </ul>
              <p>{proj.description}</p>
              <a
                href={proj.url}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <i className="fa fa-external-link"></i>view live project
                </span>
              </a>
            </div>
            <div className="col-4 p-none text-right">
              <button
                type="button"
                className="btn btn-secondary close-project"
                onClick={() => setActiveProject(null)}
              >
                <span>
                  <i className="fa fa-close"></i>Close
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default PortfolioSection;
