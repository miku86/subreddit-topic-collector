const argv = require('yargs').argv;

console.log('Starting application...');

if (argv.subreddit) {
  console.log(`You want to fetch the subreddits of ${argv.subreddit}`);
} else {
  console.log('You did not input an argument!');
}
