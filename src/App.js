import React from "react";
import axios from 'axios';
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Cart from "./components/Cart/Cart";
import AppContext from "./context";
import { Routes, Route } from "react-router-dom";


// const arr = [
//   {
//     title: "Nike Blazer Mid Suede",
//     price: 185,
//     imageUrl: "/img/sneakers/1.jpg"
//    },
//    {
//     title: "Nike Air Max 270",
//     price: 150,
//     imageUrl: "/img/sneakers/2.jpg"
//    },
// ]

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62dbdf9a4438813a260c4c1a.mockapi.io/cart'),
          axios.get('https://62dbdf9a4438813a260c4c1a.mockapi.io/favorites'),
          axios.get('https://62dbdf9a4438813a260c4c1a.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных :(');
        console.error(error);
      }
    }

    fetchData();
  }, []);


  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62dbdf9a4438813a260c4c1a.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://62dbdf9a4438813a260c4c1a.mockapi.io/cart', obj);
        
        console.log(data);
        // setCartItems((prev) => prev.map((item) => {
        //     if (item.parentId === data.parentId) {
        //       return {
        //         ...item,
        //         id: data.id,
        //       };
        //     }
        //     return item;
        //   })
        // )
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62dbdf9a4438813a260c4c1a.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };
  
  const onAddToFavotite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62dbdf9a4438813a260c4c1a.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter(((item) => Number(item.id) !== Number(obj.id))))
      } else {
        const { data } = await axios.post('https://62dbdf9a4438813a260c4c1a.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фовариты')
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, onAddToCart, isItemAdded, onAddToFavotite, setCartOpened, setCartItems }}>
      <div className="wrapper">

        <Header onClickCart={() => setCartOpened(true)} />

        {cartOpened && <Cart
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened ={cartOpened}
        />}
        <Routes>
          <Route path="/" element={
            <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavotite={onAddToFavotite}
                onAddToCard={onAddToCart}
                isLoading={isLoading} />} 
          />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
