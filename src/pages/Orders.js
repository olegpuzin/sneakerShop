import React from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import styles from "../pages/Home.module.scss";



function Orders() {
    
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://62dbdf9a4438813a260c4c1a.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.item], []))
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов :(');
                console.log(error);
            }
        })();
    }, []);


    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_title}>
                <h1 className={styles.title}>Мои заказы</h1>
            </div>
            <div className={styles.products}>
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )

}

export default Orders;