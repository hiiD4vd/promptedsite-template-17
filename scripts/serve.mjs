import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.argv[2]||'dist'),port=Number(process.argv[3]||4173);
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.glb':'model/gltf-binary','.wasm':'application/wasm','.mp4':'video/mp4','.ico':'image/x-icon','.hdr':'image/vnd.radiance','.exr':'image/x-exr'};
http.createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=path.resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');
  const body=await fs.readFile(file);
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||(file.includes('/use.typekit.net/af/')?'font/woff2':'application/octet-stream'),'Content-Length':body.length,'X-Content-Type-Options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}`));
