import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { Product } from "./Product"
import { useSearchParams } from "react-router-dom";



export const Products = () => {
  const [searchParams] = useSearchParams();
  const { products, setCategory } = useProducts();
  const category = searchParams.get("category");

  useEffect(() => {
    setCategory(category);
  }, [category, setCategory]);

  const categoryTranslations = {
    tea: "Чай",
    coffee: "Кофе",
    teapots: "Чайники",
    cezves: "Турки",
    other: "Прочее"
  };


  return (
    <section className="products">
      <div className="container">
        <h2 className="products__title"> {category ? `${categoryTranslations[category] || category}` : 'Чай'}
        </h2>
        <ul className="products__list">
          {products.map((item) => (
            <Product key={item.id} data={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}