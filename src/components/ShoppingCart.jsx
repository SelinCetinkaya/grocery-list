import { useEffect } from "react";
import axios from "axios";
import { baseURL, config } from "../services";
import { Checkbox, List } from "antd";

function ShoppingCart({ itemsInCart, setItemsInCart, setData, data }) {
  const getItemsInCart = async () => {
    const response = await axios.get(
      `${baseURL}/stock-up?filterByFormula=%7BisInCart%7D+%3D+1`,
      config
    );
    setItemsInCart(response.data.records);
  };

  useEffect(() => {
    getItemsInCart();
  }, []);

  function onChange(e) {
    const item = e.target.value;
    removeFromCart(item);
    addToData(item);
  }

  const removeFromCart = (item) => {
    const index = itemsInCart.indexOf(item);
    let newItems = [...itemsInCart];
    newItems.splice(index, 1);
    setItemsInCart(newItems);
  };

  const addToData = (item) => {
    const category = item.fields.category;
    const items = data[category] || [];
    console.log(data);
    setData({ ...data, [category]: [...items, item] });
  };

  return (
    // <div id="list">
    //   {itemsInCart.map((item) => (
    //     <Checkbox onChange={onChange} checked value={item} key={item.id}>
    //       {item.fields.title}
    //       <br /> {item.fields.brand}
    //       <br /> {item.fields.notes}
    //     </Checkbox>
    //   ))}
    // </div>
    <div>
      <h2>In Cart:</h2>
      <List
        itemLayout="horizontal"
        dataSource={itemsInCart}
        renderItem={(item) => (
          <List.Item className="list-item">
            <Checkbox onChange={onChange} checked value={item} key={item.id}>
              {item.fields.title}
              <br />
              Brand : {item.fields.brand}
              <br />
              Notes: {item.fields.notes}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ShoppingCart;
