import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { Product } from "../Product/Product";
import { useSearchParams } from "react-router-dom";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";
import style from './Products.module.scss';

export const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products, setCategory } = useProducts();
  const category = searchParams.get("category");

  useEffect(() => {
    setCategory(category || '');
  }, [category, setCategory]);

  const categoryTranslations: { [key: string]: string } = {
    tea: "Чай",
    coffee: "Кофе",
    teapots: "Чайники",
    cezves: "Турки",
    other: "Прочее"
  };

  return (
    <section className={style.products}>
      <div className="container">
        <h2 className={style.products__title}>
          {category ? `${categoryTranslations[category] || category}` : 'Чай'}
        </h2>
        <ul className={style.products__list}>
          {products.length ? (
            products.map((item) => <Product key={item.id} data={item} />)
          ) : (
            <SkeletonLoader />
          )}
        </ul>
      </div>
    </section>
  );
};
