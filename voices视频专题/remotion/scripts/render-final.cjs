const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const {bundle}=require('@remotion/bundler');
const {openBrowser,getCompositions,renderStill,renderMedia}=require('@remotion/renderer');
const {createHash}=require('node:crypto');
(async()=>{
 fs.mkdirSync('.qa',{recursive:true});fs.mkdirSync('out',{recursive:true});
 const output=path.resolve('out/voices38-final-1080p.mp4');
 const started=Date.now();
 const report=data=>{
  const record={...data,elapsedSeconds:Math.round((Date.now()-started)/1000),updatedAt:new Date().toISOString()};
  fs.writeFileSync('.qa/final-render-progress.tmp',JSON.stringify(record,null,2));
  fs.renameSync('.qa/final-render-progress.tmp','.qa/final-render-progress.json');
  console.log(JSON.stringify(record));
 };
 report({stage:'bundle'});
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('.qa/final-bundle')});
 report({stage:'browser'});
 const browser=await openBrowser('chrome',{chromiumOptions:{gl:'vulkan'}});
 try{
  const compositions=await getCompositions(serveUrl,{puppeteerInstance:browser});
  const composition=compositions.find(c=>c.id==='V38Full');
  if(!composition||composition.width!==1920||composition.height!==1080||composition.fps!==60)throw Error('Unexpected final composition format');
  report({stage:'preflight',totalFrames:composition.durationInFrames});
  // Exercise the effects backend on a representative scene before the long render.
  await renderStill({serveUrl,composition,frame:4130,scale:.5,output:'.qa/final-render-preflight.png',puppeteerInstance:browser,logLevel:'error'});
  const meta={composition:composition.id,width:1920,height:1080,fps:60,frames:composition.durationInFrames,durationSeconds:composition.durationInFrames/60,codec:'h264',videoEncoder:'h264_nvenc',hardwareAcceleration:'required',graphicsBackend:'vulkan',videoBitrate:'20M',audioCodec:'aac',audioBitrate:'320k',sampleRate:48000,pixelFormat:'yuv420p',concurrency:4,gitCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),stickers:JSON.parse(fs.readFileSync('src/stickers/plan.json')).length,musicBreak:JSON.parse(fs.readFileSync('master-timeline.json')).musicBreak,startedAt:new Date(started).toISOString()};
  fs.writeFileSync('out/voices38-final-1080p.json',JSON.stringify(meta,null,2)+'\n');
  let last=0;
  await renderMedia({serveUrl,composition,outputLocation:output,codec:'h264',hardwareAcceleration:'required',videoBitrate:'20M',pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'320k',sampleRate:48000,concurrency:4,puppeteerInstance:browser,mediaCacheSizeInBytes:1024*1024*1024,offthreadVideoCacheSizeInBytes:512*1024*1024,offthreadVideoThreads:2,logLevel:'error',overwrite:true,onProgress:p=>{
   if(Date.now()-last>15000||p.progress===1){last=Date.now();report({stage:p.stitchStage||'render',renderedFrames:p.renderedFrames,encodedFrames:p.encodedFrames,totalFrames:composition.durationInFrames,percent:Math.round(p.progress*1000)/10});}
  }});
  meta.bytes=fs.statSync(output).size;const hash=createHash('sha256');for await(const chunk of fs.createReadStream(output))hash.update(chunk);meta.sha256=hash.digest('hex');meta.completedAt=new Date().toISOString();
  fs.writeFileSync('out/voices38-final-1080p.json',JSON.stringify(meta,null,2)+'\n');
  report({stage:'complete',output,bytes:meta.bytes,percent:100});
 }finally{await browser.close({silent:true});}
})().catch(e=>{
 console.error(e);fs.mkdirSync('.qa',{recursive:true});fs.writeFileSync('.qa/final-render-error.txt',e.stack||String(e));
 fs.writeFileSync('.qa/final-render-progress.json',JSON.stringify({stage:'error',message:String(e),updatedAt:new Date().toISOString()},null,2));process.exit(1);
});
