import styles from "./index.module.scss";
import heartFill from '../../assets/heart-fill.svg';
import heartStroke from '../../assets/heart-stroke.svg';
import { useState, useEffect } from "react";

const Product = ({ data, handleFvt }) => {
  const [isFvt, setIsFvt] = useState(false);
  const { bedrooms, bathsFull, bathsHalf, area } = data?.property;

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('fvtItems'));
    if (items) {
      if (items.includes(data.mlsId)) setIsFvt(true);
    }
  }, []);
  return (
    <div className={styles.prodMainWrapper}>
      <figure>
        <img className="img-fluid" src={data?.photos[0]} alt="product picture" />
      </figure>
      <div className={styles.textWrapper}>
        <span className={styles.firstSpan}>{bedrooms} BR | {bathsFull + bathsHalf / 2} Baths | {area} Sq Ft</span>
        <h5>${data?.listPrice}</h5>
        <span className={styles.address}>{data?.address?.full}</span>
        <span className={styles.date}>Listed: {new Date(data?.listDate).toLocaleDateString("en-US")}</span>
      </div>
      <div className={styles.iconWrapper}>
        <img
          className="img-fluid"
          src={isFvt ? heartFill : heartStroke}
          alt="favorite icon"
          onClick={() => {
            handleFvt(data?.mlsId);
            setIsFvt(!isFvt);
          }}
        />
      </div>
    </div>
  );
};

export default Product;