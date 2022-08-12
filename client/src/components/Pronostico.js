import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import AuthVerify from "../common/AuthVerify";
import Navigation from "./Navigation";
import { Navigate } from "react-router-dom";

export default function Pronostico(props) {
  const userLogged = AuthVerify();

  const location = useLocation();

  const { id, groupMatches, teams, getImg } = location.state || {}; // empty object is to avoid destructuring of null error

  const [results, setResults] = useState([
    { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
  ]);

  const [test, setTest] = useState([
    { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
  ]);
  const [disable, setDisable] = useState(false);

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // useEffect(() => {
  //   const fetchMatches = async () => {
  //     try {
  //       const response = await fetch(url, {
  //         headers: { "X-Auth-Token": `${apiToken}` },
  //       });

  //       const json = await response.json();

  //       setMatches(await json);

  //       setGroupMatches(
  //         await json.matches.filter((matches) => matches.stage === stage[0])
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchMatches();

  //   const fetchTeams = async () => {
  //     try {
  //       const response2 = await fetch(
  //         "https://api.football-data.org/v2/competitions/WC/teams",
  //         {
  //           headers: { "X-Auth-Token": `${apiToken}` },
  //         }
  //       );
  //       const json2 = await response2.json();
  //       console.log(json2);

  //       setTeams(await json2);

  //       const codeState = json2.teams.map(async (url) => ({
  //         id: url.id,
  //         url:
  //           "https://flagcdn.com/32x24/" +
  //           (await getFlags(url.name)) +
  //           //(await codes.filter((code) => code[1] === url.name)[0][0]) +
  //           ".png",
  //       }));

  //       const flagURL = await Promise.all(codeState);

  //       console.log(await Promise.all(codeState));

  //       setGetImg(flagURL);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchTeams();
  // }, []);

  // const getFlags = async (name) => {
  //   const flags = await fetch("https://flagcdn.com/en/codes.json");
  //   const data = await flags.json();

  //   const list = Object.entries(data);
  //   const code = list.filter((flag) => flag[1] === name)[0][0];

  //   return code;
  // };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const aux = [];
      for (let i = 0; i < 6; i++) {
        aux.push(results[i]);

        if (aux[i].homeTeam === null) {
          aux[i].homeTeam = "Qualy Pending";
        }
        if (aux[i].awayTeam === null) {
          aux[i].awayTeam = "Qualy Pending";
        }

        const winner = async () => {
          if (aux[i].homeTeam === null || aux[i].awayTeam === null) {
            return "Quali Pending";
          } else if (aux[i].goalHome > aux[i].goalAway) {
            return aux[i].homeTeam;
          } else if (aux[i].goalHome < aux[i].goalAway) {
            return aux[i].awayTeam;
          } else return "Draw";
        };

        fetch("http://localhost:3000/pronosticos", {
          method: "POST",
          made: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId: aux[i].matchId,
            winner: await winner(),
            goalHome: aux[i].goalHome,
            goalAway: aux[i].goalAway,
            homeTeam: aux[i],
            awayTeam: aux[i],
            userId: /*props.*/ id,
          }),
        });

        //setDisable(true);
      }
      setResults([
        { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
      ]);
      console.log(aux);
      console.log("Pronostico Enviado");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChange(e, i, id, home, away) {
    const { name, value } = e.target;
    console.log(e.target.value);

    const list = [...results, {}];

    const list2 = (prev) => [...results];

    list[i][name] = value;

    list[i]["matchId"] = id;
    list[i]["homeTeam"] = home;
    list[i]["awayTeam"] = away;
    console.log("LIST", list);
    setTest(list2);
    console.log("TEST", test);
    setResults(list);
  }

  function carrouselElement(group) {
    const groupX = /*props.*/ groupMatches.filter(
      (matches) => matches.group === "GROUP_" + `${group}`
    );

    return (
      /*props.*/ teams &&
      /*props.*/ getImg &&
      groupX.map((match, i) => (
        <li key={match.id} className="matches">
          <img
            className="home-img"
            src={
              /*props.*/ getImg
                .filter((img) => img.id === match.homeTeam.id)
                .map((url) => url.url)
            }
          />
          <h4>{match.homeTeam.name}</h4>
          <input
            className="input-pronosticos"
            name="goalHome"
            value={results.goalHome}
            onChange={(e) =>
              handleChange(
                e,
                i,
                match.id,
                match.homeTeam.name,
                match.awayTeam.name
              )
            }
          />

          <h4 className="vs-text">vs</h4>
          <h4>{match.awayTeam.name}</h4>
          <img
            className="home-img"
            src={
              /*props.*/ getImg
                .filter((img) => img.id === match.awayTeam.id)
                .map((url) => url.url)
            }
          />
          <input
            className="input-pronosticos"
            name="goalAway"
            value={results.goalAway}
            onChange={(e) =>
              handleChange(
                e,
                i,
                match.id,
                match.homeTeam.name,
                match.awayTeam.name
              )
            }
          />
        </li>
      ))
    );
  }

  return userLogged ? (
    <header className="masthead">
      <Navigation />
      <Carousel interval={null}>
        {groups.map((group) => (
          <Carousel.Item>
            <div className="containerCarrousel">
              <ul>
                {carrouselElement(group)}{" "}
                <button disabled={disable} onClick={handleSubmit}>
                  Enviar
                </button>
              </ul>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </header>
  ) : (
    <Navigate to="/login" />
  );
}
