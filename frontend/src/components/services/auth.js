import axios from "axios"
export const setAxiosAuthToken = (token) => {
    if(typeof token !== "undefined" && token){
        console.log("--suprimer token--")
        //Appliquez le TOKEN pour chaque demande que nous ferons à l'avenir
        axios.defaults.headers.common["Authorization"] = "Token" + token;

    } else {
        console.log("---supprimer foix---")
        //Supprimer l'en-tête d'authentification
        delete axios.defaults.headers.common["Authorization"];
        console.log("---fin tutto---")
        console.log(localStorage.getItem("token"))
    }
};

export const setToken = (token) => {
    localStorage.setItem("token",token);
};

export const setCurrentUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("----apposto set current---")
};
export const unsetCurrentUser = () => {
    setAxiosAuthToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    console.log("fermer utilisateur")
}
export const getCurrentUser = () => {
    axios.get("http://localhost:8000/api/authy/whoami/").then(response => {
        console.log(response)
        const user = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            //picture: response.data.profile.picture,
            //banner: response.data.profile.banner,
        };
        setCurrentUser(user);
    })
    console.log("---finito getCurrentUser----")
};

//Log out services
export const logout = () => {
    axios.post("http://localhost:8000/api/authy/logout").then(response => {
        unsetCurrentUser();
        console.log("Logout accepter")
    })
};

export const logoutall = () => {
    axios.post("http://localhost:8000/api/authy/logout").then(response => {
        unsetCurrentUser()
        console.log("Logout accepter,tous les token supprimer")
    })
};
//Service  log de utilisateur
export const loginUser = (username, password) => {
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    //Request body
    const body = JSON.stringify({username,password})
    const promise = axios.post("http://localhost:8000/api/authy/login/",body,config);
    const dataPromise = promise.then((response) => response.data.token)
    return dataPromise;
};
//Service registration de utilisateur
export const registerUser = (username, email, password) => {
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    };
    //Request body
    const body = JSON.stringify({ username, email, password});
    axios
    .post('http://localhost:8000/api/authy/signup', body, config)
    .then(response =>{
        const auth_token = response.data.token;
        setAxiosAuthToken(auth_token);
        setToken(auth_token);
        getCurrentUser();
    })
    .catch(error => {
        unsetCurrentUser();
        console.log(error);
        window.alert("Error username/email may be duplicated" + error);
    });
    return true;
}
