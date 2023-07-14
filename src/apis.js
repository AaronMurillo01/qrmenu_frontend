import { toast } from 'react-toastify';

function request(path, { data = null, token = null, method = "GET" }) {
  return fetch(path, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
    body: method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
  })
  .then((response) => {

    // If it is success
    if(response.ok) {
      if (method === "DELETE") {
        // If delete, nothing return
        return true;
      }
      return response.json();
    }

    // Otherwise, if there are errors
    return response
      .json()
      .then((json) => {
        // Handle JSON error, response by the server

        if (response.status === 400) {
          const errors = Object.keys(json).map(
            (k) => `${(json[k].join(" "))}`
          );
          throw new Error(errors.join(" "));
        }
        throw new Error(JSON.stringify(json));
      })
      .catch((e) => {
        if (e.name === "SyntaxError") {
          throw new Error(response.statusText);
        }
        throw new Error(e);
      })
  })
  .catch((e) => {
    // Handle all errors
    toast(e.message, {type: "error"});
  })


}

export function signIn(username, password) {
  return request("/auth/token/login/", {
    data: {username, password},
    method: "POST",
  })
}

export function register(username, password) {
  return request("/auth/users/", {
    data: {username, password},
    method: "POST",
  })
}

export function fetchPlaces(token) {
  return request("/api/places/", {token});
}

export function addPlace(data, token) {
  return request("/api/places/", { data, token, method: "POST" });
}

export function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "qrmenu_photos");

  return fetch("https://api.cloudinary.com/v1_1/dtb7kciiu/image/upload", {
    method: "POST",
    body: formData,
  }).then((response) => {
    return response.json();
  });
}

export function fetchPlace(id, token) {
  return request(`/api/places/${id}`, { token });
}

export function addCategory(data, token) {
  return request("/api/categories/", { data, token, method: "POST" });
}

export function addMenuItems(data, token) {
  return request("/api/menu_items/", { data, token, method: "POST" });
}

export function updateMenuItem(id, data, token) {
  return request(`/api/menu_items/${id}`, { data, token, method: "PATCH" });
}

export function removePlace(id, token) {
  return request(`/api/places/${id}`, { token, method: "DELETE" });
}

export function removeCategory(id, token) {
  return request(`/api/categories/${id}`, { token, method: "DELETE" });
}

export function removeMenuItem(id, token) {
  return request(`/api/menu_items/${id}`, { token, method: "DELETE" });
}

export function updatePlace(id, data, token) {
  return request(`/api/places/${id}`, { data, token, method: "PATCH" });
}

export function createPaymentIntent(data, token) {
  return request("/api/create_payment_intent/", { data, token, method: "POST" });
}

export function fetchOrders(placeId, token) {
  return request(`/api/orders/?place=${placeId}`, { token });
}

export function completeOrder(id, data, token) {
  return request(`/api/orders/${id}`, { data, token, method: "PATCH" });
}