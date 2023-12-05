import styles from "./Homepage.module.css";

import { Link } from "react-router-dom";

import { HOMEPAGE } from "constants/pages/homepage.constants";

import PageNav from "components/page-nav";

const Homepage = () => {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          {HOMEPAGE.TITLE}
          <br />
          {HOMEPAGE.SUBTITLE}
        </h1>

        <h2>{HOMEPAGE.DESCRIPTION}</h2>

        <Link to="app" className="cta">
          {HOMEPAGE.CTA}
        </Link>
      </section>
    </main>
  );
};

export default Homepage;
