import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import styles from "./Film.css";
import starsStyle from "./Stars.css";
import { toast, ToastContainer } from "react-toastify";
import instance from "../../api/utils/request.js";
import axios from "axios";
import useToken from "../App/useToken";
import { useNavigate, useParams } from "react-router-dom";
import { NamedBlocks } from "../NamedBlock/NamedBlocks";
import { getCollections } from "../../api/films";


const Collection = (props) => {

  const { collectionId } = useParams();
  const [collection, setCollection] = useState(props.collection);

  const { token } = useToken();

  const navigate = useNavigate();

  const getCollection = async () => {
    await axios
      .get("http://localhost:8080/api/collections/v1/" + collectionId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setCollection(response.data);
        return response.data;
      })
      .catch(err => console.log("Err: " + err));
  };

  const getAllFilms = async () => {
    const c = await axios
      .get("http://localhost:8080/api/collections/v1/" + collectionId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setCollection(response.data);
        return response.data;
      })
    if (c) {
      setFilms(c.films);
      return c.films;
    }
  };

  const { pageable } = useState(0);
  const [films, setFilms] = useState([]);
  const [currentFilm, setCurrentFilm] = useState({ name: "" });

  useEffect(() => {
    getAllFilms();
  }, []);

  const openFilm = (id) => {
    if (id !== undefined) {
      let currentFilm = films.filter(film => film.id === id)[0];
      setCurrentFilm(currentFilm);
      navigate("/films/" + id);
    }
  };

  const fetchMoreData = async () => {
    if (pageable?.totalPages !== pageable?.pageNumber + 1) {
      setFilms(await getCollection(collection.id)
        .then(res => {
          return res.films;
        }));
    }
  };

  function clearFilms() {
    setFilms([]);
  }

  const removeFilmFromCollection = async (id) => {
    const urlParams = {
      filmId: id,
      collectionId: collection.id
    };
    const url = "http://localhost:8080/api/films/v1/collection?"
      + new URLSearchParams(urlParams).toString();
    await instance.delete(url, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("Successfully deleted film from collection '"
      + collection.name + "'", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    clearFilms();
    const filmsWithoutDeleted = films.filter(f => f.id !== id);
    setFilms(filmsWithoutDeleted);
  };

  return (
    <>
      <NavBar></NavBar>
      <NamedBlocks
        allowModifying={false}
        allowDeletion={true}
        allowCreation={false}
        blocksList={films}
        getBlocks={getAllFilms}
        createTitle={("Create new collection")}
        loadMore={fetchMoreData}
        onBlockClick={openFilm}
        setPage={() => {
        }}
        onDeleteItem={removeFilmFromCollection}
      />
    </>
  );

};

export default Collection;