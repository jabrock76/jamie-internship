import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(response.data);
        setFollowerCount(response.data.followers || 0);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [authorId]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowerCount((prev) => prev - 1);
    } else {
      setFollowerCount((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const copyToClipboard = () => {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
    }
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton skeleton-avatar-large"></div>
                        <div className="profile_name">
                          <div className="skeleton skeleton-title" style={{ width: "200px", marginBottom: "10px" }}></div>
                          <div className="skeleton skeleton-text" style={{ width: "150px", marginBottom: "10px" }}></div>
                          <div className="skeleton skeleton-text" style={{ width: "300px" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="skeleton skeleton-text" style={{ width: "100px", marginBottom: "10px" }}></div>
                        <div className="skeleton skeleton-button"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems authorId={authorId} loading={true} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author?.authorImage || AuthorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName || "Monica Lucas"}
                          <span className="profile_username">@{author?.tag || "monicaaaa"}</span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address || "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7"}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={copyToClipboard}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followerCount} followers</div>
                      <button onClick={handleFollowToggle} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} authorImage={author?.authorImage} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;