require('ts-node/register');
import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  // tests: 'tests/codeceptjs/*.test.ts',
  tests: 'tests/codeceptjs/*.ts',
  output: '',
  helpers: {
    REST: {
      endpoint: 'http://localhost:3000/api'
    },
    JSONResponse: {}
  },
  include: {
    I: './steps_file',
    request: 'src/clients/codeceptjs.client.ts'
  },
  name: 'sample-codeceptjs'
}
