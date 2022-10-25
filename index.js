import { readFileSync } from 'fs';
import path from 'path';
import { getCallerDirectory } from './get-directory.js';

const templateFiles = {};
export function renderFile(file) {
    const directory = file[0] === '/' ? process.cwd() : getCallerDirectory();
    const filePath = path.join(directory, file);
    if (templateFiles[filePath]) {
        return templateFiles[filePath];
    }
    try {
        const templateFile = readFileSync(filePath, 'utf8');
    } catch (e) {
        throw new Error(`Failed to read ${filePath}`);
    }
    templateFiles[filePath] = function template(vars = {}) {
        const keys = Object.keys(vars);
        // @ts-ignore
        const values = Object.values(vars);
        // eslint-disable-next-line no-new-func, prefer-template
        return new Function(
            ...keys,
            `try {
                return \`${templateFile}\`;
            } catch (e) {
                throw new Error(\`${filePath} failed. \${e}\`);
            }`
        )(...values);
    };
    return templateFiles[filePath];
}
