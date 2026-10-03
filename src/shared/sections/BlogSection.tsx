/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useUI } from 'src/hooks/UIProvider';
import { blogPosts } from '../constants';

const BlogSection: FC = () => {
  const { nav, setSelectedPost, setBlogModalOpen, } = useUI();
  return (
    <section id="blog" className={nav === 'blog' ? 'active' : ''}>
      <div className="container page-title text-center">
        <h2 className="text-center">
          latest <span>posts</span>
        </h2>
        <span className="title-head-subtitle">
          practical lessons from real frontend and platform engineering work
        </span>
      </div>
      <div className="container">
        <div className="row">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="col-12 col-sm-6">
              <article>
                <figure className="blog-figure">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(post);
                      setBlogModalOpen(true);
                    }}
                  >
                    <img className="img-fluid" src={post.img} alt={post.title} />
                  </a>
                  <div className="post-date">
                    <span>{post.date.day}</span>
                    <span>{post.date.month}</span>
                  </div>
                </figure>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPost(post);
                    setBlogModalOpen(true);
                  }}
                >
                  <h4>{post.title}</h4>
                </a>
                <div className="blog-excerpt">
                  <p>{post.des[0].substring(0, 92)}... </p>
                  <a
                    href="#"
                    className="btn readmore"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(post);
                      setBlogModalOpen(true);
                    }}
                  >
                    <span>Read more</span>
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
