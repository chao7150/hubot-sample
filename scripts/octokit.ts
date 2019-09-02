import * as Octokit from "@octokit/rest";

module.exports = async (robot: Hubot.Robot<any>) => {
  const octokit: Octokit = new Octokit({
    auth: "aaaaaaaa"
  });
  const pulls = await octokit.pulls.list({
    owner: "tootsuite",
    repo: "mastodon",
    state: "closed",
    base: "master",
    sort: "created",
    direction: "desc",
    per_page: 10,
    page: 1
  });
  if (pulls) {
    pulls.data
      .filter(
        pull =>
          new Date(pull.closed_at).getTime() >
          new Date("2019-09-02T03:24:00").getTime()
      )
      .map(pull => console.log(pull.title));
  }
};
