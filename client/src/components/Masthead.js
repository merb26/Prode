import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "../App.css";
import Contact from "./Contact";
import Navigation from "./Navigation";
import Pronostico from "./Pronostico";
import Fechas from "./Fechas";
import Resultados from "./Resultados";
import AuthVerify from "../common/AuthVerify";
import TokenServices from "../services/token.services";

function Masthead() {
  const userLogged = TokenServices.getLocalAccessToken(); //localStorage.getItem("accessToken");

  const { state } = useLocation();
  let userId;

  state ? (userId = state.id) : (userId = undefined);

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

  return userLogged ? (
    <>
      <Navigation />
      <header className="masthead">
        <div className="container px-4 px-lg-5 h-100">
          <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
              <h1 className="text-white font-weight-bold">PR</h1>
              <hr className="divider" />
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-white-75 mb-5">
                Start Bootstrap can help you build better websites using the
                Bootstrap framework! Just download a theme and start
                customizing, no strings attached!
              </p>
              <a className="btn btn-primary btn-xl" /*href="#about"*/>
                Find Out More
              </a>
            </div>
          </div>
        </div>
        <div className="masthead">
          <div className="container px-4 px-lg-5 h-100">
            <Pronostico
              id={userId}
              groupMatches={groupMatches}
              teams={teams}
              getImg={getImg}
            />
          </div>
        </div>
        <Fechas getImg={getImg} />
        <Contact />
        {/* <Resultados id={userId} /> */}
        <AuthVerify />
      </header>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Masthead;
