import { API_BASE_URL } from "./api-config";

export function call(api, method, request) {
  let headers = new Headers({ "Content-Type": "application/json" });
  const acessToken = localStorage.getItem("ACESS_TOKEN");
  if (acessToken && acessToken !== null) {
    headers.append("Authorization", "Bearer " + acessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401){
        throw new Error("UNAUTHORIZED");
      } else if (response.status === 403) {
        window.location.href = "/login";
      } else if (response.status === 409) {
        throw new Error("CONFLICT");
      }else {
        throw new Error(response);
      }
    });
  }

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      //token이 존재하는 경우 Todo화면으로 리디렉트
      localStorage.setItem("ACESS_TOKEN", response.token);
      window.location.href = "/";
    }
  }).catch((error) => {
      if (error.message === "UNAUTHORIZED") {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    });
}

export function signout() {
  localStorage.setItem("ACESS_TOKEN", null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO)
}
