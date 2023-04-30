import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Film from "./Film";
import useToken from "../App/useToken";

const FilmMain = () => {

  const { token } = useToken();
  const { filmId } = useParams();

  const [film, setFilm] = useState({});
  const [collectionNames, setCollectionNames] = useState([]);

  const getFilm = async (id) => {
    await axios
      .get('http://localhost:8080/api/films/v1/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setFilm(response.data);
        return response.data;
      })
      .catch(err => console.log("Err: " + err))
  }

  const getCollectionNames = async () => {

    await axios
      .get('http://localhost:8080/api/collections/v1', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const collectionNames = response.data.data.map(c => c.name);
        setCollectionNames(collectionNames);
      })
      .catch(err => console.log("Err: " + err))
  }

  useEffect(() => {
    getFilm(filmId);
    getCollectionNames();
  }, [])

  return (
    <>
      <Film film={film} collectionNames={collectionNames}/>
    </>
  );
}

export default FilmMain;
