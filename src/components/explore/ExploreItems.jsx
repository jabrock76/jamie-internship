import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        
        const response = await axios.get(url);
        setItems(response.data);
        setDisplayedItems(response.data.slice(0, 8));
        setVisibleCount(8);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  useEffect(() => {
    setDisplayedItems(items.slice(0, visibleCount));
  }, [visibleCount, items]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const expiry = new Date(expiryDate).getTime();
        const difference = expiry - now;

        if (difference <= 0) {
          setTimeLeft("Expired");
          return;
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(interval);
    }, [expiryDate]);

    return <div className="de_countdown">{timeLeft}</div>;
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
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
          ))
        : displayedItems.map((item) => (
            <div
              key={item.nftId}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                
                {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;