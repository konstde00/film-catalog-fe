import NavBar from "../NavBar/NavBar";
import React, { useState } from "react";
import styles from "./Film.css";
import starsStyle from "./Stars.css";
import { toast, ToastContainer } from "react-toastify";
import instance from "../../api/utils/request.js"
import axios from "axios";
import useToken from "../App/useToken";

const getRating = () => {

  const stars = document.querySelectorAll(".stars i");

  // Loop through the "stars" NodeList
  stars.forEach((star, index1) => {
    // Add an event listener that runs a function when the "click" event is triggered
    star.addEventListener("click", () => {
      // Loop through the "stars" NodeList Again
      stars.forEach((star, index2) => {
        // Add the "active" class to the clicked star and any stars with a lower index
        // and remove the "active" class from any stars with a higher index
        index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
      });
    });
  });

  return Array.from(stars).filter(star => star.classList.contains("active")).length;
};

const getStars = (rating) => {

  let arr = [];
  for (let i = 0; i < rating; i++) {
    arr.push(<span className="reviewStar" key={i}>&#9733;</span>)
  }
  return arr;
}

const Film = (props) => {

  const {token} = useToken();

  let [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");

  const film = props.film;
  const collectionNames = props.collectionNames;
  let [selectedCollection, setSelectedCollection] = useState("");
  if (collectionNames.length !== 0) {
    selectedCollection = collectionNames[0];
  }

  let collectionItems = [];
  for (let i = 0; i < collectionNames.length; i++) {
    var l = <option className="fa-solid fa-star" key={i}>{collectionNames[i]}</option>;
    console.log(l);
    collectionItems.push(l);
  }

  reviews = film.reviews !== undefined ? film.reviews : [];

  const stars = document.querySelectorAll(".stars i");
  // Loop through the "stars" NodeList
  stars.forEach((star, index1) => {
    // Add an event listener that runs a function when the "click" event is triggered
    star.addEventListener("click", () => {
      // Loop through the "stars" NodeList Again
      stars.forEach((star, index2) => {
        // Add the "active" class to the clicked star and any stars with a lower index
        // and remove the "active" class from any stars with a higher index
        index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
      });
    });
  });

  const listItems = reviews.map((review, index) =>
    <div className="review" key={index}>
      <div className="review-header" >
        <div style={{ display: "inline-block" }} >
          <img height={"50px"} width={"50px"} style={{borderRadius: "10px"}}
               src={"https://filmcatalog.s3.us-east-1.amazonaws.com/users/" + review.userId + "/avatar"} alt="User Photo" />
        </div>
        <div style={{ display: "inline-block", marginLeft: "10px" }} >
          <h2 style={{ marginBottom: "5px" }}>{review.userName}</h2>
          <div className="review-body" style={{ marginBottom: "5px" }} >
            <div className="rating" key={index}>
              {getStars(review.rating)}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "5px" }} >
          <p className="comment">{review.comment}</p>
          {index === (film.reviews.length - 1) ? <></> : <div style={{ marginTop: "5px" }}>
            <hr></hr>
          </div>}
        </div>
      </div>
    </div>
  );

  const addFilmToCollection = async () => {
    const urlParams = {
      filmId: film.id,
      collectionName: selectedCollection
    };
    const url = "http://localhost:8080/api/films/v1/collection?"
      + new URLSearchParams(urlParams).toString();
    await instance.patch(url, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    navigator.clipboard.writeText("COPY TEXT WORKS")
    toast.success("Successfully added film to collection '"
      + urlParams.collectionName + "'", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="col-xs-12 col-sm-10 col-sm-offset-1">
        <div className="row" >

          <div className="col-xs-12 col-sm-4 left-column" >
            <img
              src={film.photoUrl}
              style={{borderRadius: "40px"}}
              height={"300px"} width={"300px"}
              alt={film.name} />
          </div>

          <div className="col-xs-12 col-sm-8 right-column">
            <div style={{display: "inline-block"}}>
              <h1>{film.name}</h1>
            </div>

            {collectionItems.length === 0 ? <></> :
              <>
                <div style={{border: "1px solid black", borderRadius: "5px",
                  padding: "5px", marginLeft: "110px", display: "inline-block"}} >
                  <div style={{marginBottom: "3px"}}>
                    <b>Add film to your collection: </b><br></br>
                  </div>
                  <div style={{marginBottom: "6px"}}>
                    <select id="genre"
                            name="genre"
                            onChange={(e) => {
                              console.log("ev = " + e.target.value);
                              setSelectedCollection(e.target.value)
                            }}
                    >
                      {collectionItems}
                    </select><br></br>
                  </div>
                  <button type={"submit"} onClick={addFilmToCollection}>Submit</button>
                </div>
              </>
            }

            <div className="film-meta">
              {film.genre} | {film.durationMins} minutes
            </div>
            <hr></hr>

            <h3>Cast &amp; Crew</h3>
            <div className="cast-crew">
              <h4>Director</h4>
              <p>{film.director}</p>
              <h4>Cast</h4>
              <p>{film.cast}</p>
            </div>
            <hr></hr>

            <h3>Trailer</h3>
            <p><a href={film.trailerUrl} target="_blank">{film.trailerUrl}</a></p>
            <hr></hr>

            <div>
              <h3>Synopsis</h3>
              <p>{film.synopsis}</p>
            </div>

            <hr></hr>

            <h3>Completion Year</h3>
            <p>{film.completionYear}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ marginBottom: "20px" }}>Reviews: </h2>
        <ul>{listItems}</ul>
      </div>
      <div className={starsStyle} style={{marginTop: "20px"}}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-pUA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="Stars.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
        <h2 >Create your review: </h2>
        <div className="stars">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        <div >
          <ToastContainer/>
          <form className={styles.modalFormContainer}
                onSubmit={async (event) => {
                  event.preventDefault();
                  const rating = getRating();
                  if (rating === 0) {
                    toast.error('Please put your rating using stars', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light"
                    });
                  } else {
                    const review = await instance.post("http://localhost:8080/api/reviews/v1", {
                      filmId: film.id,
                      rating: getRating(),
                      comment: comment
                    }, {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }).then(res => res.data);
                    let newReviews = reviews;
                    newReviews.push(review);
                    setReviews(newReviews);
                    toast.success('Successfully posted your review', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light"
                    });
                  }
                }}>
            <label htmlFor="fname" style={{ marginBottom: "10px" }}>Your comment:</label>
            <textarea id="name"
                      name="fname"
                      placeholder="Enter comment here"
                      style={{ height: "200px", width: "300px", marginBottom: "10px" }}
                      onChange={(e) => setComment(e.target.value)}
                      rows="2" cols="25" ></textarea>
            <button type="submit" style={{marginBottom: "50px"}}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );

};

export default Film;