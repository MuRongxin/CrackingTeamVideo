const fs=require('node:fs'),path=require('node:path');
const {openBrowser,renderMedia}=require('@remotion/renderer');
const {buildMasterPlan}=require('../.qa/music-model/music/plan.js');
(async()=>{
 const cs=JSON.parse(fs.readFileSync('.qa/current-compositions.json'));
 const full=structuredClone(cs.find(c=>c.id==='V38Full'));
 let original=0;
 for(const key of ['timings',...Array.from({length:9},(_,i)=>`act${i+2}Timings`)])
  full.props[key]=full.props[key].map(s=>{const begin=Math.round(original/2);original+=Math.round(s.duration*60);return {...s,duration:(Math.round(original/2)-begin)/30};});
 full.fps=30;full.durationInFrames=Math.round(original/2);
 const groups=['timings',...Array.from({length:9},(_,i)=>`act${i+2}Timings`)].map(k=>full.props[k]);
 const plan=buildMasterPlan(groups,30);
 const ranges=[['restored-intro',46,56],['bgm1-loop',129,136],['geng-first',261,271],['geng-second',561,572],['restored-forum',1140,1165],['bgm2-start',plan.clips.find(c=>c.track==='b').from/30-1,plan.clips.find(c=>c.track==='b').from/30+5]];
 const browser=await openBrowser('chrome',{chromiumOptions:{gl:'vulkan'}});
 try{
  for(const[name,start,end]of ranges){
   const frameRange=[Math.floor(start*30),Math.ceil(end*30)-1];
   await renderMedia({serveUrl:path.resolve('.qa/current-bundle'),composition:full,codec:'wav',audioCodec:'pcm-16',sampleRate:48000,outputLocation:`.qa/review-audio-${name}.wav`,frameRange,puppeteerInstance:browser,concurrency:2,logLevel:'error',overwrite:true});
   console.log('RENDERED',name,frameRange);
  }
 }finally{await browser.close({silent:true});}
})().catch(e=>{console.error(e);process.exit(1)});
