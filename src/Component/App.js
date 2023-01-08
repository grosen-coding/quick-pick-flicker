import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "../styles/App.scss";
import firebase from "../config/firebase";
import Footer from "./Footer";
import UserList from "./UserList";
import MovieInfo from "./MovieInfo";
import HeaderForm from "./HeaderForm";
import UserSearchResult from "./UserSearchResult";
import RandomMovieModal from "./RandomMovieModal";

function App() {
  const [userSearchResults, setUserSearchResults] = useState();
  const [displayNaturalForm, setDisplayNaturalForm] = useState(false);
  // For Modal
  const [displayMovieInfo, setDisplayMovieInfo] = useState(false);
  const [movieInfoDetail, setMovieInfoDetail] = useState();
  const [director, setDirector] = useState();
  const [cast, setCast] = useState();
  const [youTube, setYouTube] = useState();
  const [displayAddList, setDisplayAddList] = useState(true);
  const [randomMovieSelection, setRandomMovieSelection] = useState();
  const [displayRandomMovieModal, setDisplayRandomMovieModal] = useState(false);
  const [randomMovieSelectionArray, setRandomMovieSelectionArray] = useState();

  const handleSearch = (event, userSearchInput) => {
    event.preventDefault();
    axios({
      method: `GET`,
      dataResponse: "json",
      url: `https://api.themoviedb.org/3/search/movie?`,
      params: {
        api_key: "9709355fc5ce17fa911605a13712678d",
        language: "en-US",
        include_adult: "false",
        page: 1,
        query: userSearchInput,
      },
    }).then((response) => {
      response.data.total_results !== 0
        ? setUserSearchResults(response.data.results)
        : alert(
            `It doesn't seem like ${userSearchInput} is a movie. Please try again`
          );
    });
    setDisplayNaturalForm(true);
  };

  // Opens Modal when clicked on images
  const handleClick = (movieID) => {
    axios({
      url: `https://api.themoviedb.org/3/movie/${movieID}`,
      params: {
        api_key: "9709355fc5ce17fa911605a13712678d",
      },
    }).then((result) => {
      setMovieInfoDetail(result.data);
      axios({
        url: `https://api.themoviedb.org/3/movie/${movieID}/videos`,
        params: {
          api_key: "9709355fc5ce17fa911605a13712678d",
        },
      }).then((result) => {
        if (result.data.results.length < 1) {
          setYouTube(null);
        } else {
          setYouTube(result.data.results[0].key);
        }
      });
      axios({
        url: `https://api.themoviedb.org/3/movie/${movieID}/credits`,
        params: {
          api_key: "9709355fc5ce17fa911605a13712678d",
        },
      }).then((result) => {
        const directorArray = result.data.crew.filter((crew) => {
          return crew.job === "Director";
        });

        directorArray.length !== 0 ? (
          setDirector(directorArray[0].name)
        ) : (
          <h2>No Director Found</h2>
        );
        setCast(result.data.cast.slice(0, 4));
      });

      const movieListRef = firebase.database().ref();

      movieListRef.on("value", (response) => {
        const movieListInfo = response.val();

        const movieListArray = [];

        for (let key in movieListInfo) {
          movieListArray.unshift({
            key: key,
            name: movieListInfo[key],
          });
        }

        for (let i = 0; i < movieListArray.length; i++) {
          if (movieListArray[i].name.id === result.data.id) {
            setDisplayAddList(false);
            break;
          } else {
            setDisplayAddList(true);
          }
        }
      });

      setDisplayMovieInfo(true);
    });
  };

  // Randomized pick
  const randomPick = (movieList) => {
    setRandomMovieSelectionArray(movieList);
    setRandomMovieSelection(
      movieList[Math.floor(Math.random() * movieList.length)].name
    );

    setDisplayRandomMovieModal(true);
  };

  const pickAnotherRandom = () => {
    setRandomMovieSelection(
      randomMovieSelectionArray[
        Math.floor(Math.random() * randomMovieSelectionArray.length)
      ].name
    );
  };

  const handleClose = () => {
    setDisplayMovieInfo(false);
  };

  const handleCloseRandomPick = () => {
    setDisplayRandomMovieModal(false);
  };

  const handleAddToList = () => {
    const movieListRef = firebase.database().ref();

    const movieListInfo = movieListRef;
    movieListInfo.push({
      title: movieInfoDetail.title,
      genre: movieInfoDetail.genres,
      length: movieInfoDetail.runtime,
      id: movieInfoDetail.id,
      poster_path: movieInfoDetail.poster_path,
    });
  };
  return (
    <Router>
      <div>
        <div className="wrapper">
          <HeaderForm handleSearch={handleSearch} />

          <UserList handleClick={handleClick} randomPick={randomPick} />

          {displayRandomMovieModal ? (
            <RandomMovieModal
              randomMovieSelection={randomMovieSelection}
              handleClose={handleCloseRandomPick}
              pickAnotherRandom={pickAnotherRandom}
            />
          ) : null}

          <UserSearchResult
            userSearchResults={userSearchResults}
            displayNaturalForm={displayNaturalForm}
            handleClick={handleClick}
          />

          {displayMovieInfo ? (
            <MovieInfo
              movieInfoDetail={movieInfoDetail}
              handleClose={handleClose}
              director={director}
              cast={cast}
              youTube={youTube}
              handleAddToList={handleAddToList}
              displayAddList={displayAddList}
            />
          ) : null}
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;