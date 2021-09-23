import api from "@forge/api";
import ForgeUI, { render, Fragment, Text, IssuePanel, IssuePanelAction, useProductContext, useState } from "@forge/ui";
import * as jira from "./api/jira";

const fetchCommentsForIssue = async (issueId) => {
    const res = await api
        .asUser()
        .requestJira(`/rest/api/3/issue/${issueId}/comment`);

    const data = await res.json();
    return data.comments;
};

const getCommentsForIssue = async (issueId) => {
    let data = await jira.getIssueComments(issueId);
    console.log(data)
    return data.comments;
};

const App = () => {
    const context = useProductContext();
    const [comments] = useState(async () => await getCommentsForIssue(context.platformContext.issueKey));

    console.log("Issue panel for issue " + context.platformContext.issueKey)
    console.log(`-- Number of comments on this issue: ${comments.length}`);
    return (
        <Fragment>
            <Text>Comments on the issue: {comments.length}</Text>
        </Fragment>
    );
};

export const run = render(
    <IssuePanel actions={[
        <IssuePanelAction text="Custom action" onClick={() => {
            console.log("You are doing a custom action!")
        }}/>
    ]}>
    <App />
  </IssuePanel>
);
