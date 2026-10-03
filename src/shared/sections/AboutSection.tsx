/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useUI } from 'src/hooks/UIProvider';

const AboutSection: FC = () => {
  const { nav } = useUI()
  return (
    <section id="about" className={nav === 'about' ? 'active' : ''}>
      <div className="container page-title text-center">
        <h2 className="text-center">
          about <span>me</span>
        </h2>
        <span className="title-head-subtitle">
          I&apos;m Frontend engineer , and I love what I do.
        </span>
      </div>
      <div className="container infos">
        <div className="row personal-info">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="image-container">
              <img className="img-fluid d-block" src="img/about.png" alt="Majid Vezvaee, frontend engineer" />
            </div>
            <p className="d-block d-md-none">
              I&apos;m a Frontend engineer with experience building React and Next.js applications for healthcare and business platforms.
            </p>
          </div>
          <div className="row col-xl-6 col-lg-6 col-md-12">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <ul className="list-1">
                <li>
                  <h6>
                    <span className="font-weight-600">First Name</span>Majid
                  </h6>
                </li>
                <li>
                  <h6>
                    <span className="font-weight-600">Last Name</span>Vezvaee
                  </h6>
                </li>
                <li>
                  <h6>
                    <span className="font-weight-600">Birthdate</span>27 Aug 1981
                  </h6>
                </li>
                <li>
                  <h6>
                    <span className="font-weight-600">Experience</span>8 years
                  </h6>
                </li>
                <li>
                  <h6>
                    <span className="font-weight-600">Address</span>Chiang Mai
                  </h6>
                </li>
              </ul>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <ul className="list-2">
                <li>
                  <h6>
                    <span className="font-weight-600">Freelance</span>Available
                  </h6>
                </li>
                <li>
                  <h6>
                    <span className="font-weight-600">Languages</span>English
                  </h6>
                </li>
                <li>
                  <h6>
                    <span className="font-weight-600">Phone</span>+66 870 62 46 48
                  </h6>
                </li>
                <li>
                  <h6>
                    <a href='mailto:mjcode2020@gmail.com' className="font-weight-600">Email  mjcode2020@gmail.com</a>
                  </h6>
                </li>
              </ul>
            </div>
            <div className="col-12 resume-btn-container">
              <a href="/Majid_Vezvaee_Resume_2026.pdf"
                download="Majid_Vezvaee_Resume_2026.pdf"
                target="_blank" rel="noopener noreferrer" className="btn btn-resume">
                <span>
                  <i className="fa fa-download"></i>download my cv
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container col-12 mx-auto text-center">
        <hr className="about-section" />
      </div>
      <div className="resume-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="font-weight-600 uppercase title-section">experience</h2>
              <div className="resume-items">
                <div className="item">
                  <span className="bullet"></span>
                  <div className="card">
                    <div className="card-header">
                      <span className="year">
                        <i className="fa fa-calendar"></i>
                        <i className="fa fa-caret-right"></i>Nov 2020 – Present
                      </span>
                      <span className="d-block font-weight-400 uppercase">
                        Senior Frontend Developer<span className="separator"></span>
                        <span className="font-weight-700">Fly Bird Tech</span>
                      </span>
                    </div>
                    <div className="card-body">
                      <p>
                        Built and maintained frontend applications using React, TypeScript, and Redux for production business platforms.
                      </p>
                      <p>
                        Worked on dashboard and operational interfaces, including role-based access, multi-step forms, and data-heavy screens.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <span className="bullet"></span>
                  <div className="card">
                    <div className="card-header">
                      <span className="year">
                        <i className="fa fa-calendar"></i>
                        <i className="fa fa-caret-right"></i>May 2018 – Apr 2020
                      </span>
                      <span className="d-block font-weight-400 uppercase">
                        Implementation & Account Manager<span className="separator"></span>
                        <span className="font-weight-700">InSource Asia</span>
                      </span>
                    </div>
                    <div className="card-body">
                      <p>
                        Managed technical implementation projects from onboarding through deployment and support.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <span className="bullet"></span>
                  <div className="card">
                    <div className="card-header">
                      <span className="year">
                        <i className="fa fa-calendar"></i>
                        <i className="fa fa-caret-right"></i>Nov 2016 – Jun 2018
                      </span>
                      <span className="d-block font-weight-400 uppercase">
                        Director of Information Technology<span className="separator"></span>
                        <span className="font-weight-700">GNTravel</span>
                      </span>
                    </div>
                    <div className="card-body">
                      <p>
                        Managed IT operations, internal systems, and digital tools supporting business processes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 skills-container">
              <h2 className="font-weight-600 uppercase title-section">Education</h2>
              <div className="resume-items">
                <div className="item">
                  <span className="bullet"></span>
                  <div className="card">
                    <div className="card-header">
                      <span className="year">
                        <i className="fa fa-calendar"></i>
                        <i className="fa fa-caret-right"></i>2000 - 2005
                      </span>
                      <span className="d-block font-weight-400 uppercase">
                        B.Sc. in Natural Resources Engineering (Ecology)<span className="separator"></span>
                        <span className="font-weight-700">Arak University</span>
                      </span>
                    </div>
                    <div className="card-body">
                      {/* <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet diam nonummy.
                      </p> */}
                    </div>
                  </div>
                </div>
                {/* <div className="item">
                  <span className="bullet"></span>
                  <div className="card">
                    <div className="card-header">
                      <span className="year">
                        <i className="fa fa-calendar"></i>
                        <i className="fa fa-caret-right"></i>2005 - 2007
                      </span>
                      <span className="d-block font-weight-400 uppercase">
                        Masters Degree<span className="separator"></span>
                        <span className="font-weight-700">Paris University</span>
                      </span>
                    </div>
                    <div className="card-body">
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet diam nonummy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <span className="bullet"></span>
                  <div className="card">
                    <div className="card-header">
                      <span className="year">
                        <i className="fa fa-calendar"></i>
                        <i className="fa fa-caret-right"></i>2001 - 2005
                      </span>
                      <span className="d-block font-weight-400 uppercase">
                        Bachelor Degree<span className="separator"></span>
                        <span className="font-weight-700">Moscow High School</span>
                      </span>
                    </div>
                    <div className="card-body">
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet diam nonummy.
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2 className="font-weight-600 uppercase title-section skills-title">skills</h2>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">html</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="80" style={{ width: '80%' }}></span>
                <span className="percent" style={{ right: 'calc(20% - 21px)' }}>
                  80%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">javascript</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="60" style={{ width: '60%' }}></span>
                <span className="percent" style={{ right: 'calc(40% - 21px)' }}>
                  60%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">css</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="75" style={{ width: '75%' }}></span>
                <span className="percent" style={{ right: 'calc(25% - 21px)' }}>
                  75%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">react</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="65" style={{ width: '65%' }}></span>
                <span className="percent" style={{ right: 'calc(35% - 21px)' }}>
                  65%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">Next.js</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="90" style={{ width: '90%' }}></span>
                <span className="percent" style={{ right: 'calc(10% - 21px)' }}>
                  90%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">Typescript</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="85" style={{ width: '85%' }}></span>
                <span className="percent" style={{ right: 'calc(15% - 21px)' }}>
                  85%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">Node.js</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="60" style={{ width: '60%' }}></span>
                <span className="percent" style={{ right: 'calc(40% - 21px)' }}>
                  60%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">WebSockets</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="75" style={{ width: '75%' }}></span>
                <span className="percent" style={{ right: 'calc(25% - 21px)' }}>
                  75%<b className="arrow"></b>
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <span className="skill-text">Flutter</span>
              <div className="chart-bar">
                <span className="item-progress" data-percent="60" style={{ width: '60%' }}></span>
                <span className="percent" style={{ right: 'calc(40% - 21px)' }}>
                  60%<b className="arrow"></b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
