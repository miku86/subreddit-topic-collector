const argv = require('yargs').usage('Usage: $0 --subreddit [string]').argv;
const chalk = require('chalk');
const readlineSync = require('readline-sync');

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

const redditUrl = `https://www.reddit.com/r/${desiredSubreddit}/top.json`;
console.log(redditUrl);
