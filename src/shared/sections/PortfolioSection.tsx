/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useUI } from 'src/hooks/UIProvider';
import { projects } from '../constants';
import YouTubeVideo from '../YouTubeVideo';
import Slider from '../Slider';
import VideoPlayer from '../VideoPlayer';

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
                    <a
                      href="#"
                      data-type="project-1"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveProject(idx);
                      }}
                    >
                      <img src={proj.img} alt={proj.name} className="img-fluid" />
                      <div>
                        <span>{proj.name}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="portfolio-overlay" onClick={() => setActiveProject(null)}></div>
      </div>

      {/* Project Details Panel */}
      {projects.map((proj, idx) => (
        <div
          key={idx}
          className={`project-info-container project-1 ${activeProject === idx ? 'slide-in' : ''}`}
        >
          <div className="project-info-main-content">
            {proj.format === 'img' && <img src={proj.img} alt="Project Image" />}
            {proj.format === 'youtube' && <YouTubeVideo playing={activeProject === idx} />}
            {proj.format === 'slider' && <Slider />}
            {proj.format === 'video' && <VideoPlayer playing={activeProject === idx} />}
          </div>
          <div className="projects-info row">
            <div className="col-12 col-sm-6 p-none">
              <h3 className="font-weight-600 uppercase">{proj.name}</h3>
              <ul className="project-details">
                <li>
                  <i className="fa fa-file-text-o"></i>
                  <span className="font-weight-400 project-label"> Project </span>:
                  <span className="font-weight-600 uppercase">{proj.project}</span>
                </li>
                <li>
                  <i className="fa fa-user-o"></i>
                  <span className="font-weight-400 project-label"> Client </span>:
                  <span className="font-weight-600 uppercase">{proj.client}</span>
                </li>
                <li>
                  <i className="fa fa-hourglass-o"></i>
                  <span className="font-weight-400 project-label"> Duration </span>:
                  <span className="font-weight-600 uppercase">{proj.duration}</span>
                </li>
                <li>
                  <i className="fa fa-code"></i>
                  <span className="font-weight-400 project-label"> Technologies</span> :
                  <span className="font-weight-600 uppercase">{proj.technologies}</span>
                </li>
                <li>
                  <i className="fa fa-money"></i>
                  <span className="font-weight-400 project-label"> Budget</span> :
                  <span className="font-weight-600 uppercase">{proj.budget}</span>
                </li>
              </ul>
              <a href="#" className="btn">
                <span>
                  <i className="fa fa-external-link"></i>preview
                </span>
              </a>
            </div>
            <div className="col-6 p-none text-right">
              <a
                href="#"
                className="btn btn-secondary close-project"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveProject(null);
                }}
              >
                <span>
                  <i className="fa fa-close"></i>Close
                </span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default PortfolioSection;
