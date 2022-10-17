import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";
import styles from "../pages/Home.module.scss";


function Favorites() {

    const {favorites, onAddToFavotite} = React.useContext(AppContext); 

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_title}>
                <h1 className={styles.title}>Мои закладки</h1>
            </div>
            <div className={styles.products}>
            {favorites.map((item, index,) => (
                <Card
                key={index}
                {...item}
                favorited={true}
                onFavorite={onAddToFavotite}
                />
            ))}
            </div>
        </div>
    );

}

export default Favorites;