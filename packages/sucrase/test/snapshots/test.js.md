# Snapshot report for `test/test.js`

The actual snapshot is saved in `test.js.snap`.

Generated by [AVA](https://avajs.dev).

## converts jsx

> Snapshot 1

    '() => React.createElement(\'div\', { id: "foo", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 1}}, "hello world" )'

## converts jsx with custom jsxPragma

> Snapshot 1

    '() => FakeReactCreateElement(\'div\', { id: "foo", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 1}}, "hello world" )'

## converts typescript

> Snapshot 1

    '(a, b) => a * b'

> Snapshot 2

    '(a, b) => a * b'

> Snapshot 3

    '(a, b) => a * b'

> Snapshot 4

    '(a, b) => a * b'

## converts typescript with aliases

> Snapshot 1

    '(a, b) => a * b'

## resolves typescript directory imports

> Snapshot 1

    '(a, b) => a * b'

> Snapshot 2

    '(c, d) => c * d'

## converts typescript jsx ("tsx")

> Snapshot 1

    '() => React.createElement(\'div\', { id: "foo", __self: undefined, __source: {fileName: _jsxFileName$4, lineNumber: 1}}, "hello world" )'

> Snapshot 2

    '() => React.createElement(\'div\', { id: "example-b", __self: undefined, __source: {fileName: _jsxFileName$3, lineNumber: 1}}, "hello world (a second time)"    )'

> Snapshot 3

    '() => React.createElement(\'div\', { id: "foo", __self: undefined, __source: {fileName: _jsxFileName$2, lineNumber: 1}}, "hello world" )'

> Snapshot 4

    '() => React.createElement(\'div\', { id: "foo", __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 1}}, "hello world" )'

> Snapshot 5

    '() => React.createElement(\'div\', { id: "foo", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 1}}, "hello world" )'