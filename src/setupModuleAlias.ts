import moduleAlias from 'module-alias';
import path from 'path';

const files = path.resolve(__dirname, './');

moduleAlias.addAliases({
  '@': files,
});