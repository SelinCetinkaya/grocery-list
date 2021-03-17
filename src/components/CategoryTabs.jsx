//axios call to render category tabs
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL, config } from "../services";
import { Menu } from "antd";

function CategoryTabs() {
  const [categories, setCategories] = useState([]);
  const [current, setCurrent] = useState("");
  const getCategories = async () => {
    const response = await axios.get(`${baseURL}/categories`, config);
    console.log(response);
    setCategories(response.data.records);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleClick = (e) => {
    setCurrent(`${e.key}`);
  };

  return (
    <div style={{ width: "100%" }} id="tabs">
      <Menu
        style={{ width: "100%" }}
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        {categories.map((category) => (
          <Menu.Item key={category.id}>
            <Link to={`/category/${category.fields.name}`}>
              {category.fields.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default CategoryTabs;
