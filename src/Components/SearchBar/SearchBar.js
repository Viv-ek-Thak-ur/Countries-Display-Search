import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.searchBar}
    />
  );
}