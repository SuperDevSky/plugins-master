export function importModule(name) {
  return import(`./module-dir-a/${name}.js`, { assert: { type: "css" }});
}
