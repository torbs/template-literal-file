export const fileNamePattern = /[^/]+$/;
export const protocollPattern = /^\w+:\/\//;

export function getCallerDirectory(file) {
    const orgFunc = Error.prepareStackTrace;
	Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
	const directory = new Error().stack.slice(1)[0];
	Error.prepareStackTrace = orgFunc;
	
    return directory
        .getFileName()
        .replace(fileNamePattern, '')
        .replace(protocollPattern, '');
}
