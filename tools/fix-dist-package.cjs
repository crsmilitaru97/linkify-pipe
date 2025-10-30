const fs = require('fs');
const path = require('path');

const distPackagePath = path.resolve(__dirname, '..', 'dist', 'package.json');

if (!fs.existsSync(distPackagePath)) {
  console.error('dist/package.json not found. Did you run npm run build?');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(distPackagePath, 'utf8'));

const normalizeField = (field, value) => {
  if (!value) return;
  if (value.startsWith('./dist/')) {
    pkg[field] = value.replace('./dist/', './');
  } else if (!value.startsWith('./')) {
    pkg[field] = `./${value}`;
  }
};

normalizeField('main', pkg.main);
normalizeField('module', pkg.module);
normalizeField('types', pkg.types);

if (pkg.exports && pkg.exports['.']) {
  const entry = pkg.exports['.'];
  if (entry.import && entry.import.startsWith('./dist/')) {
    entry.import = entry.import.replace('./dist/', './');
  }
  if (entry.default && entry.default.startsWith('./dist/')) {
    entry.default = entry.default.replace('./dist/', './');
  }
  if (entry.types && entry.types.startsWith('./dist/')) {
    entry.types = entry.types.replace('./dist/', './');
  }
}

fs.writeFileSync(distPackagePath, JSON.stringify(pkg, null, 2));
console.log('Updated dist/package.json entries.');
