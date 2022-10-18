import React from "react";
import axios from 'axios';
import styles from "../scss/Cart.module.scss";
import Info from "../components/Info";

import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({ onClose, onRemove, items = [], opened }) {

    const { cartItems, setCartItems, totalPrice } = useCart();

    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    

    const onClickOrder = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.post('https://62dbdf9a4438813a260c4c1a.mockapi.io/orders', {item: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62dbdf9a4438813a260c4c1a.mockapi.io/cart/' + item.id);
                await delay(1000);
            };
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        };
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.cart}>
                <div className={styles.wrapper_box}>
                    <h2 className={styles.cart_title}>
                        Cart
                        <img
                            onClick={onClose}
                            width={32}
                            height={32}
                            className={styles.cart_btn_remove}
                            src="img/btnRemove.svg"
                            alt="Remove"
                        />
                    </h2>
                    {items.length > 0 ? (
                        <div>
                            <div className={styles.items}>
                                {items.map((obj) => (
                                    <div key={obj.id} className={styles.cart_item}>
                                        <div
                                            className={styles.cart_img_product}
                                            style={{ backgroundImage: `url(${obj.imageUrl})` }}>
                                        </div>
                                        <div className={styles.cart_info_product}>
                                            <p className={styles.cart_name_product}>{obj.title}</p>
                                            <b className={styles.cart_price_product}>{obj.price} $</b>
                                        </div>
                                        <img
                                            onClick={() => onRemove(obj.id)}
                                            width={32}
                                            height={32}
                                            className={styles.cart_btn_remove}
                                            src="img/btnRemove.svg"
                                            alt="Remove" />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.cart_total}>
                                <div className={styles.total_price_block}>
                                    <span className={styles.total_name}>Total:</span>
                                    <div className={styles.total_line}></div>
                                    <span className={styles.total_sum}> {totalPrice} $</span>
                                </div>
                                <div className={styles.total_tax_block}>
                                    <span className={styles.tax_name}>Tax 5%:</span>
                                    <div className={styles.tax_line}></div>
                                    <span className={styles.tax_sum}>{totalPrice / 100 * 5} $</span>
                                </div>
                                <button className={styles.cart_btn} disabled={isLoading} onClick={onClickOrder} >
                                    Pay
                                    <img src="img/arrow.svg" alt="Arrow" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Info title={isOrderComplete ? ("Order completed") : ("Empty cart")}
                            description={isOrderComplete
                                ? (`Your order #${orderId} will be delivered to courier soon`)
                                : ("Add at least one pair of sneakers to checkout.")
                            }
                            image={isOrderComplete ? ("img/cart/info.png") : ("img/cart/empty_cart.png")} />
                    )}
                </div>
            </div>
        </div>
    )
};

export default Cart;