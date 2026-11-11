// Exercise the real Studio route, with WebGL deliberately unavailable.
// This is a preview check, not a final video export or a visible browser launch.
const {openBrowser}=require('@remotion/renderer');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/google-chrome-stable',chromiumOptions:{headless:true}});
  const errors=[];
  try{
    const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:(log)=>{
      if(log.type==='error')errors.push(log.text);
    },onLog:()=>{}});
    await page.setViewport({width:1600,height:1100,deviceScaleFactor:1});
    await page.evaluateOnNewDocument(()=>{
      const original=HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext=function(type,...args){
        if(['webgl','webgl2','experimental-webgl'].includes(type))return null;
        return original.call(this,type,...args);
      };
    });
    for(const [id,frames] of [['V38Act2',[4343,4504,4650,0,4759]],['V38Full',[8640]]]){
      await page.goto({url:`http://localhost:3018/${id}`,timeout:30000,options:{waitUntil:'load'}});
      for(let i=0;i<100;i++){
        if(await page.evaluate(()=>typeof window.remotion_setFrame==='function'))break;
        await new Promise(r=>setTimeout(r,100));
      }
      for(const frame of frames){
        await page.evaluate((frame,id)=>window.remotion_setFrame(frame,id,0),frame,id);
        if(frame===0){await new Promise(r=>setTimeout(r,150));continue;}
        let observed;
        for(let i=0;i<100;i++){
          observed=await page.evaluate(()=>{
            const svg=document.querySelector('[data-v38-protection-cube]');
            if(!svg)return null;
            const rect=svg.getBoundingClientRect();
            return {count:svg.querySelectorAll('[data-cube-layer]').length,
              probe:svg.querySelector('[data-cube-probe]')?.getAttribute('data-cube-probe'),
              hasWebGLCanvas:!!svg.parentElement.querySelector('canvas[data-engine]'),
              clip:{x:rect.x+scrollX,y:rect.y+scrollY,width:rect.width,height:rect.height,scale:1}};
          });
          if(observed?.count===18)break;
          await new Promise(r=>setTimeout(r,100));
        }
        assert.equal(observed?.count,18,'All three cubes must be present in Studio');
        assert.equal(observed.hasWebGLCanvas,false,'Cube preview must not depend on WebGL');
        await page.evaluate(()=>document.fonts.ready.then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))));
        const shot=await page._client().send('Page.captureScreenshot',{format:'png',clip:observed.clip});
        fs.mkdirSync('.qa',{recursive:true});
        fs.writeFileSync(`.qa/studio-cube-${id}-${frame}.png`,Buffer.from(shot.value.data,'base64'));
        console.log('CHECKED Studio without WebGL',id,frame,observed.probe);
      }
    }
    assert.equal(errors.length,0,errors.join('\n'));
    console.log('PASS: live Studio scrubbing, re-entry and Full preview without WebGL');
  }finally{await browser.close({silent:true});}
})().catch(e=>{console.error(e);process.exit(1)});
