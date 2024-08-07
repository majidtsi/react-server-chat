import axios from 'axios';

export const getChatData = (id, token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    const promise = axios.get('http://localhost:8000/api/chat/getchats/' + id);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

export const getMoreChatData = (link, token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    const promise = axios.get('http://localhost:8000/' + link);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

export const sendMessage = (body, chatfile, channel) => {
   
    //Headers
    const config = {
        headers : {
            'Content-Type' : 'multipart/form-data',
        },
    };

   let formData = new FormData();

    if(chatfile !== undefined){
        formData.append("file", chatfile);
    }
    formData.append("body", body);
    formData.append("channel", channel);

    //request body
    const promise = axios.post('http://localhost:8000/api/chat/sendmessage/', formData, config)
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

export const DeleteMessage = (message_id, server_id) => {
    const promise = axios.delete('http://localhost:8000/api/chat/deletemsg/' + message_id + '/' + server_id);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};