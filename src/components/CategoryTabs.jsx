//axios call to render category tabs
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";
import { baseURL, config } from "../services";
import { Menu, Form, Input, Modal, Button, Popconfirm } from "antd";
import { PlusOutlined, CloseSquareOutlined } from "@ant-design/icons";

function CategoryTabs() {
  const [categories, setCategories] = useState([]);
  const [categoryToggleFetch, setCategoryToggleFetch] = useState(false);
  const [current, setCurrent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(`${baseURL}/categories`, config);
      const categories = response.data.records;
      setCategories([...categories, { id: "add" }]);
    };
    getCategories();
  }, [categoryToggleFetch]);

  useEffect(() => {
    const categoryName = pathname.split("/")[2];
    if (!categoryName) return;
    const item = categories.find((cat) => cat.fields.name === categoryName);
    if (item && item.id) setCurrent(item.id);
  }, [pathname, categories]);

  const addCategory = () => {
    setIsModalVisible(true);
  };

  const deleteCategory = async (id) => {
    await axios.delete(`${baseURL}/categories/${id}`, config);
    history.push("/");
    setCategoryToggleFetch(!categoryToggleFetch);
  };

  const MenuItemContent = ({ category }) => {
    if (category.id === "add") {
      return (
        <div onClick={addCategory}>
          <PlusOutlined />
          new category
        </div>
      );
    } else {
      return (
        <div>
          <Link to={`/category/${category.fields.name}`}>
            {category.fields.name}
          </Link>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => {
              deleteCategory(category.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" id="delete-button">
              <CloseSquareOutlined />
            </Button>
          </Popconfirm>
        </div>
      );
    }
  };

  const handleSubmit = async () => {
    const newCategory = {
      name: categoryValue,
    };
    await axios.post(`${baseURL}/categories`, { fields: newCategory }, config);
    setIsModalVisible(false);
    setCategoryToggleFetch((curr) => !curr);
  };

  return (
    <div id="tabs">
      <Menu
        style={{ width: "100%" }}
        selectedKeys={[current]}
        mode="horizontal"
      >
        {categories.map((category) => {
          return (
            <Menu.Item className="category-names" key={category.id}>
              <MenuItemContent key={category.id} category={category} />
            </Menu.Item>
          );
        })}
      </Menu>
      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Category Name" rules={[{ required: true }]}>
            <Input
              onChange={(e) => {
                setCategoryValue(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CategoryTabs;
