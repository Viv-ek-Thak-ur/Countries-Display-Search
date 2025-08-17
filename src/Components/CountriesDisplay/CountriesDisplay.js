import { React, useState, useEffect } from "react";
import axios from "axios";
import styles from "./CountriesDisplay.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function FlagCard() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const url = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
      try {
        const res = await axios.get(url);
        console.log(res.data);
        setCountries(res.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.heading}>
        <h1>Country Names and Flags</h1>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={styles.flagContainer}>
  {loading ? (
    <p>Loading...</p>
  ) : filteredCountries.length > 0 ? (
    filteredCountries.map((country, index) => (
      <div className={`countryCard ${styles.card}`} key={index}>
        <img
          src={country.png}
          alt={country.common}
          className={styles.flagImage}
        />
        <p>
          <b>{country.common}</b>
        </p>
      </div>
    ))
  ) : (
    <p>No countries found</p>
  )}
</div>
    </>
  );
}
