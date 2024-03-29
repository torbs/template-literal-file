export const fileNamePattern = /[^/]+$/;
export const protocollPattern = /^\w+:\/\//;

export function getCallerDirectory(file) {
	const _prepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = new Error().stack.slice(1);
	Error.prepareStackTrace = _prepareStackTrace;

    const currentIndex = stack.findIndex(entry => {
        return entry.getFunctionName() === 'renderFile';
    });

    const callsite = stack[currentIndex + 1];

    if (callsite) {
        return callsite
            .getFileName()
            .replace(fileNamePattern, '')
            .replace(protocollPattern, '');
    }
    throw new Error(`Could not find directory for ${file}`);
}
