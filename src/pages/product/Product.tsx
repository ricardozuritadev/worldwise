import styles from "./Product.module.css";

import { PRODUCT } from "constants/pages/product.constants";

import PageNav from "components/page-nav";

const Product = () => {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="images/img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>{PRODUCT.TITLE}</h2>
          <p>{PRODUCT.DESCRIPTION_FIRST}</p>
          <p>{PRODUCT.DESCRIPTION_SECOND}</p>
        </div>
      </section>
    </main>
  );
};

export default Product;
