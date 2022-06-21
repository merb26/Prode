import "../App.css";

const user = {
  name: "Agustin",
  resultados: {
    fifaid: "300438238",
    winner: "Senegal",
    goalshome: "4",
    goalsaway: "1",
  },
  points: 0,
};

const apiToken = "cfccda3b57e4496d884919c349c9f8a7";

const Resultados = () => {
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

  async function evaluateResponse() {
    const exam = await fetchData();
    console.log(exam);
    if (user.resultados.winner === exam.matches[0].homeTeam.name) {
      user.points++;
      console.log(user);
    }
  }

  evaluateResponse();

  //   if (user.resultados.fifaid === data().fifa_id) {
  //     if (user.resultados.winner === data().winner) {
  //       user.points++;
  //       console.log("PUNTOS", user.points);
  //     }
  //   }

  return <div></div>;
};

export default Resultados;
