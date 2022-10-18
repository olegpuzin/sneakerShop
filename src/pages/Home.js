import React from "react";

import Card from "../components/Card";
import SliderComponent from "../components/SliderComponent";
import styles from "../scss/Home.module.scss";


function Home({items, searchValue, setSearchValue, onChangeSearchInput, isLoading}) {

    const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                loading={isLoading}
                {...item}
            />
        ));
    };


    return (
        <div className={styles.wrapper}>
            <SliderComponent />
            <div className={styles.wrapper_title}>
                <h1 className={styles.title}>{searchValue ? `Search: "${searchValue}"` : "All sneakers"}</h1>
                <div className={styles.search_block}>
                    <img className={styles.search_img} src="img/search.svg" alt="Search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className={styles.search_clear_img}
                            src="img/btnRemove.svg"
                            alt="Clear"
                        />
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder="Search..." />
                </div>
            </div>
            <div className={styles.products}>{renderItems()}</div>
        </div>
    );
};

export default Home;