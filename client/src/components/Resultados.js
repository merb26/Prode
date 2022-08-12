import { useEffect, useState } from "react";
import "../App.css";

const testMatch = [
  { id: 391881, winner: "Netherlands", goalHome: 1, goalAway: 2 },
  { id: 391882, winner: "Ecuador", goalHome: 1, goalAway: 2 },
];

const apiToken = "cfccda3b57e4496d884919c349c9f8a7";

const Resultados = (props) => {
  const [results, setResults] = useState(0);

  async function fetchData() {
    try {
      const data = await fetch(
        "https://api.football-data.org/v2/competitions/WC/matches",
        {
          headers: { "X-Auth-Token": `${apiToken}` },
        }
      );
      const response = await data.json();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/pronosticos");

      const data = await response.json();
      console.log(data);
      setResults(data);
    };
    getData();
  }, []);

  async function evaluateResponse() {
    const userBet = await results.filter(
      (result) => result.userId === props.id
    );
    console.log("USERBET", userBet);

    let aux;
    for (let i = 0; i < testMatch.length; i++) {
      // console.log(
      //   "LOG",
      //   await userBet.filter((el) => el.matchId == testMatch[i].id)[0]
      // );
      aux.push(await userBet.filter((el) => el.matchId == testMatch[i].id)[0]);
      console.log("AUX", aux);
    }
  }

  //console.log(Promise.all(evaluateResponse()));

  return <div>{evaluateResponse}</div>;
};

export default Resultados;
