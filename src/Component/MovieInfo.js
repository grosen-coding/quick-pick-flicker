import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MovieInfo = ({
  movieInfoDetail,
  handleClose,
  director,
  cast,
  youTube,
  handleAddToList,
  displayAddList,
}) => {
  const closeElement = (
    <FontAwesomeIcon
      icon={faTimesCircle}
      aria-hidden="true"
      className="closeElementIcon"
    />
  );

  return (
    <div className="moviePage">
      {movieInfoDetail ? (
        <div className="modal">
          <div className="modalContainer">
            <div className="modalLeft">
              <div className="modalLeftTop">
                <button onClick={handleClose} className="closeElementButton">
                  {closeElement}
                </button>

                <div className="modalTextContent">
                  <h3>{movieInfoDetail.title}</h3>
                  <h4>
                    <strong>Directed by: </strong>
                    <span>{director}</span>
                  </h4>
                  <p>{movieInfoDetail.overview}</p>

                  <div className="movieDetailsDiv">
                    <div className="detailsSide">
                      <h4>
                        <strong> GENRE: </strong>
                        {movieInfoDetail.genres.map((genre, index) => {
                          return <span key={index}>{genre.name}</span>;
                        })}
                      </h4>
                      <h4>
                        <strong>Cast:</strong>
                        {cast
                          ? cast.map((castMember, index) => {
                              return (
                                <span key={index}> {castMember.name} </span>
                              );
                            })
                          : null}
                      </h4>
                    </div>

                    <div className="youTubeSide">
                      {youTube ? (
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${youTube}`}
                          width="100%"
                          height="100%"
                        />
                      ) : (
                        <h5>
                          <span>Sorry! No YouTube Trailer Found.</span>
                        </h5>
                      )}
                      <h4>
                        <strong>Runtime: </strong>
                        <span>{movieInfoDetail.runtime} mins</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modalRight">
              <div className="modalImageContent">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieInfoDetail.poster_path}`}
                  alt={`Poster for ${movieInfoDetail.original_title}`}
                />

                {displayAddList ? (
                  <div className="addButton">
                    <button onClick={handleAddToList}>Add to List</button>
                  </div>
                ) : (
                  <h5>This movie has been added to your list!</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieInfo;