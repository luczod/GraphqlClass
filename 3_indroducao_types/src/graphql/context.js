import fetch from "node-fetch";

const endpoint = "http://localhost:4005";

export const context = () => {
  return {
    //valor default para o parametro path , '/'
    getUsers: (path = "/") => {
      const url = endpoint + "/users" + path;
      console.log("getusers , chamdao com ", path);
      return fetch(url);
    },
    getPosts: (path = "/") => {
      const url = endpoint + "/posts" + path;
      console.log("getpost , chamdao com ", path);
      return fetch(url);
    },
  };
};
