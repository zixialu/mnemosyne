const args = ['start'];
const opts = { stdio: 'inherit', cwd: 'api', shell: true };
require('child_process').spawn('yarn', args, opts);
