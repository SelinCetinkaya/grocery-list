import { Form, Input, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseURL, config } from "../services";
import axios from "axios";

function NewForm({
  visible,
  setVisible,
  setItemsInCart,
  setToggleFetch,
  toggleFetch,
}) {
  const [titleValue, setTitleValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const history = useHistory();
  const [form] = Form.useForm();
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
    console.log(visible);
    await axios.post(`${baseURL}/stock-up`, { fields: newItem }, config);
    setConfirmLoading(false);
    setVisible(false);
    setToggleFetch((curr) => !curr);
    // console.log(toggleFetch);
    // history.push(`/category/${params.category}`);

    // setModalText("Updating...");
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  if (visible) {
    console.log("visible is changing");
  }

  return (
    <Modal
      title="Add New Grocery List Item"
      visible={visible}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onSmile={console.log("smile")}
      okText="Submit"
    >
      <p>
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
      </p>
    </Modal>
  );
}

export default NewForm;
