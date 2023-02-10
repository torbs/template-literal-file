# template-literal-file

Have template literals in an own file and compile it to a function.

# Usage

Load a template literal file using the `renderFile` function

`const templateFunction = renderFile('./path/to/file.html')`

This returns a function which you can pass an Object. The object keys are passed aas variables to the tempalte literal.
So if you pass an object with the key `myVar` you can use this as a variable inside the template literal file

## Template literal file

```
<div>${myVar}</div>
```

## Javascript

```
import { renderFile } from 'template-literal-file';

const template = renderFile('./test.html');

const html = template({myVar: 'test' });

console.log(html); // <div>test</div>
```
