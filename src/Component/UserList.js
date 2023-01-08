import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const UserList = ({ handleClick, randomPick }) => {
  const movieListRef = firebase.database().ref();
  const [movieList, setMovieList] = useState();
  const [genreInput, setGenreInput] = useState("allGenres");
  const [timeInput, setTimeInput] = useState(90);
  const [displayRandomButton, setDisplayRandomButton] = useState(false);

  const element = (
    <FontAwesomeIcon
      icon={faTrashAlt}
      aria-hidden="true"
      className="trashIcon"
    />
  );

  const handleRemoveMovie = (key) => {
    movieListRef.child(key).remove();
  };

  useEffect(() => {
    movieListRef.on("value", (response) => {
      const movieListInfo = response.val();
      const movieListArray = [];
      for (let key in movieListInfo) {
        movieListArray.unshift({
          key: key,
          name: movieListInfo[key],
        });
      }

      setMovieList(movieListArray);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickRandomMovie = (e) => {
    e.preventDefault();
    movieListRef.on("value", (response) => {
      const movieListInfo = response.val();
      const movieListArray = [];
      for (let key in movieListInfo) {
        movieListArray.unshift({
          key: key,
          name: movieListInfo[key],
        });
      }

      setMovieList(movieListArray);

      const filteredList = movieListArray.filter((movie, index) => {
        for (let i = 0; i < movie.name.genre.length; i++) {
          if (
            movie.name.length < timeInput &&
            (movie.name.genre[i].name === genreInput ||
              genreInput === "allGenres")
          ) {
            return movie;
          } else {
            return null;
          }
        }
        return null;
      });

      setMovieList(filteredList);

      setDisplayRandomButton(true);

      if (filteredList.length < 1) {
        setMovieList(null);
        setDisplayRandomButton(false);
      }
    });
  };
  return (
    <div className="menu-wrap">
      <input type="checkbox" className="toggler"></input>
      <div className="hamburger">
        <div></div>
      </div>
      <div className="menu">
        <div className="userListContainer">
          {/* Native Language Form DO NOT DELETE */}
          <form
            onSubmit={(e) => {
              pickRandomMovie(e);
            }}
          >
            <h3>
              Your
              <p>
                <span>Quick Flick</span>
              </p>
              Picker
            </h3>
            <fieldset>
              <label htmlFor="genreChoice">I feel like watching a</label>
              <select
                name="genreChoice"
                onChange={(event) => {
                  setGenreInput(event.target.value);
                }}
                value={genreInput}
                className="genreChoiceDropDown"
              >
                <option value="allGenres">Whatever</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Drama">Drama</option>
                <option value="Documentary">Documentary</option>
                <option value="Family">Family</option>
                <option value="Fantasy">Fantasy</option>
                <option value="History">History</option>
                <option value="Horror">Horror</option>
                <option value="Music">Music</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Thriller">Thriller</option>
                <option value="TV Movie">TV Movie</option>
                <option value="War">War</option>
                <option value="Western">Western</option>
              </select>

              <label htmlFor="timeChoice">movie, and I have</label>
              <select
                name="timeChoice"
                onChange={(event) => {
                  setTimeInput(event.target.value);
                }}
                value={timeInput}
                className="timeChoiceDropDown"
              >
                <option value="90">Less than 90mins</option>
                <option value="120">About 2 Hours</option>
                <option value="1000">All the time in the world!</option>
              </select>
            </fieldset>
            <div className="filterButtonDiv">
              <button type="submit">Filter Choices</button>
            </div>
          </form>

          <div className="userList">
            <div className="movieListHeader">
              <h2>My Movie List</h2>
              {displayRandomButton ? (
                <button
                  onClick={() => randomPick(movieList)}
                  className="randomSelectionButton"
                >
                  Random Quick Pick
                </button>
              ) : null}
            </div>
            <div className="movieList">
              <ul>
                {movieList ? (
                  movieList.map((movie, index) => {
                    return (
                      <li key={index} className="movieListItem">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.name.poster_path}`}
                          alt={`Poster for ${movie.name.title}`}
                          onClick={() => {
                            handleClick(movie.name.id);
                          }}
                        />

                        <button
                          onClick={() => {
                            handleRemoveMovie(movie.key);
                          }}
                        >
                          {element}
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <div>No Movie to Display</div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;