import tap from 'tap';
import { getCallerDirectory } from '../get-directory.js';

tap.test('Get directories', (t) => {
    const dir = getCallerDirectory();
    const root = process.cwd().replace(/test\/$/, '');
    t.equals(dir, `${root}/test/`, 'Returns this directory');
    t.end();
});
