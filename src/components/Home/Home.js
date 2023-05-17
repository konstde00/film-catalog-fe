import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { NamedBlocks } from "../NamedBlock/NamedBlocks";
import { getFilms } from "../../api/films";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from "../../api/utils/request.js";
import useRoles from "../App/useRoles";
import useToken from "../App/useToken";
import { toast, ToastContainer } from "react-toastify";
import styles from "./Home.css";

export default function Home() {

  const { token } = useToken();
  const { roles } = useRoles();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [films, setFilms] = useState([]);
  const { pageable } = useState(0);
  const [currentFilm, setCurrentFilm] = useState({ name: "" });

  useEffect(() => {
    getAllFilms();
  }, []);

  const getAllFilms = () => {
    instance.get("http://localhost:8080/api/films/v1")
      .then((response) => {
        const allFilms = response.data.data;
        setFilms(allFilms);
      })
      .catch(err => console.log("Err: " + err));
  };

  function clearFilms() {
    setFilms([]);
  }

  const onCreateFilm = (closeModal) => {

    return async ({
                    name,
                    genre,
                    durationMins,
                    company,
                    director,
                    producers,
                    writers,
                    cast,
                    trailerUrl,
                    synopsis,
                    completionYear
                  }) => {
      await addFilm({
        name: name.trim(),
        genre: genre.trim(),
        durationMins: durationMins,
        company: company.trim(),
        director: director.trim(),
        producers: producers.trim(),
        writers: writers.trim(),
        cast: cast.trim(),
        trailerUrl: trailerUrl,
        synopsis: synopsis,
        completionYear: completionYear
      }, closeModal);
      closeModal();
    };
  };

  async function addFilm(formData, urlParams) {

    const film = await instance.post("http://localhost:8080/api/films/v1?"
      + new URLSearchParams(urlParams).toString(), formData, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(res => {
      return res.data;
    }).catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
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
      });
    films.push(film);
  }

  async function updateFilm(formData, urlParams) {

    if (urlParams.completionYear !== undefined && urlParams.completionYear !== null
      && urlParams.completionYear < 1895) {
      toast.error("Year has to be bigger than 1895", {
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

    try {
      await instance.patch("http://localhost:8080/api/films/v1?"
        + new URLSearchParams(urlParams).toString(), formData, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(res => {
          setFilmModified(true);
          return res.data;
        })
        .catch(err => console.log("Err: " + err));
    } catch (err) {
      console.log("Err: " + err);
    }
  }

  const [filmModified, setFilmModified] = useState(false);
  const [filmName, setFilmName] = useState(" ");
  const [genre, setGenre] = useState("ACTION");
  const [duration, setDuration] = useState(60);
  const [company, setCompany] = useState(" ");
  const [director, setDirector] = useState(" ");
  const [producers, setProducers] = useState(" ");
  const [writers, setWriters] = useState(" ");
  const [cast, setCast] = useState(" ");
  const [trailerUrl, setTrailerUrl] = useState(" ");
  const [synopsis, setSynopsis] = useState(" ");
  const [completionYear, setCompletionYear] = useState(2023);

  const modifyFilmInputs =
    <>
      <label htmlFor="fname">Movie name: </label>
      <input type="text"
             id="name"
             name="fname"
             defaultValue={(currentFilm && currentFilm.name) ? currentFilm.name : ""}
             onChange={(e) => setFilmName(e.target.value)}></input>
      <label htmlFor="genre">Genre: </label>
      <select id="genre"
              name="genre"
              defaultValue={(currentFilm && currentFilm.genre) ? currentFilm.genre : ""}
              onChange={(e) => setGenre(e.target.value)}>
        <option value="ACTION">Action</option>
        <option value="ADVENTURE">Adventure</option>
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option value="FANTASY">Fantasy</option>
        <option value="HISTORICAL">Historical</option>
        <option value="HORROR">Horror</option>
        <option value="ROMANCE">Romance</option>
        <option value="THRILLER">Thriller</option>
        <option value="WESTERN">Western</option>
      </select>
      <label htmlFor="duration">Duration (mins): </label>
      <input type="number"
             id="duration"
             name="duration"
             defaultValue={(currentFilm && currentFilm.duration) ? currentFilm.duration : ""}
             onChange={(e) => setDuration(e.target.value)}></input>
      <label htmlFor="director">Director: </label>
      <input type="text"
             id="producers"
             name="producers"
             defaultValue={(currentFilm && currentFilm.producers) ? currentFilm.producers : ""}
             onChange={(e) => setProducers(e.target.value)}></input>
      <label htmlFor="cast">Cast: </label>
      <input type="text"
             id="cast"
             name="cast"
             defaultValue={(currentFilm && currentFilm.cast) ? currentFilm.cast : ""}
             onChange={(e) => setCast(e.target.value)}></input>
      <label htmlFor="trailerUrl">Trailer url: </label>
      <input type="text"
             id="trailerUrl"
             name="trailerUrl"
             defaultValue={(currentFilm && currentFilm.trailerUrl) ? currentFilm.trailerUrl : ""}
             onChange={(e) => setTrailerUrl(e.target.value)}></input>
      <label htmlFor="synopsis">Synopsis: </label>
      <input type="text"
             id="synopsis"
             name="synopsis"
             defaultValue={(currentFilm && currentFilm.synopsis) ? currentFilm.synopsis : ""}
             onChange={(e) => setSynopsis(e.target.value)}></input>
      <label htmlFor="completionYear">Completion year: </label>
      <input type="number"
             id="completionYear"
             name="completionYear"
             defaultValue={(currentFilm && currentFilm.completionYear) ? currentFilm.completionYear : ""}
             onChange={(e) => {
               setCompletionYear(e.target.value)
             }}></input>
      <label htmlFor="fname" style={{ marginBottom: "10px" }}>Movie photo:</label>
      <input type="file" style={{ marginBottom: "10px" }} {...register("file")} />
    </>;

  function renderModalBodyCreate(closeModal) {
    setCurrentFilm(null);
    return (
      <>
        <div>
          <form onSubmit={handleSubmit(async (event) => {

            if (completionYear !== undefined && completionYear !== null
              && completionYear < 1895) {
              toast.error("Year has to be bigger than 1895", {
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
              const formData = new FormData();
              formData.append("photo", event.file[0]);
              await addFilm(formData, {
                name: filmName,
                genre: genre,
                durationMins: duration,
                company: company,
                director: director,
                producers: producers,
                writers: writers,
                cast: cast,
                trailerUrl: trailerUrl,
                synopsis: synopsis,
                completionYear: completionYear
              });
              closeModal();
              setFilms(getAllFilms);
            }
          })}>
            {modifyFilmInputs}
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }

  function renderModalBodyUpdate(closeModal, film) {
    setCurrentFilm(film);
    return (
      <>
        <div>
          <form onSubmit={handleSubmit(async (event) => {
            const formData = new FormData();
            formData.append("photo", event.file[0]);
            await updateFilm(formData, {
              filmId: film.id,
              name: filmName,
              genre: genre,
              durationMins: duration,
              company: company,
              director: director,
              producers: producers,
              writers: writers,
              cast: cast,
              trailerUrl: trailerUrl,
              synopsis: synopsis,
              completionYear: completionYear
            });
            if (filmModified) {
              closeModal();
              setFilms(getAllFilms);
            }
          })}>
            {modifyFilmInputs}
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }

  const fetchMoreData = async () => {
    if (pageable?.totalPages !== pageable?.pageNumber + 1) {
      setFilms(await getFilms(pageable?.pageNumber + 1)
        .then(res => {
          console.log("fetchMoreData = " + JSON.stringify(res.data));
          return res.data;
        }));
    }
  };

  const openFilm = (id) => {
    if (id !== undefined) {
      let currentFilm = films.filter(film => film.id === id)[0];
      setCurrentFilm(currentFilm);
      navigate("/films/" + id);
    }
  };

  const deleteFilm = (id) => {

    instance.delete("http://localhost:8080/api/films/v1?id=" + id);
    const filmsWithoutDeleted = films.filter(film => film.id !== id);
    setFilms(filmsWithoutDeleted);
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <NamedBlocks
        allowCreation={roles && roles.includes("ROLE_ADMIN")}
        allowModifying={roles && roles.includes("ROLE_ADMIN")}
        allowDeletion={roles && roles.includes("ROLE_ADMIN")}
        blocksList={films}
        clearBlocks={clearFilms}
        renderModalBodyCreate={renderModalBodyCreate}
        renderModalBodyUpdate={renderModalBodyUpdate}
        createTitle={("Create new movie")}
        getBlocks={getAllFilms}
        loadMore={fetchMoreData}
        onBlockClick={openFilm}
        onCreateSubmit={onCreateFilm}
        setPage={() => {}}
        onDeleteItem={deleteFilm}
      />
    </>
  );
}