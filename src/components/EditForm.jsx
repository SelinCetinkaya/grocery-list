import { Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseURL, config } from "../services";
import axios from "axios";

function EditForm({ toggleFetch, setToggleFetch, data, setData }) {
  const [titleValue, setTitleValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const [category, setCategory] = useState("");
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.id) {
      const groceryItem = data[params.category].find(
        (item) => item.id === params.id
      );
      if (groceryItem) {
        setTitleValue(groceryItem.title);
        setBrandValue(groceryItem.brand);
        setNotesValue(groceryItem.notes);
        setCategory(params.category);
      }
    }
  }, []);

  const handleSubmit = async () => {
    console.log(data);
    const editedItem = {
      title: titleValue,
      category: params.category,
      brand: brandValue,
      notes: notesValue,
      isInCart: 0,
    };
    await axios.put(
      `${baseURL}/stock-up/${params.id}`,
      { fields: editedItem },
      config
    );
    setToggleFetch((curr) => !curr);
    history.push(`/category/${params.category}`);
  };

  const deleteItem = async (e) => {
    e.preventDefault();
    await axios.delete(`${baseURL}/stock-up/${params.id}`, config);
    setToggleFetch((curr) => !curr);
    history.push(`/category/${params.category}`);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Item" rules={[{ required: true }]}>
        <Input
          value={titleValue}
          onChange={(e) => {
            setTitleValue(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Brand" rules={[{ required: false }]}>
        <Input
          value={brandValue}
          onChange={(e) => {
            setBrandValue(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Notes" rules={[{ required: false }]}>
        <Input
          value={notesValue}
          onChange={(e) => {
            setNotesValue(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <button onClick={deleteItem}>delete</button>
    </Form>
  );
}

export default EditForm;
