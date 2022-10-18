import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';
import AppContext from '../context';
import styles from "../scss/Header.module.scss";


function Header(props) {

  const { cartItems, favorites } = React.useContext(AppContext);
  const { totalPrice } = useCart();

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.headerLeft}>
          <div className={styles.wraper_logo_img}>
            <img
              width={40}
              height={46}
              className={styles.logo_img}
              src="img/logo.png"
              alt="Logo" />
          </div>
          <div className={styles.logo_name}>
            <h3 className={styles.logo_name_title}>SneakerShop</h3>
            <p className={styles.logo_name_text}>Shop the best sneakers</p>
          </div>
        </div>
      </Link>
      <ul className={styles.headerRight}>
        <li className={styles.headerRight_icon}>
          <Link to='/favorites'>
            <img width={18} height={18} className={styles.headerRight_icon_img} src={favorites.length > 0 ? "img/heart.svg" : "img/favorite.svg"} alt="Favorite" />
          </Link>

        </li>
        <li className={styles.headerRight_icon}>
          <Link to='/orders'>
            <img width={18} height={18} className={styles.headerRight_icon_img} src="img/user.svg" alt="User" />
          </Link>
        </li>
        <li
          className={styles.headerRight_icon}
          onClick={props.onClickCart}>
          <img width={18} height={18} className={styles.headerRight_icon_cart} src="img/cart.svg" alt="Cart" />
          <span className={`${cartItems.length > 0 ? styles.headerRight_cart_sum_active : styles.headerRight_cart_sum}`}>{totalPrice} $</span>
        </li>
      </ul>
    </header>
  )
};

export default Header;