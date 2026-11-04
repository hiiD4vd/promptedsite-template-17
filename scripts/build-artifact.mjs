import {spawnSync} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
function run(command,args,env=process.env){const result=spawnSync(command,args,{cwd:root,env,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
run(process.execPath,['scripts/prepare-browser-preview.mjs']);
run('npm',['run','build'],{...process.env,VITE_MEDIA_BASE_URL:'/'});
const manifest=JSON.parse(await fs.readFile(path.join(root,'src/config/assets.json'),'utf8'));
await fs.cp(path.join(root,'.cache','preview',manifest.release,'media'),path.join(root,'dist'),{recursive:true});
console.log('Browser preview: dist/ — serve or mount the COMPLETE directory, including companion files.');
