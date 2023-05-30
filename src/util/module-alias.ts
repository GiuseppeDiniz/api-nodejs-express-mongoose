import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

/* eslint-disable @typescript-eslint/naming-convention */
moduleAlias.addAliases({
	'@src': path.join(files, 'src'),
	'@modules': path.join(files, 'src/app/modules'),
	'@test': path.join(files, 'test'),
});
/* eslint-enable @typescript-eslint/naming-convention */
