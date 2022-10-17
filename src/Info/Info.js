import React from 'react'
import AppContext from '../context';
import styles from '../Info/Info.module.scss';

const Info = ({ title, image, descrintion }) => {

    const {setCartOpened} = React.useContext(AppContext);

    return (
        <div className={styles.cart_empty}>
            <img className={styles.cart_empty_img} src={image} alt="Empty cart" />
            <h2 className={styles.cart_empty_title}>{title}</h2>
            <p className={styles.cart_empty_text}>{descrintion}</p>
            <button
                className={styles.cart_btn}
                onClick={() => setCartOpened(false)}>
                <img src="img/cart/arrow.svg" alt="Arrow" />
                Return back
            </button>
        </div>
    )    
}

export default Info;
