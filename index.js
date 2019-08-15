const argv = require('yargs').usage('Usage: $0 --subreddit [string]').argv;
const chalk = require('chalk');
const readlineSync = require('readline-sync');
const request = require('request');

console.log(chalk.bgBlue.yellow('Starting application...'));

let desiredSubreddit;

if (argv.subreddit) {
  console.log(
    `You want to fetch the subreddits of ${chalk.yellow(argv.subreddit)}`
  );
  desiredSubreddit = argv.subreddit;
} else {
  console.log('You did not input an argument!');
  const subreddit = readlineSync.question(
    'Which Subreddit do you want to fetch?'
  );
  console.log(`You want to fetch the subreddits of ${chalk.yellow(subreddit)}`);
  desiredSubreddit = subreddit;
}

const redditDomain = `https://www.reddit.com`;
const redditUrl = `${redditDomain}/r/${desiredSubreddit}/top.json`;

const fetchData = async () => {
  request(redditUrl, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    const topics = body.data.children;
    topics.forEach((topic) => {
      const { title, permalink } = topic.data;
      console.log(`${title} => ${chalk.bgRed(redditDomain + permalink)}`);
    });
  });
};

fetchData();
