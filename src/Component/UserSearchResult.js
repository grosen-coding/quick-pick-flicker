import poster from "../assets/errorhandling.jpg";

const UserSearchResult = ({
  userSearchResults,
  handleClick
}) => {
  return (
    <div className="wrapper">
      <ul className="resultContainer">
        {userSearchResults
          ? userSearchResults.map((movie, index) => {
              return (
                <li key={index}>
                  <div className="movieResult">
                    <div className="poster-image">
                      {movie.poster_path !== null ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={`Poster for ${movie.original_title}`}
                          onClick={() => {
                            handleClick(movie.id);
                          }}
                        />
                      ) : (
                        <img
                          src={poster}
                          alt={`No poster found for ${movie.original_title}`}
                          onClick={() => {
                            handleClick(movie.id);
                          }}
                        />
                      )}

                    </div>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default UserSearchResult;
