import { useState } from "react";

const HeaderForm = ({ handleSearch }) => {
  const [userSearchInput, setUserSearchInput] = useState("");

  return (
    <header>
      <h1>
        Quick <span>Flick</span> Picker
      </h1>
      <h2>
        <span>The Movie APP for the Indecisive! </span>
        <p>
          Create a list of your favourite movies, and let Quick Flick Picker{" "}
          <span>randomly decide</span> {" "}what you should watch!
        </p>
      </h2>

      <div className="headerForm">
        <form
          onSubmit={(event) => {
            handleSearch(event, userSearchInput);
          }}
          action="search"
        >
          Search your favorite movies!
          <label htmlFor="searchBar"></label>
          <input
            onChange={(event) => {
              setUserSearchInput(event.target.value);
            }}
            value={userSearchInput}
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Search"
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default HeaderForm;