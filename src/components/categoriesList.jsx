import React, {useEffect, useState} from "react";
import {getCategories} from "../tools/categoryRequest";
import MyTable from "./commons/table";

const headers = {
  id: 'ID',
  name: 'Nombre'
}

export default function CategoriesList({actions}) {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const response = await getCategories();
    setCategories(response);
  }, []);


  return (
    <MyTable
      data={categories}
      headers={headers}
      pagination={{}}
      actions={actions}
    />
  );
}