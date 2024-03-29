const test = require('ava');
const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const yamlParser = require('js-yaml');

const { testBundle } = require('../../../util/test');

const yaml = require('..');

const spec = require('./fixtures/spec.json');

require('source-map-support').install();

process.chdir(__dirname);

// Tests YAML spec conformance from https://github.com/connec/yaml-spec/blob/master/spec.json
// Just making sure the underlying YAML parser isn't crap
Object.keys(spec).forEach((key, keyIndex) => {
  Object.keys(spec[key]).forEach((testKey, testIndex) => {
    const fixture = spec[key][testKey];

    test(`converts YAML spec ${keyIndex}:${testIndex}`, (t) => {
      const result = yamlParser.load(fixture.yaml);
      t.deepEqual(result, fixture.result);
    });
  });
});

test('converts yaml', async (t) => {
  const bundle = await rollup.rollup({
    input: 'fixtures/basic/main.js',
    plugins: [yaml()]
  });
  return testBundle(t, bundle);
});

test('converts yml', async (t) => {
  const bundle = await rollup.rollup({
    input: 'fixtures/yml/main.js',
    plugins: [yaml()]
  });
  return testBundle(t, bundle);
});

test('generates named exports', async (t) => {
  const bundle = await rollup.rollup({
    input: 'fixtures/named/main.js',
    plugins: [yaml()]
  });
  return testBundle(t, bundle);
});

test('resolves extensionless imports in conjunction with nodeResolve plugin', async (t) => {
  const bundle = await rollup.rollup({
    input: 'fixtures/extensionless/main.js',
    plugins: [nodeResolve({ extensions: ['.js', '.yaml'] }), yaml()]
  });
  return testBundle(t, bundle);
});

test('applies the optional transform method to parsed YAML', async (t) => {
  const transform = (data, filePath) => {
    // check that transformer is passed a correct file path
    t.true(typeof filePath === 'string' && filePath.endsWith('.yaml'), filePath);
    if (Array.isArray(data)) {
      t.true(filePath.endsWith('array.yaml'), filePath);
      return data.filter((datum) => !datum.private);
    }
    Object.keys(data).forEach((key) => {
      if (data[key].private) {
        delete data[key]; // eslint-disable-line no-param-reassign
      }
    });
    return undefined; // eslint-disable-line no-undefined
  };

  const bundle = await rollup.rollup({
    input: 'fixtures/transform/main.js',
    plugins: [yaml({ transform })]
  });
  return testBundle(t, bundle);
});

test('documentMode: multi', async (t) => {
  const bundle = await rollup.rollup({
    input: 'fixtures/multi/main.js',
    plugins: [yaml({ documentMode: 'multi' })]
  });
  return testBundle(t, bundle);
});

test('bad documentMode', async (t) => {
  const exec = () =>
    rollup.rollup({
      input: 'fixtures/basic/main.js',
      plugins: [yaml({ documentMode: true })]
    });

  t.throws(exec);
});

test('file extension not in the list', async (t) => {
  const content = 'some content';
  const id = 'testfile.unknown';
  const plugin = yaml();
  const output = plugin.transform(content, id);

  t.is(output, null, 'Should return null for unlisted extensions');
});

test('file passes the filter', async (t) => {
  const content = 'some content';
  const id = 'testfile.yaml';
  const plugin = yaml({ include: '**/*.yaml' });
  const output = plugin.transform(content, id);

  t.not(output, null, 'Should not return null for files passing the filter');
});

test('file does not pass the filter', async (t) => {
  const content = 'some content';
  const id = 'testfile.yaml';
  const plugin = yaml({ exclude: '**/*.yaml' });
  const output = plugin.transform(content, id);

  t.is(output, null, 'Should return null for files not passing the filter');
});

test('uses custom extensions', async (t) => {
  const content = 'some content';
  const id = 'testfile.custom';
  const plugin = yaml({ extensions: ['.custom'] });
  const output = plugin.transform(content, id);

  t.not(output, null, 'Should not return null for files with custom extensions');
});

test('does not process non-custom extensions', async (t) => {
  const content = 'some content';
  const id = 'testfile.yaml';
  const plugin = yaml({ extensions: ['.custom'] });
  const output = plugin.transform(content, id);

  t.is(output, null, 'Should return null for files without custom extensions');
});
