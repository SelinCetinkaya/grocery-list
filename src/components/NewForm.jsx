import { Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseURL, config } from "../services";
import axios from "axios";

function NewForm({
  data,
  setData,
  setItemsInCart,
  setToggleFetch,
  toggleFetch,
}) {
  const [titleValue, setTitleValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const history = useHistory();
  const [form] = Form.useForm();
  const params = useParams();

  const handleSubmit = async () => {
    const newItem = {
      title: titleValue,
      category: params.category,
      brand: brandValue,
      notes: notesValue,
      isInCart: 0,
    };
    await axios.post(`${baseURL}/stock-up`, { fields: newItem }, config);
    setToggleFetch((curr) => !curr);
    // console.log(toggleFetch);
    history.push(`/category/${params.category}`);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Item" rules={[{ required: true }]}>
        <Input
          onChange={(e) => {
            setTitleValue(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Brand" rules={[{ required: false }]}>
        <Input
          onChange={(e) => {
            setBrandValue(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Notes" rules={[{ required: false }]}>
        <Input
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
      <button onClick={() => history.push(`/category/${params.category}`)}>
        cancel
      </button>
    </Form>
  );
}

export default NewForm;
