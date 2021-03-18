import { Route } from "react-router-dom";
import "./App.css";
import { baseURL, config } from "./services";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import CategoryContent from "./components/CategoryContent";
import CategoryTabs from "./components/CategoryTabs";
import ShoppingCart from "./components/ShoppingCart";
import NewForm from "./components/NewForm";
import EditForm from "./components/EditForm";

function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [data, setData] = useState({});
  const [toggleFetch, setToggleFetch] = useState(false);

  const getItemsInCategory = async () => {
    const response = await axios.get(
      `${baseURL}/stock-up?filterByFormula=%7BisInCart%7D+%3D+0`,
      config
    );
    categoriesReduce(response.data.records);
  };

  const categoriesReduce = (items) => {
    const reduced = items.reduce((acc, item) => {
      if (!acc[item.fields.category]) {
        acc[item.fields.category] = [];
      }
      acc[item.fields.category].push(item);
      return acc;
    }, {});
    console.log(reduced);
    setData(reduced);
  };

  // const categoriesArr = Object.entries(categories);

  useEffect(() => {
    getItemsInCategory();
    // console.log(toggleFetch);
    // console.log(data);
  }, [toggleFetch]);

  return (
    <div className="App">
      <Header />
      <CategoryTabs />
      <h2>Shopping List:</h2>
      <div id="shopping-list">
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
        <Route path="/category/:category/edit/:id">
          <EditForm
            setToggleFetch={setToggleFetch}
            toggleFetch={toggleFetch}
            setData={setData}
            data={data}
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
      <hr />
      <h2>In Cart:</h2>
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
