import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { baseURL, config } from "../services";
import { Checkbox, List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function CategoryContent({
  shoppingListData,
  setShoppingListData,
  setItemsInCart,
  itemsInCart,
  setVisible,
  setVisibleEdit,
}) {
  const { category } = useParams();

  // const getItemsInCategory = async () => {
  //   if (data[category]) return;
  //   const response = await axios.get(
  //     `${baseURL}/stock-up?filterByFormula=%7Bcategory%7D+%3D+%22${category}%22`,
  //     config
  //   );
  //   const items = response.data.records.filter((item) => !item.fields.isInCart);
  //   console.log(items);
  //   setData({ ...data, [category]: items });
  // };

  // useEffect(() => {
  //   getItemsInCategory();
  //   console.log(toggleFetch);
  //   console.log(data);
  // }, [category, toggleFetch]);

  async function onChange(e) {
    const item = e.target.value;
    removeFromList(item);
    addToCart(item);
    const newItem = { fields: { ...item.fields, isInCart: 1 } };
    await axios.put(`${baseURL}/stock-up/${item.id}`, newItem, config);
  }

  const removeFromList = (item) => {
    const items = [...shoppingListData[category]];
    const index = items.indexOf(item);
    items.splice(index, 1);
    setShoppingListData({ ...shoppingListData, [category]: items });
  };

  const addToCart = (item) => {
    console.log(item);
    setItemsInCart([...itemsInCart, item]);
  };

  const showModal = () => {
    setVisible(true);
  };

  const showEditModal = () => {
    setVisibleEdit(true);
  };

  return (
    <div id="category-content">
      <List
        className="unordered-list"
        itemLayout="horizontal"
        dataSource={shoppingListData[category]}
        renderItem={(item) => (
          <List.Item className="list-item">
            <Checkbox
              onChange={onChange}
              value={item}
              checked={false}
              key={item.id}
            >
              <span className="list-item-title">{item.fields.title}</span>
              <span className="list-item-brand-notes">
                <br /> {item.fields.brand}
                <br /> {item.fields.notes}
              </span>
            </Checkbox>
            <Link to={`/category/${category}/edit/${item.id}`}>
              <button onClick={showEditModal} id="edit-button">
                edit
              </button>
            </Link>
          </List.Item>
        )}
      />
      <Link to={`/category/${category}/new`}>
        <Button id="add-item-button" type="primary" onClick={showModal}>
          <PlusOutlined /> Add New Item
        </Button>
      </Link>
    </div>
  );
}

export default CategoryContent;
