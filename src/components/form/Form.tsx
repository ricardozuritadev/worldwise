// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import styles from "./Form.module.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonType } from "../../types/button.types";

import Button from "../button";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(1));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  // const [country, setCountry] = useState("");
  // const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => console.log("click")} type={ButtonType.Primary}>
          Add
        </Button>

        <Button
          onClick={(
            e: React.SyntheticEvent<HTMLButtonElement, Event>
          ): void => {
            e.preventDefault();
            navigate(-1);
          }}
          type={ButtonType.Back}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
