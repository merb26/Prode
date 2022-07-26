import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Fechas(props) {
  const apiToken = "cfccda3b57e4496d884919c349c9f8a7";
  const url = "https://api.football-data.org/v2/competitions/WC/matches";
  const [today, setToday] = useState("");

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

  return (
    <div className="container px-4 px-lg-5">
      <h2 className="mt-0">
        Today´s Match:
        {today && (
          <span>{moment(today[0].utcDate).format(" MMM d, yyyy")}</span>
        )}
      </h2>

      <ul>
        {today &&
          props.getImg &&
          today.map((match) => (
            <li id={match.id} type="none">
              <span>{match.group}</span>
              <img
                src={
                  props.getImg.filter(
                    (flag) => flag.id === match.homeTeam.id
                  )[0].url
                }
              />
              {match.homeTeam.name}
              <span>vs</span>
              {match.awayTeam.name}
              <img
                src={
                  props.getImg.filter(
                    (flag) => flag.id === match.awayTeam.id
                  )[0].url
                }
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
