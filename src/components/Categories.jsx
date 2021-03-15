import axios from "axios";
import { baseURL, config } from "../services";
import { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get(baseURL, config);
    setCategories(response.data.records);
  };
  getCategories();

  return (
    <div>
      {categories.map((item) => (
        <h2>{item.fields.title}</h2>
      ))}
    </div>
  );
}

export default Categories;
