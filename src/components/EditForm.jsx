import { Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseURL, config } from "../services";
import axios from "axios";

function EditForm({ setToggleFetch, data }) {
  const [titleValue, setTitleValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  // const [category, setCategory] = useState("");
  const { category, id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id && data[category]) {
      const groceryItem = data[category].find((item) => item.id === id);
      console.log(groceryItem);
      if (groceryItem) {
        setTitleValue(groceryItem.fields.title);
        setBrandValue(groceryItem.fields.brand);
        setNotesValue(groceryItem.fields.notes);
      }
    }
  }, [id, data]);

  const handleSubmit = async () => {
    console.log(data);
    const editedItem = {
      title: titleValue,
      category: category,
      brand: brandValue,
      notes: notesValue,
      isInCart: 0,
    };
    await axios.put(
      `${baseURL}/stock-up/${id}`,
      { fields: editedItem },
      config
    );
    setToggleFetch((curr) => !curr);
    history.push(`/category/${category}`);
  };

  const deleteItem = async (e) => {
    e.preventDefault();
    await axios.delete(`${baseURL}/stock-up/${id}`, config);
    setToggleFetch((curr) => !curr);
    history.push(`/category/${category}`);
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
        <Button htmlType="delete" onClick={deleteItem}>
          delete
        </Button>
      </Form.Item>
      <button onClick={() => history.push(`/category/${category}`)}>
        cancel
      </button>
    </Form>
  );
}

export default EditForm;
