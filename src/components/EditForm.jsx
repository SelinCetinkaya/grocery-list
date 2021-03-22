import { Form, Input, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseURL, config } from "../services";
import axios from "axios";

function EditForm({
  setToggleFetch,
  shoppingListData,
  visibleEdit,
  setVisibleEdit,
}) {
  const [titleValue, setTitleValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { category, id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id && shoppingListData[category]) {
      const groceryItem = shoppingListData[category].find(
        (item) => item.id === id
      );
      if (groceryItem) {
        setTitleValue(groceryItem.fields.title);
        setBrandValue(groceryItem.fields.brand);
        setNotesValue(groceryItem.fields.notes);
      } else {
        history.push(`/category/${category}`);
      }
    }
  }, [id, shoppingListData, history, category]);

  const handleSubmit = async () => {
    setConfirmLoading(true);
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
    setConfirmLoading(false);
    setVisibleEdit(false);
    setToggleFetch((curr) => !curr);
  };

  const deleteItem = async (e) => {
    e.preventDefault();
    await axios.delete(`${baseURL}/stock-up/${id}`, config);
    setToggleFetch((curr) => !curr);
    history.push(`/category/${category}`);
  };

  const handleCancel = () => {
    setVisibleEdit(false);
  };

  return (
    <Modal
      title="Edit Grocery List Item"
      visible={visibleEdit}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Submit"
    >
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
          <Button type="text" danger htmlType="delete" onClick={deleteItem}>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditForm;
