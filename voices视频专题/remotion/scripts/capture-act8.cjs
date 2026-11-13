// Actual archived webpage DOM, not a reconstructed news or social-media card.
const {openBrowser}=require('@remotion/renderer');
const fs=require('fs'),path=require('path'),crypto=require('crypto');
(async()=>{fs.mkdirSync('.qa/act8',{recursive:true});const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/google-chrome-stable',chromiumOptions:{headless:true}});
try{const p=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:()=>{},onLog:()=>{}});await p.setViewport({width:1440,height:1200,deviceScaleFactor:2});
for(const [id,name,selector,needle] of [['V20','tf-first','p','As far as we know'],['MK13','toms-title','h1','Denuvo cracking group'],['MK13','toms-report','p','According to'],['M22','gamespot-title','h1','Sony and EA']]){
 const source=`../../media/01_sources/${id}/original.html`;if(!fs.existsSync(source))continue;
 const meta=JSON.parse(fs.readFileSync(`../../media/01_sources/${id}/metadata.json`));
 const html=fs.readFileSync(source,'utf8').replace('<head>',`<head><base href="${meta.source_url}">`);const local=path.resolve(`.qa/act8/capture-${id}.html`);fs.writeFileSync(local,html);
 await p.goto({url:'file://'+local,timeout:12000,options:{waitUntil:'load'}}).catch(e=>{if(!String(e).includes('Navigation timeout'))throw e;});
 await new Promise(r=>setTimeout(r,1500));
 const clip=await p.evaluate((selector,needle)=>{const el=[...document.querySelectorAll(selector)].find(x=>x.textContent.includes(needle));if(!el)throw Error('Missing source '+needle);const r=el.getBoundingClientRect();return{x:Math.max(0,r.x+scrollX-8),y:Math.max(0,r.y+scrollY-8),width:r.width+16,height:r.height+16,scale:1}},selector,needle);
 const shot=await p._client().send('Page.captureScreenshot',{format:'png',clip,captureBeyondViewport:true});const file=`../../media/03_stills/voices38_act8/${name}.png`;fs.writeFileSync(file,Buffer.from(shot.value.data,'base64'));
 fs.writeFileSync(file+'.meta.json',JSON.stringify({id:`V38_A8_${name}`,task:'EX15',kind:'image',title:`第八幕 ${id} 原网页局部`,path:`media/03_stills/voices38_act8/${name}.png`,derived_from:`media/01_sources/${id}/original.html`,source_page:meta.source_url,author:id==='V20'?'TorrentFreak':id==='M22'?'GameSpot':"Tom’s Hardware",rights:meta.rights,status:'exported',capture:{mode:'原始HTML存档渲染，仅补base地址；正文未改写',viewport:[1440,1200],deviceScaleFactor:2,clip,selector,needle},sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),bytes:fs.statSync(file).size},null,2)+'\n');console.log(name,clip);
}
}finally{await browser.close({silent:true});}})().catch(e=>{console.error(e);process.exit(1)});
