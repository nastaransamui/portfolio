import { FC, KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUI } from 'src/hooks/UIProvider';
import { emailRegex, INVALID_NAME_KEYS } from '../constants';

type ContactUsFormType = {
  name: string;
  email: string;
  message: string;
  website: string;
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
      message: '',
      website: '',
    }
  })

  const handleContactSubmit = async (data: ContactUsFormType) => {
    setLoading(true);
    setSubmitMessage(submitInit);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { message?: string; success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send your message right now.');
      }

      setSubmitMessage({ message: result.message || 'Thanks, your message has been sent.', hasError: false });
      reset();
    } catch (error) {
      setSubmitMessage({
        message: error instanceof Error ? error.message : 'Unable to send your message right now.',
        hasError: true,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitMessage(submitInit), 5000);
    }
  };

  return (
    <section id="contact" className={nav === 'contact' ? 'active' : ''}>
      {loading && <div className="loading-overlay" role="status" aria-live="polite">
        <div className="spinner"></div>
        <span className="sr-only">Sending your message</span>
      </div>}
      <div className="contact-container">
        <div className="container page-title text-center">
          <h2 className="text-center">
            get <span>in touch</span>
          </h2>
          <span className="title-head-subtitle">
            I’m always open to discussing development or partnerships.
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
                If you have a suggestion, a project, or simply want to say hello, fill out the form below and I’ll reply soon.
              </p>
              <form className="contactform" noValidate aria-busy={loading} onSubmit={handleSubmit(handleContactSubmit)}>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                </div>
                <div className="row">
                  <div className="form-group col-xl-6" style={{ position: 'relative' }}>
                    <i className="fa fa-user prefix"></i>
                    <label className="sr-only" htmlFor="name">Your name</label>
                    <input
                      id="name"
                      type="text"
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (INVALID_NAME_KEYS.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      {...register('name', {
                        required: 'Name is required.',
                        minLength: { value: 2, message: 'Name must have at least 2 characters.' },
                        maxLength: { value: 80, message: 'Name cannot exceed 80 characters.' },
                      })}
                      className="form-control"
                      placeholder="YOUR NAME"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      required
                    />
                    {
                      errors.name && <span id="name-error" role="alert" style={{ color: 'crimson', position: 'absolute', left: 25 }}>
                        {errors.name.message}
                      </span>
                    }
                  </div>
                  <div className="form-group col-xl-6">
                    <i className="fa fa-envelope prefix"></i>
                    <label className="sr-only" htmlFor="email">Your email address</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required.',
                        maxLength: { value: 254, message: 'Email cannot exceed 254 characters.' },
                        pattern: { value: emailRegex, message: 'Enter a valid email address.' },
                      })}
                      className="form-control"
                      placeholder="YOUR EMAIL"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {
                      errors.email && <span id="email-error" role="alert" style={{ color: 'crimson', position: 'absolute', left: 25 }}>
                        {errors.email.message}
                      </span>
                    }
                  </div>
                  <div className="form-group col-xl-12">
                    <i className="fa fa-comments prefix"></i>
                    <label className="sr-only" htmlFor="comment">Your message</label>
                    <textarea
                      id="comment"
                      {...register('message', {
                        required: 'Message is required.',
                        minLength: { value: 10, message: 'Message must have at least 10 characters.' },
                        maxLength: { value: 3000, message: 'Message cannot exceed 3000 characters.' },
                      })}
                      className="form-control"
                      placeholder="YOUR MESSAGE"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      required
                    ></textarea>
                    {
                      errors.message && <span id="message-error" role="alert" style={{ color: 'crimson', position: 'absolute', left: 25 }}>
                        {errors.message.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="submit-form">
                  <button className="btn button-animated" type="submit" name="send" disabled={loading}>
                    <span>
                      <i className="fa fa-send"></i> Send Message
                    </span>
                  </button>
                </div>
                <div className="form-message">
                  <div
                    className={submitMessage.hasError ? 'empty_notice' : "returnmessage"}
                    role={submitMessage.hasError ? 'alert' : 'status'}
                    aria-live="polite"
                    style={{ display: submitMessage.message !== '' ? 'block' : 'none' }}
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
