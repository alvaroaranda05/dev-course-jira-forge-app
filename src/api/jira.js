import * as api from "./api";
import * as error from "../error";

const API_PATH = `/rest/api/3`;

const getIssue = async (issueId) => {
  let issue = await api.callJiraAPIAsApp(`${API_PATH}/issue/${issueId}`);
  if (!issue) error.throwError(`Issue ${issueId} cannot be obtained`);

  return issue;
};

const getIssueProject = async (issueId) => {
  let issue = await getIssue(issueId);
  if (!issue.fields || !issue.fields.project) error.throwError(`Project for issue ${issueId} cannot be obtained`);

  return issue.fields.project;
}

const getIssueComments = async (issueId) => {
  let comments = await api.callJiraAPIAsApp(`${API_PATH}/issue/${issueId}/comment`);
  if (!comments) error.throwError(`Issue ${issueId} cannot be obtained`);

  return comments;
}

export {getIssue, getIssueProject, getIssueComments}


