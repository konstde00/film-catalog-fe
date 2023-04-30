import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { NamedBlocks } from "../NamedBlock/NamedBlocks";
import { getFilms } from "../../api/films";
import useToken from "../App/useToken";
import useRoles from "../App/useRoles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import instance from "../../api/utils/request";
import { toast, ToastContainer } from "react-toastify";

export default function Collections() {

  const { token } = useToken();
  const { roles } = useRoles();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [collections, setCollections] = useState([]);
  const { pageable } = useState(0);
  const [currentColletion, setCurrentColletion] = useState({ name: "" });

  useEffect(() => {
    getAllCollections();
  }, []);

  const getAllCollections = () => {
    instance.get("http://localhost:8080/api/collections/v1")
      .then((response) => {
        const allCollections = response.data.data;
        setCollections(allCollections);
      })
      .catch(err => console.log("Err: " + err));
  };

  function clearCollections() {
    setCollections([]);
  }

  const onCreateCollection = (closeModal) => {
    return async ({
                    name,
                    description
                  }) => {
      await addCollection({
        name: name.trim(),
        description: description.trim()
      }, closeModal);
      closeModal();
    };
  };

  async function addCollection(formData, urlParams) {
    try {
      const collection = await instance.post("http://localhost:8080/api/collections/v1?"
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
      collections.push(collection);
    } catch (err) {
      console.log("Err: " + err);
    }
  }

  async function updateCollection(formData, urlParams) {
    try {
      await instance.patch("http://localhost:8080/api/collections/v1?"
        + new URLSearchParams(urlParams).toString(), formData, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(res => {
          return res.data;
        })
        .catch(err => console.log("Err: " + err));
    } catch (err) {
      console.log("Err: " + err);
    }
  }

  const [collectionName, setCollectionName] = useState("");
  const [description, setDescription] = useState("");

  const modifyCollectionInputs =
    <>
      <label htmlFor="fname">Collection name: </label>
      <input type="text"
             id="name"
             name="fname"
             defaultValue={(currentColletion && currentColletion.name) ? currentColletion.name : ""}
             onChange={(e) => setCollectionName(e.target.value)}></input>
      <label htmlFor="fname">Description: </label>
      <input type="text"
             id="name"
             name="fname"
             defaultValue={(currentColletion && currentColletion.description) ? currentColletion.description : ""}
             onChange={(e) => setDescription(e.target.value)}></input>
      <label htmlFor="fname" style={{ marginBottom: "10px" }}>Photo:</label>
      <input type="file" style={{ marginBottom: "10px" }} {...register("file")} />
    </>;

  function renderModalBodyCreate(closeModal) {
    setCurrentColletion(null);
    return (
      <>
        <div>
          <form onSubmit={handleSubmit(async (event) => {
            const formData = new FormData();
            formData.append("photo", event.file[0]);
            await addCollection(formData, {
              name: collectionName,
              description: description
            });
            closeModal();
            setCollections(getAllCollections);
          })}>
            {modifyCollectionInputs}
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }

  function renderModalBodyUpdate(closeModal, collection) {
    setCurrentColletion(collection);
    return (
      <>
        <div>
          <form onSubmit={handleSubmit(async (event) => {
            const formData = new FormData();
            formData.append("photo", event.file[0]);
            await updateCollection(formData, {
              collectionId: collection.id,
              name: collectionName,
              description: description
            });
            closeModal();
            setCollections(getAllCollections);
          })}>
            {modifyCollectionInputs}
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
      setCollections(await getFilms(pageable?.pageNumber + 1)
        .then(res => {
          console.log("fetchMoreData = " + JSON.stringify(res.data));
          return res.data;
        }));
    }
  };

  const openCollection = (id) => {
    let currentCollection = collections.filter(film => film.id === id)[0];
    setCurrentColletion(currentCollection);
    navigate("/collections/" + id);
  };

  const deleteCollection = (id) => {

    instance.delete("http://localhost:8080/api/collections/v1?id=" + id);
    const collectionsWithoutDeleted = collections.filter(collection => collection.id !== id);
    setCollections(collectionsWithoutDeleted);
  };

  return (
    <>
      <NavBar />
      <ToastContainer/>
      <NamedBlocks
        allowModifying={roles && roles.includes("ROLE_ADMIN")}
        blocksList={collections}
        clearBlocks={clearCollections}
        renderModalBodyCreate={renderModalBodyCreate}
        renderModalBodyUpdate={renderModalBodyUpdate}
        createTitle={("Create new collection")}
        getBlocks={getAllCollections}
        loadMore={fetchMoreData}
        onBlockClick={openCollection}
        onCreateSubmit={onCreateCollection}
        setPage={() => {
        }}
        onDeleteItem={deleteCollection}
      />
    </>
  );
}