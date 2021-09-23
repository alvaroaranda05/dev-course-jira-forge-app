import api from "@forge/api";
import * as error from "../error";

const callJiraAPIAsApp  = async (url) => {
  const response = await api
      .asApp()
      .requestJira(url);

  return await response.json();
}

const callJiraAPIAsUser  = async (url) => {
  const response = await api
      .asUser()
      .requestJira(url);

  return await response.json();
}

const callExternalAPI = async (url, opts, errorMessage) => {
  const response = await api.fetch(url, opts);
  if (!response.ok) error.throwError(errorMessage);

  return await response.json();
}


export {callJiraAPIAsApp, callJiraAPIAsUser, callExternalAPI}