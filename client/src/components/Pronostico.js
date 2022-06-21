import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Pronostico() {
  const apiToken = "cfccda3b57e4496d884919c349c9f8a7";
  const url = "https://api.football-data.org/v2/competitions/WC/matches";

  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [groupMatches, setGroupMatches] = useState([]);
  const [results, setResults] = useState([
    { goalHome: "", goalAway: "", matchId: "", homeTeam: "", awayTeam: "" },
  ]);
  const [getImg, setGetImg] = useState("");

  const stage = [
    "GROUP_STAGE",
    "LAST_16",
    "QUARTER_FINALS",
    "SEMI_FINALS",
    "FINAL",
  ];
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  let { id } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(url, {
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
        const response2 = await fetch(
          "https://api.football-data.org/v2/competitions/WC/teams",
          {
            headers: { "X-Auth-Token": `${apiToken}` },
          }
        );
        const json2 = await response2.json();
        setTeams(await json2);
        setGetImg(
          await json2.teams.map((url) => ({ id: url.id, url: url.crestUrl }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeams();
  }, []);

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
            userId: id,
          }),
        });
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

    const list = [...results, {}];

    list[i][name] = value;

    list[i]["matchId"] = id;
    list[i]["homeTeam"] = home;
    list[i]["awayTeam"] = away;

    setResults(list);
  }

  function carrouselElement(group) {
    const groupX = groupMatches.filter(
      (matches) => matches.group === "GROUP_" + `${group}`
    );

    return (
      teams &&
      groupX.map((match, i) => (
        <li key={match.id} className="matches">
          <img
            className="home-img"
            src={getImg
              .filter((img) => img.id === match.homeTeam.id)
              .map((url) => url.url)}
          />
          {match.homeTeam.name}
          <input
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
          vs
          {match.awayTeam.name}
          <input
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
          <img
            className="home-img"
            src={getImg
              .filter((img) => img.id === match.awayTeam.id)
              .map((url) => url.url)}
          />
        </li>
      ))
    );
  }

  return (
    <Carousel interval={null}>
      {groups.map((group) => (
        <Carousel.Item>
          <div className="container">
            <ul>{carrouselElement(group)}</ul>
            <button onClick={handleSubmit}>Enviar</button>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
