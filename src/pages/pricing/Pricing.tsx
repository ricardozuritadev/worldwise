// Uses the same styles as Product
import styles from "../product/Product.module.css";

import { PRICING } from "constants/pages/pricing.constants";

import PageNav from "components/page-nav";

const Product = () => {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            {PRICING.TITLE}
            <br />
            {PRICING.SUBTITLE}
          </h2>
          <p>{PRICING.DESCRIPTION}</p>
        </div>
        <img
          src="images/img-2.jpg"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
};

export default Product;
