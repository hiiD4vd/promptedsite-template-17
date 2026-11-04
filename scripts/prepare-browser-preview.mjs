import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const manifest=JSON.parse(await fs.readFile(path.join(root,'src/config/assets.json'),'utf8'));
const config=JSON.parse(await fs.readFile(path.join(root,'src/config/preview.json'),'utf8'));
const cache=path.join(root,'.cache','preview',manifest.release);
const archive=path.join(cache,'media.zip'), extracted=path.join(cache,'media');
const hash=data=>createHash('sha256').update(data).digest('hex');
await fs.mkdir(cache,{recursive:true});
if(!await fs.access(archive).then(()=>true,()=>false)){
 const response=await fetch(config.archiveUrl,{signal:AbortSignal.timeout(120000)});
 if(!response.ok)throw Error('Media archive HTTP '+response.status);
 await fs.writeFile(archive,Buffer.from(await response.arrayBuffer()));
}
if(hash(await fs.readFile(archive))!==config.archiveSha256)throw Error('Archive checksum mismatch; remove '+archive+' and retry.');
const names=execFileSync('unzip',['-Z1',archive],{encoding:'utf8'}).trim().split('\n');
if(names.some(name=>name.startsWith('/')||name.split('/').includes('..')))throw Error('Unsafe archive paths');
await fs.rm(extracted,{recursive:true,force:true});await fs.mkdir(extracted,{recursive:true});
execFileSync('unzip',['-q',archive,'-d',extracted]);
for(const [name,metadata] of Object.entries(manifest.files)){
 const bytes=await fs.readFile(path.join(extracted,name));
 if(bytes.length!==metadata.bytes||hash(bytes)!==metadata.sha256)throw Error('Media integrity failed: '+name);
}
console.log('Verified '+Object.keys(manifest.files).length+' preview media files.');
