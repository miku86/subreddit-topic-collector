const argv = require('yargs').usage('Usage: $0 --subreddit [string]').argv;
const chalk = require('chalk');

console.log(chalk.bgBlue.yellow('Starting application...'));

if (argv.subreddit) {
  console.log(
    `You want to fetch the subreddits of ${chalk.yellow(argv.subreddit)}`
  );
} else {
  console.log('You did not input an argument!');
}
