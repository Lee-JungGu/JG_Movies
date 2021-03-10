import React from "react";
import Main from "./routes/Main";
import Search from "./routes/Search";
import MovieInfo from "./routes/MovieInfo";
import Header from "./components/Header";
import TopButton from "./components/TopButton";
import { HashRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <Header />
      <TopButton />
      <Route path="/" exact={true} component={Main} />
      <Route path="/Search" component={Search} />
      <Route path="/Info" component={MovieInfo} />
    </HashRouter>
  );
};

export default App;
