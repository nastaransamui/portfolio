/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useUI } from 'src/hooks/UIProvider';

const BlogModal: FC = () => {
  const { blogModalOpen, setBlogModalOpen, selectedPost, } = useUI();
  return (
    <div className="modal__container">
      <div className={`istambul_tm_modalbox ${blogModalOpen ? 'opened' : ''}`}>
        <div className="box_inner">
          <div className="close">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setBlogModalOpen(false);
              }}
            >
              <i className="fa fa-times"></i>
            </a>
          </div>
          <div className="description_wrap">
            <div className="news_popup_details">
              <div className="top_image">
                <img src="img/4-2.jpg" alt="" />
                <div
                  className="main"
                  style={{
                    backgroundImage: selectedPost?.img ? `url(${selectedPost.img})` : 'none',
                  }}
                ></div>
              </div>
              <div className="news_main_title">
                <h3>{selectedPost?.title || 'title'}</h3>
                <span>
                  <a href="#">{selectedPost?.tag || ''}</a>
                </span>
                <div></div>
              </div>
              <div className="text">
                {selectedPost?.des.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogModal;
