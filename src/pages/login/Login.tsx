import styles from "./Login.module.css";

import { useState } from "react";

import PageNav from "components/page-nav";
import { LOGIN } from "constants/pages/login.constants";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState<string>("jack@example.com");
  const [password, setPassword] = useState<string>("qwerty");

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">{LOGIN.EMAIL}</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">{LOGIN.PASSWORD}</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className="cta">{LOGIN.CTA}</button>
        </div>
      </form>
    </main>
  );
}
