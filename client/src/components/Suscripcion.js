import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FORM_ID = "payment-form";

export default function Suscripcion(props) {
  //const { id } = useParams(); // id de producto
  const id = 1122;
  const [preferenceId, setPreferenceId] = useState(null);
  const { state } = useLocation();

  const PUBLIC_KEY_VENDEDOR_PRUEBA =
    "TEST-001debb2-d8d5-40a4-953f-8ca65aaa0fa0";

  function addCheckOut() {
    const mp = new window.MercadoPago(PUBLIC_KEY_VENDEDOR_PRUEBA, {
      locale: "es-AR",
    });

    // Inicializa el checkout
    mp.checkout({
      preference: {
        id: preferenceId || state.preference_id,
      },
      //   render: {
      //     container: `#${FORM_ID}`, // Indica el nombre de la clase donde se mostrará el botón de pago
      //     label: "Pagar", // Cambia el texto del botón de pago (opcional)

      //   },
      autoOpen: true,
    });
  }

  useEffect(async () => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    try {
      if (!state.preference_id) {
        const post = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          made: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            productId: id,
            name: state.name,
            lastname: state.lastname,
            email: state.email,
          }),
        });

        const data = await post.json();

        setPreferenceId(await data.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    console.log(state.preference_id);
    if (preferenceId || state.preference_id) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.addEventListener("load", addCheckOut);

      //script.setAttribute("preference", preferenceId);
      //   const form = document.getElementById(FORM_ID);
      //   form.appendChild(script);
      document.body.appendChild(script);
    }
  }, [preferenceId, state.preference_id]);

  return <form id={FORM_ID} method="GET" />;
}
