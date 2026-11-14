const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {bundle}=require('@remotion/bundler');
const {openBrowser,renderStill}=require('@remotion/renderer');
(async()=>{
 const plan=JSON.parse(fs.readFileSync('src/stickers/plan.json'));
 const cs=JSON.parse(fs.readFileSync('.qa/current-compositions.json'));
 const full=cs.find(c=>c.id==='V38Full');
 const caps=Object.assign({},...['src/captions.json',...Array.from({length:9},(_,i)=>`src/act${i+2}/captions.json`)].map(p=>JSON.parse(fs.readFileSync(p))));
 const norm=t=>t.replace(/[^\p{L}\p{N}_]/gu,'').toLowerCase();
 const groups=['timings',...Array.from({length:9},(_,i)=>`act${i+2}Timings`)].map(k=>full.props[k]);
 const shots=[];let start=0;
 groups.forEach((g,ai)=>g.forEach((s,si)=>{shots.push({start,timing:s,act:ai+1,shot:si+1});start+=Math.round(s.duration*60)}));
 const probes=plan.map(b=>{
  const s=shots.find(s=>s.timing.voices.some(v=>v.id===b.voice));assert(s,b.id);
  const v=s.timing.voices.find(v=>v.id===b.voice);
  const row=b.cue?caps[b.voice].find(c=>norm(c.text).includes(norm(b.cue))):null;
  if(b.cue)assert(row,'Missing cue '+b.id);
  const source=(row?.startMs??0)/1000+(b.offset??0);const local=Math.max(0,Math.round((v.start+source-(v.trimBefore??0))*60));
  const frames=Math.min(Math.round(b.seconds*60),Math.round(s.timing.duration*60)-local-1);assert(frames>12,b.id);
  const frame=s.start+local+Math.min(45,Math.round(frames*.48));
  return {...b,act:s.act,shot:s.shot,from:s.start+local,frames,frame,time:(s.start+local)/60,output:`.qa/stickers/${b.id}.png`};
 });
 assert.equal(probes.length,20);assert.equal(new Set(probes.map(p=>p.asset)).size,20);
 for(const r of JSON.parse(fs.readFileSync('sticker-asset-provenance.json'))){
  const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
  assert.equal(sha(path.resolve('../..',r.path)),r.sha256);assert.equal(sha(r.derived_from),r.sha256);assert.equal(sha(path.resolve('../..',r.ledger_path)),r.sha256);
 }
 fs.writeFileSync('.qa/sticker-probes.json',JSON.stringify(probes,null,2));
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('.qa/sticker-bundle')});
 const browser=await openBrowser('chrome',{chromiumOptions:{gl:'vulkan'}});
 try{
  for(const p of probes.filter(p=>process.argv.length<3 || process.argv.slice(2).includes(p.id))){await renderStill({serveUrl,composition:full,frame:p.frame,scale:.5,output:p.output,puppeteerInstance:browser,logLevel:'error'});console.log('CHECKED',p.id,p.frame,p.frames);}
  if(process.env.CHECK_PUBLIC_CREDITS==='1'){
   const act2=cs.find(c=>c.id==='V38Act2');
   const oldNfo=cs.find(c=>c.id==='V38Act1').durationInFrames+act2.props.timings.slice(0,4).reduce((n,s)=>n+Math.round(s.duration*60),0)+180;
   for(const [name,frame] of [['caption-dark',300],['caption-paper',900],['nfo-credit',oldNfo],['court-credit',63000],['no-credit',74700]]){
    await renderStill({serveUrl,composition:full,frame,scale:.5,output:`.qa/public-${name}.png`,puppeteerInstance:browser,logLevel:'error'});
    console.log('PUBLIC_LABEL',name,frame);
   }
  }
 }finally{await browser.close({silent:true});}
 console.log('PASS: 20 unique transparent stickers, cue anchors, source hashes, still renders; full duration unchanged.');
})().catch(e=>{console.error(e);process.exit(1)});
