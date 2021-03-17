import { Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import CategoryContent from "./components/CategoryContent";
import CategoryTabs from "./components/CategoryTabs";
import ShoppingCart from "./components/ShoppingCart";
import NewForm from "./components/Form";

function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [data, setData] = useState({});
  const [toggleFetch, setToggleFetch] = useState(false);

  return (
    <div className="App">
      <Header />
      <div id="shopping-list">
        <CategoryTabs />
        <Route path="/category/:category">
          <CategoryContent
            setItemsInCart={setItemsInCart}
            itemsInCart={itemsInCart}
            setData={setData}
            data={data}
            setToggleFetch={setToggleFetch}
            toggleFetch={toggleFetch}
          />
        </Route>
        <Route path="/category/:category/new">
          <NewForm
            setItemsInCart={setItemsInCart}
            data={data}
            setData={setData}
            setToggleFetch={setToggleFetch}
            toggleFetch={toggleFetch}
          />
        </Route>
      </div>
      <div id="shopping-cart">
        <ShoppingCart
          data={data}
          setData={setData}
          setItemsInCart={setItemsInCart}
          itemsInCart={itemsInCart}
        />
      </div>
    </div>
  );
}

export default App;
