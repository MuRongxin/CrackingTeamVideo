const {spawnSync}=require('node:child_process');
const path=require('node:path');
const shots=process.argv.slice(2).length?process.argv.slice(2):Array.from({length:11},(_,i)=>i+1);
const result=spawnSync(process.execPath,[path.join(__dirname,'check-current.cjs'),...shots.map(n=>`1:${n}`)],{stdio:'inherit'});
process.exit(result.status??1);
