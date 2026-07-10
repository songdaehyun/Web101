let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
  //call("/todo")하게 되면 브라우저가 현재 도메인 http://song-todo.cloud를 앞에 붙여준다. 
  //즉 api 요청이 WEB서버로 가게됨.
  backendHost = "";
}

export const API_BASE_URL = `${backendHost}`;
