import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ authorId, authorImage, loading: parentLoading }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        setItems(response.data.nftCollection || []); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [authorId]);

  if (loading || parentLoading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`skeleton-${index}`}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="skeleton skeleton-avatar"></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="skeleton skeleton-img"></div>
                  </div>
                  <div className="nft__item_info">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-code"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img className="lazy" src={authorImage || item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="nft__item_preview"
                      alt=""
                      style={{ width: "100%", height: "200px", display: "block", objectFit: "cover" }}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;