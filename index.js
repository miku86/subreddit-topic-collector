const argv = require('yargs').usage('Usage: $0 --subreddit [string]').argv;
const chalk = require('chalk');
const readlineSync = require('readline-sync');
const request = require('request');

const CONFIG = {
  REDDIT_DOMAIN: `https://www.reddit.com`
};

const getDesiredSubreddit = () => {
  if (argv.subreddit) {
    return argv.subreddit;
  }

  const subreddit = readlineSync.question(
    'Which Subreddit do you want to fetch?'
  );
  return subreddit;
};

const fetchData = (url) => {
  request(url, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }

    if (body.error) {
      console.log(`There was an error: ${body.error}`);
    } else {
      const topics = body.data.children;

      if (topics.length) {
        topics.forEach((topic) => {
          const { title, permalink } = topic.data;
          console.log(`${chalk.bgRed(title.slice(0))}`);
          console.log(`=> ${CONFIG.REDDIT_DOMAIN + permalink}`);
          console.log(`----------------------------`);
        });
      } else {
        console.log(
          `${chalk.bgRed(
            'There are no topics, perhaps the subreddit does not exist!'
          )}`
        );
      }
    }
  });
};

const desiredSubreddit = getDesiredSubreddit();
console.log(
  `You want to fetch the subreddits of ${chalk.yellow(desiredSubreddit)}`
);
console.log(`==================`);

const REDDIT_API_URL = `${CONFIG.REDDIT_DOMAIN}/r/${desiredSubreddit}/top.json`;
fetchData(REDDIT_API_URL);
