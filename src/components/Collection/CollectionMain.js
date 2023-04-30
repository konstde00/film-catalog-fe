import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useToken from "../App/useToken";
import Collection from "./Collection";
import styles from "./CollectionMain.css"

const CollectionMain = () => {

  const { token } = useToken();
  const { collectionId } = useParams();

  const [collection, setCollection] = useState({});

  const getCollection = async (id) => {
    await axios
      .get('http://localhost:8080/api/collections/v1/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setCollection(response.data);
        return response.data;
      })
      .catch(err => console.log("Err: " + err))
  }

  useEffect(() => {
    getCollection(collectionId);
  }, [])

  return (
    <>
      <div>
        <ul className="breadcrumb">
          <li><a href="http://localhost:3000/collections">Collections</a></li>
          <li>{collection.name}</li>
        </ul>
      </div>
      <Collection collection={collection}/>
    </>
  );
}

export default CollectionMain;
