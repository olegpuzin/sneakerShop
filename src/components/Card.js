import React from 'react';
import ContentLoader from "react-content-loader";

import AppContext from '../context';
import styles from "../scss/Card.module.scss";


function Card({ id, imageUrl, title, price, favorited = false, loading = false }) {

  const { isItemAdded, onAddToCart, onAddToFavotite } = React.useContext(AppContext);

  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => onAddToCart(obj);

  const onClickFavorite = () => {
    onAddToFavotite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card} >
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onAddToFavotite &&
            (<div className={styles.favorite} onClick={onClickFavorite} >
              <img src={isFavorite ? ("img/unliked.svg") : ("img/like.svg")} alt="Select" />
            </div>)}
          <img className={styles.card_img} width={133} height={112} src={imageUrl} alt="Product" />
          <h5 className={styles.card_title}>{title}</h5>
          <div className={styles.card_price_info}>
            <div className={styles.card_price}>
              <span className={styles.card_price_text}>Price:</span>
              <span className={styles.card_price_sum}>{price} $</span>
            </div>
            <button className={styles.card_button}>
              {onAddToCart && (<img
                className={styles.card_button_img}
                onClick={onClickPlus}
                src={isItemAdded(id) ? ("img/plusProductActive.svg") : ("img/plusProduct.svg")}
                alt="Plus" />)}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
export default Card;