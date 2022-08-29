import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "../App.css";
import AuthVerify from "../common/AuthVerify";
import Navigation from "./Navigation";

const apiToken = "cfccda3b57e4496d884919c349c9f8a7";

const Resultados = (props) => {
  const userLogged = AuthVerify();
  const location = useLocation();
  const { id, groupMatches, teams, getImg } = location.state || {};

  const [bet, setBet] = useState({});
  const [table, setTable] = useState({});
  const [loading, setLoading] = useState(false);

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
    const getBets = async () => {
      try {
        const response = await fetch("http://localhost:3000/pronosticos");

        const bets = await response.json();
        //setBets(await data);
        let ids = await bets.map((bet) => bet.userId);
        let uniqueIds = [...new Set(ids)]; //array with unique ids
        let obj = [];

        for (let j = 0; j < uniqueIds.length; j++) {
          let points = 0;
          let userFilter = bets.filter((bet) => bet.userId === uniqueIds[j]); //filter by userId
          //console.log("USERFILTER", userFilter);

          for (let k = 0; k < testMatch.length; k++) {
            let caseWinner =
              userFilter.filter(
                (match) => match.matchId === testMatch[k].matchId
              )[0].winner === testMatch[k].winner;

            let caseGoalHome =
              userFilter.filter(
                (match) => match.matchId === testMatch[k].matchId
              )[0].goalHome === testMatch[k].goalHome;
            let caseGoalAway =
              userFilter.filter(
                (match) => match.matchId === testMatch[k].matchId
              )[0].goalAway === testMatch[k].goalAway;

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
          obj.push({ userId: uniqueIds[j], points });

          //setTable(obj);
        }
        console.log("OBJ", obj);
        setTable(obj);
        setLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };

    getBets();
  }, []);

  const testMatch = [
    { matchId: 391881, winner: "Netherlands", goalHome: 2, goalAway: 3 },
    { matchId: 391882, winner: "Ecuador", goalHome: 1, goalAway: 2 },
    { matchId: 391883, winner: "Qatar", goalHome: 3, goalAway: 2 },
  ];

  //{userId:1, points: 19 + 3 + 0 = 22}
  //{userId:2, points: 6 + 0 + 0 = 6}

  const testBet = [
    {
      matchId: 391881,
      winner: "Netherlands",
      goalHome: 2,
      goalAway: 3,
      userId: 1,
    },
    { matchId: 391882, winner: "Draw", goalHome: 1, goalAway: 1, userId: 1 },
    {
      matchId: 391883,
      winner: "Senegal",
      goalHome: 1,
      goalAway: 3,
      userId: 1,
    },
    {
      matchId: 391881,
      winner: "Netherlands",
      goalHome: 1,
      goalAway: 3,
      userId: 2,
    },
    { matchId: 391882, winner: "Qatar", goalHome: 2, goalAway: 1, userId: 2 },
    {
      matchId: 391883,
      winner: "Draw",
      goalHome: 1,
      goalAway: 1,
      userId: 2,
    },
  ];

  // const evaluateUserResults = async () => {
  //   try {
  //     console.log("BETS", bets);
  //     let ids = await bets.map((bet) => bet.userId);
  //     let uniqueIds = [...new Set(ids)]; //array with unique ids
  //     let obj = [];

  //     for (let j = 0; j < uniqueIds.length; j++) {
  //       let points = 0;
  //       let userFilter = bets.filter((bet) => bet.userId === uniqueIds[j]); //filter by userId
  //       //console.log("USERFILTER", userFilter);

  //       for (let k = 0; k < testMatch.length; k++) {
  //         let caseWinner =
  //           userFilter.filter(
  //             (match) => match.matchId === testMatch[k].matchId
  //           )[0].winner === testMatch[k].winner;

  //         let caseGoalHome =
  //           userFilter.filter(
  //             (match) => match.matchId === testMatch[k].matchId
  //           )[0].goalHome === testMatch[k].goalHome;
  //         let caseGoalAway =
  //           userFilter.filter(
  //             (match) => match.matchId === testMatch[k].matchId
  //           )[0].goalAway === testMatch[k].goalAway;

  //         if (caseWinner) {
  //           points += 3;
  //         }

  //         if (caseGoalHome) {
  //           points += 3;
  //         }

  //         if (caseGoalAway) {
  //           points += 3;
  //         }

  //         //All
  //         if (caseWinner && caseGoalHome && caseGoalAway) {
  //           points += 10;
  //         }
  //       }
  //       obj.push({ userId: uniqueIds[j], points });

  //       //setTable(obj);
  //     }
  //     console.log("OBJ", obj);
  //     //setTable(obj);
  //     //setLoading(true);
  //     return obj;
  //   } catch (err) {
  //     console.log("ERR on evaluateUserResults:", err.message);
  //   }
  // };

  //console.log(Promise.resolve(evaluateUserResults()));

  return userLogged ? (
    /*bets &&*/ table && loading && (
      <header className="masthead">
        <Navigation
          id={userLogged.id}
          groupMatches={groupMatches}
          teams={teams}
          getImg={getImg}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">USER ID</th>
              <th scope="col">POINTS</th>
            </tr>
          </thead>
          <tbody>
            {table.map((table) => (
              <>
                <tr>
                  <td>{table.userId}</td>
                  <td>{table.points}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </header>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default Resultados;
