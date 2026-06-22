import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItem(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [nftId]);

 if (loading) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* Left Side - NFT Image */}
              <div className="col-md-6 text-center">
                <div className="skeleton" style={{ width: "100%", height: "400px", borderRadius: "10px" }}></div>
              </div>

              {/* Right Side - Item Info */}
              <div className="col-md-6">
                <div className="item_info">
                  {/* Title */}
                  <div className="skeleton" style={{ width: "70%", height: "30px", marginBottom: "15px" }}></div>

                  {/* Views & Likes */}
                  <div className="d-flex" style={{ gap: "15px", marginBottom: "20px" }}>
                    <div className="skeleton" style={{ width: "80px", height: "20px" }}></div>
                    <div className="skeleton" style={{ width: "80px", height: "20px" }}></div>
                  </div>

                  {/* Description */}
                  <div className="skeleton" style={{ width: "100%", height: "18px", marginBottom: "8px" }}></div>
                  <div className="skeleton" style={{ width: "100%", height: "18px", marginBottom: "8px" }}></div>
                  <div className="skeleton" style={{ width: "60%", height: "18px", marginBottom: "25px" }}></div>

                  {/* Owner */}
                  <div className="d-flex flex-row" style={{ marginBottom: "25px" }}>
                    <div className="mr40">
                      <div className="skeleton" style={{ width: "60px", height: "16px", marginBottom: "10px" }}></div>
                      <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                        <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                        <div className="skeleton" style={{ width: "100px", height: "16px" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Creator */}
                  <div style={{ marginBottom: "25px" }}>
                    <div className="skeleton" style={{ width: "60px", height: "16px", marginBottom: "10px" }}></div>
                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                      <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                      <div className="skeleton" style={{ width: "100px", height: "16px" }}></div>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="skeleton" style={{ width: "50px", height: "16px", marginBottom: "10px" }}></div>
                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                      <div className="skeleton" style={{ width: "20px", height: "20px", borderRadius: "50%" }}></div>
                      <div className="skeleton" style={{ width: "80px", height: "24px" }}></div>
                    </div>
                  </div>
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
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item?.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item?.title || "Rainbow Style #194"}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item?.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item?.likes || 0}
                    </div>
                  </div>
                  <p>
                    {item?.description || "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.ownerId}`}>
                            <img className="lazy" src={item?.ownerImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.ownerId}`}>{item?.ownerName || "Monica Lucas"}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.creatorId}`}>
                            <img className="lazy" src={item?.creatorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.creatorId}`}>{item?.creatorName || "Monica Lucas"}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item?.price || "1.85"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;