import axios from "axios"

const api = axios.create({baseURL: "http://127.0.0.1:8000",})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = token
  }
  return config;
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("refresh")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
);

// API CALLS
export async function getallevents() {
  return await api.get("/events")
}

export async function eventsearch(searchTerm){
    return await api.get(`/search?search=${searchTerm}`)
}

export async function getevent(id) {
  return await api.get(`/events/${id}`)
}

export async function eventregister(id) {
  return await api.post(`/events/${id}/register/`, {})
}

export async function getregisterations() {
    return await api.get('/my-registrations')
}

export async function createuser(data) {
    return await api.post('register',data)
}

export async function loginuser(data) {
    return await api.post('login/',data)
}

export async function logoutuser(){
    let refresh = localStorage.getItem('refresh')?.replace("Bearer ", "")
    return await api.post('logout/',{refresh:refresh})
}