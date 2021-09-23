import * as jira from "./api/jira";
import * as projectrak from "./api/projectrak";

const VALIDATION_DEFAULT_MESSAGE = `Only issues from Software project can go forward`;

const run = async ({ issue, transition: { from, to } }) => {
  console.log(`Validator running for issue ${issue.id} from ${from.id} to ${to.id}`);
  let errorMessage;

  try {
    let project = await jira.getIssueProject(issue.id);

    errorMessage = validate(project);
  } catch (ex) {
    errorMessage = ex;
  }

  return errorMessage
      ? getFailedValidation(issue, errorMessage)
      : getPassedValidation(issue);
};

const validate = (project) => {
  if (!project) {
    return VALIDATION_DEFAULT_MESSAGE;
  }
}

const getPassedValidation = (issue) => {
  console.log(`Validation passed for issue ${issue.id}`)
  return {
    result: true
  }
}

const getFailedValidation = (issue, errorMessage) => {
  console.log(`Validation failed for issue ${issue.id}. ${errorMessage}`)
  return {
    result: false,
    errorMessage: errorMessage
  }
}

export {run}


