import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "../../routes/routes.json";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import NoMatch from "../NavBar/NoMatch";
import useToken from "./useToken";
import React from "react";
import GenerateConfirmationCode from "../RestorePassword/GenerateConfirmationCode";
import ConfirmCode from "../RestorePassword/ConfirmCode";
import PasswordChange from "../RestorePassword/PasswordChange";
import Profile from "../Profile/Profile";
import Home from "../Home/Home";
import Collections from "../Collection/Collections";
import FilmMain from "../Film/FilmMain";
import CollectionMain from "../Collection/CollectionMain";

const App = () => {

  const { setToken } = useToken();

  return (
    <>
      <Routes>
        <Route path={routes.HOME_PAGE} element={<Home/>} />
        <Route path={routes.FILM_PAGE} element={<FilmMain/> } />
        <Route path={routes.LOGIN_PAGE} exact element={<Login setToken={setToken}/>} />
        <Route path={routes.PROFILE} exact element={<Profile/>} />
        <Route path={routes.COLLECTIONS} exact element={<Collections/>} />
        <Route path={routes.COLLECTION_PAGE} exact element={<CollectionMain/>} />
        <Route path={routes.REGISTRATION_PAGE} exact element={<Registration setToken={setToken}/>} />
        <Route path={routes.GENERATE_CONFIRMATION_CODE} exact element={<GenerateConfirmationCode/>} />
        <Route path={routes.CONFIRM_CODE} exact element={<ConfirmCode/>} />
        <Route path={routes.CHANGE_PASSWORD} exact element={<PasswordChange/>} />
        <Route path="*" exact element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;