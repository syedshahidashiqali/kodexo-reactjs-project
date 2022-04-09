import styles from "./index.module.scss";
import Product from "../Product";

const ProductContainer = () => {
  return (
    <div className={styles.prodContainerMainWrapper}>
      <Product />
    </div>
  );
};

export default ProductContainer;