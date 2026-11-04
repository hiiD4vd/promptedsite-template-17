import fs from 'node:fs';
import path from 'node:path';
import type {Plugin} from 'vite';
const manifest=JSON.parse(fs.readFileSync(path.resolve('src/config/assets.json'),'utf8')) as {baseUrl:string;files:Record<string,unknown>};
const base=process.env.VITE_MEDIA_BASE_URL||manifest.baseUrl;
function rewrite(value:string){return value.replace(/url\((['"]?)(\/[^)'"?]+)\1\)/g,(original,_quote,url)=>manifest.files[url.slice(1)]?'url("'+base.replace(/\/$/,'')+url+'")':original);}
export function mediaPlugin():Plugin{return {
 name:'release-media',
 config(){return {css:{postcss:{plugins:[{postcssPlugin:'release-media-css',Declaration(declaration:{value:string}){declaration.value=rewrite(declaration.value);}}]}}};},
 transformIndexHtml(html){return html.replace(/(src|href)="(\/[^"?]+)"/g,(original,attr,url)=>manifest.files[url.slice(1)]?attr+'="'+base.replace(/\/$/,'')+url+'"':original);},
};}
