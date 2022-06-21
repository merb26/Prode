import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../components/formConfig";

export default function useMercadoPago() {
  const [resultPayment, setResultPayment] = useState(undefined);
  const { MercadoPago } = useScript(
    "https://sdk.mercadopago.com/js/v2",
    "MercadoPago"
  );

  const PUBLIC_KEY_TEST = "TEST-f5ddaa57-7f70-451f-b329-2c430b78ac8f";
  const PUBLIC_KEY_VENDEDOR_PRUEBA =
    "TEST-001debb2-d8d5-40a4-953f-8ca65aaa0fa0";
  useEffect(() => {
    if (MercadoPago) {
      const mp = new MercadoPago(PUBLIC_KEY_VENDEDOR_PRUEBA);

      const cardForm = mp.cardForm({
        amount: "100.5",
        autoMount: true,
        form: formConfig,
        callbacks: {
          onFormMounted: (error) => {
            if (error)
              return console.warn("Form Mounted handling error: ", error);
          },
          onSubmit: (e) => {
            e.preventDefault();
            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            fetch(`http://localhost:3000/process_payment`, {
              // entry point backend
              method: "POST",
              made: "cors",
              headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Request-Method":
                //   "GET, POST, DELETE, PUT, OPTIONS",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: 1000,
                installments: Number(installments),
                description: "Descripción del producto",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => setResultPayment(data))
              .catch((err) => {
                setResultPayment(err);
              });
          },

          onFetching: (resource) => {
            // Animate progress bar
            const progressBar = document.querySelector(".progress-bar");
            progressBar.removeAttribute("value");

            return () => {
              progressBar.setAttribute("value", "0");
            };
          },
        },
      });
    }
  }, [MercadoPago]);

  return resultPayment;
}
