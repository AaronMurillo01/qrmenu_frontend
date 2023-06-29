import { toast } from "react-toastify";

export function signIn(username, password) {
  return fetch("/auth/token/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      console.log(response);

      //If it is success
      if (response.ok) {
        return response.json();
      }

      //Otherwise, if there are errors
      return response
        .json()
        .then((json) => {
          //Handle JSON error, response by the server

          if (response.status === 400) {
            const errors = Object.keys(json).map(
              (k) => `${(json[k].join(" "))}`
            );
            throw new Error(errors.join(" "));
          }
          throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
            if(e.name === "SyntaxError"){
                throw new Error(response.statusText);
            }
          throw new Error(e);
        });
    })
    .then((json) => {
      //CALL API successfully
      toast(JSON.stringify(json), { type: "success" });
    })
    .catch((e) => {
      //Handle all errors
      toast(e.message, { type: "error" });
    });
}
