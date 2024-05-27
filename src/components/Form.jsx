// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
//import css for DatePicker
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [isCityInfoLoading, setIsCityInfoLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [locationError, setLocationError] = useState(null);
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  async function handleAddCity(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  useEffect(() => {
    async function fetchCityInfo() {
      setIsCityInfoLoading(true);
      setLocationError(null);
      try {
        const response = await fetch(
          BASE_URL + `?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        if (!data.countryCode)
          throw new Error(
            "There is no city on this location, please click somewhere else 🤔"
          );
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        setLocationError(e.message);
      } finally {
        setIsCityInfoLoading(false);
      }
    }
    fetchCityInfo();
  }, [lat, lng]);
  //CONDITIONAL RENDERING
  if (!lat && !lng)
    return <Message message="Please select a location on the map" />;
  if (isCityInfoLoading) return <Spinner />;
  if (locationError) return <Message message={locationError} />;
  //END OF CONDITIONAL RENDERING
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="datePicker">Select the date, of your visit.</label>
        <DatePicker
          selected={date}
          id="datePicker"
          onChange={(date) => {
            setDate(date);
          }}
          value={date}
          dateFormat={"dd/MM/yyyy"}
        />
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
        <Button onClick={handleAddCity} type="primary">
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
