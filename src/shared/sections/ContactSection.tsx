import { FC, KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUI } from 'src/hooks/UIProvider';
import { emailRegex, INVALID_NAME_KEYS } from '../constants';

type ContactUsFormType = {
  name: string;
  email: string;
  message: string;
}
interface SubmitMessageType {
  message: string;
  hasError: boolean;
}
const submitInit = { message: '', hasError: false }
const ContactSection: FC = () => {

  const { nav } = useUI()
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessageType>(submitInit);;

  const { handleSubmit, formState: { errors }, reset, register, } = useForm<ContactUsFormType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const handleContactSubmit = async (data: ContactUsFormType) => {
    setLoading(true)
    const res = await fetch('/api/contact', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (res.status !== 200) {
      setLoading(false)
      setSubmitMessage({ message: "Server Error", hasError: true });
      return
    }
    const result = await res.json();
    const { message, success } = result;
    if (success) {
      setLoading(false)
      setSubmitMessage({ message: message, hasError: false });
      reset()
    } else {
      setLoading(false)
      setSubmitMessage({ message: "Server Error", hasError: true });
    }
    setTimeout(() => {
      setSubmitMessage(submitInit)
    }, 5000);
  };

  return (
    <section id="contact" className={nav === 'contact' ? 'active' : ''}>
      {loading && <div className="loading-overlay">
        <div className="spinner"></div>
      </div>}
      <div className="contact-container">
        <div className="container page-title text-center">
          <h2 className="text-center">
            get <span>in touch</span>
          </h2>
          <span className="title-head-subtitle">
            I’m always open to discussing developement  or partnerships.
          </span>
        </div>
        <div className="container">
          <div className="row contact">
            <div className="col-12 col-md-4 col-xl-4 leftside">
              <ul className="custom-list">
                <li>
                  <h6 className="font-weight-600">
                    <span className="contact-title">Phone</span>
                    <i className="fa fa-whatsapp"></i>
                    <span className="contact-content">+66 870 624648</span>
                  </h6>
                </li>
                <li>
                  <h6 className="font-weight-600">
                    <span className="contact-title">email</span>
                    <i className="fa fa-envelope-o fs-14"></i>
                    <span className="contact-content">mjcode2020@gmail.com</span>
                  </h6>
                </li>
                <li>
                  <h6 className="font-weight-600">
                    <span className="contact-title">linkedin</span>
                    <i className="fa fa-linkedin"></i>
                    <span className="contact-content">
                      <a target="_blank" rel="noopener noreferrer" title="LinkedIn" href="https://www.linkedin.com/in/majid-vezvaee-3a764371">majid-vezvaee</a>
                    </span>
                  </h6>
                </li>
                {/* <li>
                  <h6 className="font-weight-600">
                    <span className="contact-title">Dribbble </span>
                    <i className="fa fa-dribbble"></i>
                    <span className="contact-content">daria.dribble</span>
                  </h6>
                </li> */}
              </ul>
              <div className="social">
                <h6 className="font-weight-600 uppercase">Social Profiles</h6>
                <ul className="list-inline social social-intro text-center p-none">
                  <li className="facebook">
                    <a target="_blank" rel="noopener noreferrer" title="LinkedIn" href="https://www.linkedin.com/in/majid-vezvaee-3a764371">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  {/* <li className="twitter">
                    <a title="Twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="youtube">
                    <a title="Youtube" href="#">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li className="dribbble">
                    <a title="Dribbble" href="#">
                      <i className="fa fa-dribbble"></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 col-xl-8 rightside">
              <p>
                If you have any suggestion, project or even you want to say Hello. please fill out the form below and I
                will reply you shortly.
              </p>
              <form className="contactform" noValidate onSubmit={handleSubmit(handleContactSubmit)}>
                <div className="row">
                  <div className="form-group col-xl-6" style={{ position: 'relative' }}>
                    <i className="fa fa-user prefix"></i>
                    <input
                      id="name"
                      type="text"
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (INVALID_NAME_KEYS.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      {...register('name', { required: 'This field is required' })}
                      className="form-control"
                      placeholder="YOUR NAME"
                      required
                    />
                    {
                      errors.name && <span style={{ color: 'crimson', position: 'absolute', left: 25 }}>
                        {errors.name.message}
                      </span>
                    }
                  </div>
                  <div className="form-group col-xl-6">
                    <i className="fa fa-envelope prefix"></i>
                    <input
                      id="email"
                      type="email"
                      {...register('email', { required: 'This field is required', pattern: { value: emailRegex, message: 'Email should look like an email.' } })}
                      className="form-control"
                      placeholder="YOUR EMAIL"
                      required
                    />
                    {
                      errors.email && <span style={{ color: 'crimson', position: 'absolute', left: 25 }}>
                        {errors.email.message}
                      </span>
                    }
                  </div>
                  <div className="form-group col-xl-12">
                    <i className="fa fa-comments prefix"></i>
                    <textarea
                      id="comment"
                      {...register('message', { required: 'This field is required' })}
                      className="form-control"
                      placeholder="YOUR MESSAGE"
                      required
                    ></textarea>
                    {
                      errors.message && <span style={{ color: 'crimson', position: 'absolute', left: 25 }}>
                        {errors.message.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="submit-form">
                  <button className="btn button-animated" type="submit" name="send">
                    <span>
                      <i className="fa fa-send"></i> Send Message
                    </span>
                  </button>
                </div>
                <div className="form-message">
                  <div className={submitMessage.hasError ? 'empty_notice' : "returnmessage"} style={{ display: submitMessage.message !== '' ? 'block' : 'none' }}
                  >
                    <span>{submitMessage.message}</span>
                    {/* <span>Your message has been received, We will contact you soon.</span> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
