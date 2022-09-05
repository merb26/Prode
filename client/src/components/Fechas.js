import React, { useState, useEffect, Navigate } from "react";
import moment from "moment";
import Navigation from "./Navigation";
import AuthVerify from "../common/AuthVerify";
import { useLocation } from "react-router-dom";

export default function Fechas(props) {
  const userLogged = AuthVerify();
  const apiToken = "cfccda3b57e4496d884919c349c9f8a7";
  const url = "https://api.football-data.org/v2/competitions/WC/matches";
  const [today, setToday] = useState("");
  const location = useLocation();
  const { id, groupMatches, teams, getImg } = location.state || {};
  console.log("FECHAS_STATE", location.state);

  useEffect(() => {
    const fetchMatches = async () => {
      const hoy = moment(Date.now()).format("DD/MM/YYYY");
      const futuro = moment("2022-11-23T01:00:00-0300").format("DD/MM/YYYY");
      try {
        const data = await fetch(url, {
          headers: { "X-Auth-Token": `${apiToken}` },
        });
        const response = await data.json();

        setToday(
          await response.matches.filter(
            (dia) => moment(dia.utcDate).format("DD/MM/YYYY") === futuro
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatches();
  }, []);

  return userLogged ? (
    today && (
      <header className="masthead">
        <Navigation />
        <div className="container px-4 px-lg-5 h-100">
          <h2 className="mt-0">
            Today´s Match:
            {<span>{moment(today[0].utcDate).format(" MMM d, yyyy")}</span>}
          </h2>

          <ul>
            {getImg &&
              today.map((match) => (
                <li key={match.id} type="none">
                  <span>{match.group}</span>
                  <img
                    src={
                      getImg.filter((flag) => flag.id === match.homeTeam.id)[0]
                        .url
                    }
                  />
                  {match.homeTeam.name}
                  <span>vs</span>
                  {match.awayTeam.name}
                  <img
                    src={
                      getImg.filter((flag) => flag.id === match.awayTeam.id)[0]
                        .url
                    }
                  />
                </li>
              ))}
          </ul>
        </div>
      </header>
    )
  ) : (
    <Navigate to="/login" />
  );
}
