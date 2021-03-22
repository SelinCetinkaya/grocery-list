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
  const [shoppingListData, setShoppingListData] = useState({});
  const [toggleFetch, setToggleFetch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const categoriesReduce = (items) => {
    const reduced = items.reduce((acc, item) => {
      if (!acc[item.fields.category]) {
        acc[item.fields.category] = [];
      }
      acc[item.fields.category].push(item);
      return acc;
    }, {});
    setShoppingListData(reduced);
  };

  useEffect(() => {
    const getItemsInCategory = async () => {
      const response = await axios.get(
        `${baseURL}/stock-up?filterByFormula=%7BisInCart%7D+%3D+0`,
        config
      );
      categoriesReduce(response.data.records);
    };
    getItemsInCategory();
  }, [toggleFetch]);

  return (
    <div className="App">
      <Header />
      <div id="shopping-list-container">
        <CategoryTabs visible={visible} setVisible={setVisible} />
        <h2>Shopping List:</h2>
        <Route exact path="/">
          Please choose a category.
        </Route>
        <div id="shopping-list">
          <Route path="/category/:category">
            <CategoryContent
              setItemsInCart={setItemsInCart}
              itemsInCart={itemsInCart}
              setShoppingListData={setShoppingListData}
              shoppingListData={shoppingListData}
              setToggleFetch={setToggleFetch}
              toggleFetch={toggleFetch}
              visible={visible}
              setVisible={setVisible}
              visibleEdit={visibleEdit}
              setVisibleEdit={setVisibleEdit}
            />
          </Route>
          <Route path="/category/:category/edit/:id">
            <EditForm
              setToggleFetch={setToggleFetch}
              toggleFetch={toggleFetch}
              setShoppingListData={setShoppingListData}
              shoppingListData={shoppingListData}
              visibleEdit={visibleEdit}
              setVisibleEdit={setVisibleEdit}
            />
          </Route>
          <Route path="/category/:category/new">
            <NewForm
              setItemsInCart={setItemsInCart}
              setShoppingListData={setShoppingListData}
              shoppingListData={shoppingListData}
              setToggleFetch={setToggleFetch}
              toggleFetch={toggleFetch}
              visible={visible}
              setVisible={setVisible}
            />
          </Route>
        </div>
      </div>
      <hr />
      <div id="shopping-cart-container">
        <h2>All Items In Cart:</h2>
        <div id="shopping-cart">
          <ShoppingCart
            setShoppingListData={setShoppingListData}
            shoppingListData={shoppingListData}
            setItemsInCart={setItemsInCart}
            itemsInCart={itemsInCart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
