import { useEffect, useState } from "react";
import "../App.css";

const apiToken = "cfccda3b57e4496d884919c349c9f8a7";

const Resultados = (props) => {
  const [bets, setBets] = useState(0);

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
      setBets(data);
    };
    getData();
  }, []);

  const testMatch = [
    { id: 391881, winner: "Netherlands", goalHome: 1, goalAway: 2 },
    { id: 391882, winner: "Ecuador", goalHome: 1, goalAway: 2 },
    { id: 391883, winner: "Argentina", goalHome: 1, goalAway: 2 },
  ];

  const testBet = [
    { id: 391881, winner: "Senegal", goalHome: 2, goalAway: 1, userId: 1 },
    { id: 391882, winner: "Ecuador", goalHome: 1, goalAway: 2, userId: 1 },
    { id: 391883, winner: "Argentina", goalHome: 1, goalAway: 3, userId: 1 },
    { id: 391881, winner: "Netherlands", goalHome: 3, goalAway: 1, userId: 2 },
    { id: 391882, winner: "Draw", goalHome: 2, goalAway: 2, userId: 2 },
    { id: 391883, winner: "Argentina", goalHome: 2, goalAway: 3, userId: 2 },
  ];

  const evaluateUserResults = () => {
    const obj = [];
    let points = 0;

    let newArray = [...new Set(testBet.map((bet) => bet.userId))];

    for (let j = 0; j < bets.length; j++) {}

    for (let i = 0; i < testMatch.length; i++) {
      let caseWinner =
        testMatch.filter((match) => match.id === testBet[i].id)[0].winner ===
        testBet[i].winner;
      let caseGoalHome =
        testMatch.filter((match) => match.id === testBet[i].id)[0].goalHome ===
        testBet[i].goalHome;
      let caseGoalAway =
        testMatch.filter((match) => match.id === testBet[i].id)[0].goalAway ===
        testBet[i].goalAway;

      if (caseWinner) {
        points += 3;
      }

      if (caseGoalHome) {
        points += 3;
      }

      if (caseGoalAway) {
        points += 3;
      }

      //All
      if (caseWinner && caseGoalHome && caseGoalAway) {
        points += 10;
      }
    }
    console.log("POINTS", points);
    return points;
  };

  //console.log(Promise.all(evaluateResponse()));

  return <div>{evaluateUserResults()}</div>;
};

export default Resultados;
