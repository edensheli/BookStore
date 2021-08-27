import React from "react";
import { Catergory } from "../common/interfaces/Category";
import { useGetCategories } from "../hooks/category/useGetCategories";

function Check() {
  const categories = useGetCategories();

  return (
    <div>
      <h1>Hey</h1>
      {categories &&
        categories.map((c: Catergory) => {
          return <p>{c.name}</p>;
        })}
    </div>
  );
}

export default Check;
