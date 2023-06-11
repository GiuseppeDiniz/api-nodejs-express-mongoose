import * as path from "path";
import moduleAlias from "module-alias";

const files = path.resolve(__dirname, "../..");

/* eslint-disable @typescript-eslint/naming-convention */
moduleAlias.addAliases({
  "@src": path.join(files, "./src"),
  "@models": path.join(files, "src/models"),
  "@test": path.join(files, "__TEST__"),
});
/* eslint-enable @typescript-eslint/naming-convention */
