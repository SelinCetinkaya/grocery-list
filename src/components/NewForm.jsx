import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL, config } from "../services";
import axios from "axios";

function NewForm({ visible, setVisible, setToggleFetch }) {
  const [titleValue, setTitleValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const params = useParams();

  const handleSubmit = async () => {
    setConfirmLoading(true);
    const newItem = {
      title: titleValue,
      category: params.category,
      brand: brandValue,
      notes: notesValue,
      isInCart: 0,
    };
    await axios.post(`${baseURL}/stock-up`, { fields: newItem }, config);
    setConfirmLoading(false);
    setVisible(false);
    setToggleFetch((curr) => !curr);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Add New Grocery List Item"
      visible={visible}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Submit"
    >
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
      </Form>
    </Modal>
  );
}

export default NewForm;
