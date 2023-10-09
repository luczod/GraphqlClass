import fetch from "node-fetch";

const API_URL = process.env.API_URL;

const get = (endPoint, urlParam, requestInt = {}) => {
  return fetch(
    API_URL + endPoint + "?" + new URLSearchParams(urlParam).toString(),
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },

      ...requestInt,
    }
  );
};

const post = (endPoint, body, requestInt = {}) => {
  const url = API_URL + endPoint;
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    ...requestInt,
  });
};

const put = (endPoint, body, requestInt = {}) => {
  const url = API_URL + endPoint;
  return fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    ...requestInt,
  });
};

const patch = (endPoint, body, requestInt = {}) => {
  const url = API_URL + endPoint;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    ...requestInt,
  });
};

const deletar = (endPoint, requestInt = {}) => {
  const url = API_URL + endPoint;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    ...requestInt,
  });
};

// function IIFE
// criada e executada ao mesmo tempo
/*(async () => {
  //const userGetResponse = await get("/users/502");
  //const user = await userGetResponse.json();
  //console.log(user);

  const userPostResponse = await post("/users", {
    id: "6001",
    firstName: "criado - Márcia",
    lastName: "criado - Carvalho",
    userName: " criado - marcia_carvalho81",
    indexRef: 1,
    createdAt: "criado -2016-12-08T00:49:39.870Z",
  });
  const user = await userPostResponse.json();
  console.log(user);
})();*/

// put - apaga tudo e cria o objeto novamente, modificado
/*(async () => {
  const userResponse = await put("/users/6000", {
    firstName: "editado com put - Márcia",
  });

  const user = await userResponse.json();
  console.log(user);
})();*/

// patch apaga um chave individualmente, sem apagar o objeto inteiro
/*(async () => {
  const userResponse = await patch("/users/6001", {
    firstName: "editado com patch - Márcia",
  });

  const user = await userResponse.json();
  console.log(user);
})();*/

// deletar o user
(async () => {
  const userResponse = await deletar("/users/6000");
  const user = await userResponse.json();
  console.log(user);
})();
// CRUD post get patch delete
