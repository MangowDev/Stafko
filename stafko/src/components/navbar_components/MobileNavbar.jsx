import { useEffect } from "react";
import "./styles/MobileNavbar.css";
import SearchBar from "./SearchBar";

export default function MobileNavbar({
  setSearchTerm,
  isMobileNavbarVisible,
  setIsMobileNavbarVisible,
}) {

  const handleClickOutside = (event) => {
    const dropdownRef = document.querySelector(".mobile-navbar");
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      setIsMobileNavbarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="navbar-container">
      <nav
        className={`mobile-navbar ${
          isMobileNavbarVisible ? "show-navbar" : ""
        }`}
      >
        <div className="search-bar-div-mobile">
          <SearchBar searchBarClass={"search-bar-input-mobile"} setSearchTerm={setSearchTerm}/>
        </div>
      </nav>
    </div>
  );
}
