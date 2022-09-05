import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Masthead from "./components/Masthead";
import Resultados from "./components/Resultados";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pronostico from "./components/Pronostico";
import Suscripcion from "./components/Suscripcion";
import Fechas from "./components/Fechas";
import Contact from "./components/Contact";
import { UserContext } from "./components/Context";
import Navigation from "./components/Navigation";

function App() {
  const apiToken = "cfccda3b57e4496d884919c349c9f8a7";
  const urlMatches = "https://api.football-data.org/v2/competitions/WC/matches";
  const urlTeams = "https://api.football-data.org/v2/competitions/WC/teams";
  const urlFlags = "https://flagcdn.com/en/codes.json";
  const urlFlagFormat = "https://flagcdn.com/32x24/";
  const stage = [
    "GROUP_STAGE",
    "LAST_16",
    "QUARTER_FINALS",
    "SEMI_FINALS",
    "FINAL",
  ];

  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [groupMatches, setGroupMatches] = useState([]);
  const [getImg, setGetImg] = useState("");
  const [id, setId] = useState(null);

  const getFlags = async (name) => {
    const flags = await fetch(urlFlags);
    const data = await flags.json();
    const list = Object.entries(data);
    const code = list.filter((flag) => flag[1] === name)[0][0];

    return code;
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(urlMatches, {
          headers: { "X-Auth-Token": `${apiToken}` },
        });

        const json = await response.json();

        setMatches(await json);
        setGroupMatches(
          await json.matches.filter((matches) => matches.stage === stage[0])
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatches();

    const fetchTeams = async () => {
      try {
        const response2 = await fetch(urlTeams, {
          headers: { "X-Auth-Token": `${apiToken}` },
        });
        const json2 = await response2.json();
        //console.log(json2);
        setTeams(await json2);

        const codeState = json2.teams.map(async (url) => ({
          id: url.id,
          url: urlFlagFormat + (await getFlags(url.name)) + ".png",
        }));

        const flagURL = await Promise.all(codeState);

        setGetImg(flagURL);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeams();
  }, []);

  return (
    <UserContext.Provider value={{ id, setId, teams, groupMatches, getImg }}>
      <>
        <div id="page-top">
          <Router>
            <Routes>
              {/* <Navigation /> */}
              <Route path="/login" element={<Login />} />
              <Route exact path={`/`} element={<Masthead />} />
              <Route exact path="/resultados" element={<Resultados />} />
              <Route exact path="/registro" element={<Registration />} />
              <Route exact path="/suscripcion" element={<Suscripcion />} />
              <Route exact path="/fechas" element={<Fechas />} />
              <Route exact path="/pronosticos" element={<Pronostico />} />

              <Route exact path="/contacto" element={<Contact />} />
            </Routes>
          </Router>
        </div>
      </>
    </UserContext.Provider>
  );
}

export default App;
