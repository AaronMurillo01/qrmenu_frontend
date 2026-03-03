import { toast } from 'react-toastify';

// Base request helper — handles auth headers, JSON parsing, and error toasts
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
    if(response.ok) {
      if (method === "DELETE") {
        return true;
      }
      return response.json();
    }

    // Parse validation errors from the server and surface them as toasts
    return response
      .json()
      .then((json) => {
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
    toast(e.message, {type: "error"});
  })
}

// --- Auth ---

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

// --- Places ---

export function fetchPlaces(token) {
  return request("/api/places/", {token});
}

export function addPlace(data, token) {
  return request("/api/places/", { data, token, method: "POST" });
}

export function fetchPlace(id, token) {
  return request(`/api/places/${id}`, { token });
}

export function updatePlace(id, data, token) {
  return request(`/api/places/${id}`, { data, token, method: "PATCH" });
}

export function removePlace(id, token) {
  return request(`/api/places/${id}`, { token, method: "DELETE" });
}

// --- Categories ---

export function addCategory(data, token) {
  return request("/api/categories/", { data, token, method: "POST" });
}

export function removeCategory(id, token) {
  return request(`/api/categories/${id}`, { token, method: "DELETE" });
}

// --- Menu Items ---

export function addMenuItems(data, token) {
  return request("/api/menu_items/", { data, token, method: "POST" });
}

export function updateMenuItem(id, data, token) {
  return request(`/api/menu_items/${id}`, { data, token, method: "PATCH" });
}

export function removeMenuItem(id, token) {
  return request(`/api/menu_items/${id}`, { token, method: "DELETE" });
}

// --- Images ---

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

// --- Orders & Payments ---

export function createPaymentIntent(data, token) {
  return request("/api/create_payment_intent/", { data, token, method: "POST" });
}

export function fetchOrders(placeId, token) {
  return request(`/api/orders/?place=${placeId}`, { token });
}

export function completeOrder(id, data, token) {
  return request(`/api/orders/${id}`, { data, token, method: "PATCH" });
}
