import { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Footer from './Component/Footer'
import MovieInfo from './Component/MovieInfo';
import HeaderForm from './Component/HeaderForm';
import UserSearchResult from './Component/UserSearchResult';
function App() {
  const [userSearchResults, setUserSearchResults] = useState();
  const [displayNaturalForm, setDisplayNaturalForm] = useState(false);
  const [movieInfoDetail, setMovieInfoDetail] = useState()
  const [displayMovieInfo, setDisplayMovieInfo] = useState(false)
  const [youTube, setYouTube] = useState()
  const [cast, setCast] = useState()
  const [director, setDirector] = useState()

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
        setUserSearchResults(response.data.results);
        console.log(response);
      });
      setDisplayNaturalForm(true);
    };

    // For Modal 
    const handleClick = (movieID) => {
      // Main Info 
      axios({
            url: `https://api.themoviedb.org/3/movie/${movieID}`,
            params: {
                api_key: '9709355fc5ce17fa911605a13712678d',
            }
        }).then( (result) => {
            setMovieInfoDetail(result.data);
            console.log(result.data)
        });
        // YouTube Call
                axios({
            url: `https://api.themoviedb.org/3/movie/${movieID}/videos`,
            params: {
                api_key: '9709355fc5ce17fa911605a13712678d',
            }
        }).then( (result) => {
            setYouTube(result.data.results[0].key)
        });
                        axios({
            url: `https://api.themoviedb.org/3/movie/${movieID}/credits`,
            params: {
                api_key: '9709355fc5ce17fa911605a13712678d',
            }
        }).then( (result) => {
          // Call for directors and cast members 
          const directorArray = result.data.crew.filter( (crew) => {
            return crew.job === 'Director'
          })
          setDirector(directorArray[0].name)
          setCast(result.data.cast.slice(0, 3))
    })
    setDisplayMovieInfo(true);
  }
        
  const handleClose = () => {
    setDisplayMovieInfo(false)
  }

  return (

    <Router>
      <div className="wrapper"> 
        <HeaderForm handleSearch={handleSearch}/>
        
        <UserSearchResult userSearchResults={userSearchResults} 
        displayNaturalForm={displayNaturalForm} handleClick={handleClick}/>

      {displayMovieInfo ? (<MovieInfo movieInfoDetail={movieInfoDetail} director={director} cast={cast} youTube={youTube} handleClose={handleClose} />):null}
      
        <Footer />
      </div>
    </Router>
  );
}
export default App;