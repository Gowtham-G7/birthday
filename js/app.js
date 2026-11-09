const $ = (s, root=document) => root.querySelector(s);
const config = window.BIRTHDAY_CONFIG || {herName:"My Love",letter:"Happy birthday, my love."};
["#herNameTitle","#herNameLetter","#herNameFinal"].forEach(sel=>{const el=$(sel);if(el)el.textContent=config.herName;});
const letterText=$("#letterText"); if(letterText)letterText.textContent=config.letter;
const page=document.body.dataset.page;
if(page==="home"){ $("#openGift")?.addEventListener("click",()=>{location.href="memories.html";}); }
if(page==="memories"){
 const input=$("#photoInput"), grid=$("#memoryGrid"), key="birthdayMemories";
 let photos=[]; try{photos=JSON.parse(localStorage.getItem(key)||"[]")}catch(e){}
 if(!photos.length && Array.isArray(config.photos)){photos=config.photos.map(src=>({src,caption:""}));}
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(photos))}catch(e){alert("These photos are too large for your browser storage. Try fewer or smaller images.");}};
 const render=()=>{grid.innerHTML="";if(!photos.length){grid.innerHTML='<div class="empty-state"><div class="empty-icon">♡</div><b>Your memories will live here</b><p>Upload your favourite photos to make this page yours.</p></div>';return;}
 photos.forEach((p,i)=>{const card=document.createElement("div");card.className="memory-card";card.style.setProperty("--tilt",`${(i%3-1)*2}deg`);const img=document.createElement("img");img.src=p.src;img.alt=p.caption||"A favourite memory";const remove=document.createElement("button");remove.className="remove-photo";remove.textContent="×";remove.title="Remove photo";remove.onclick=()=>{photos.splice(i,1);save();render();};const cap=document.createElement("input");cap.value=p.caption||"";cap.placeholder="Write a little caption…";cap.maxLength=70;cap.onchange=()=>{photos[i].caption=cap.value;save();};card.append(img,remove,cap);grid.append(card);});};
 input.addEventListener("change",async()=>{const files=[...input.files].filter(f=>f.type.startsWith("image/"));for(const file of files.slice(0,Math.max(0,12-photos.length))){const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});photos.push({src:data,caption:""});}save();render();input.value="";});
 $("#clearPhotos").addEventListener("click",()=>{if(confirm("Clear all photos from this gallery?")){photos=[];save();render();}});render();
}
if(page==="letter"){
 const envelope=$("#envelope"), card=$("#letterCard");envelope.addEventListener("click",()=>{envelope.classList.add("open");setTimeout(()=>{card.classList.add("visible");card.scrollIntoView({behavior:"smooth",block:"center"});},450);});
}
if(page==="finale"){
 const candles=[...document.querySelectorAll(".candle")], hint=$("#wishHint"), message=$("#finalMessage");
 const celebrate=()=>{const layer=$("#confettiLayer");const symbols=["♥","✦","●","★"];for(let i=0;i<90;i++){const el=document.createElement("span");el.className="confetti";el.textContent=symbols[Math.floor(Math.random()*symbols.length)];el.style.left=Math.random()*100+"%";el.style.animationDelay=Math.random()*1.3+"s";el.style.color=["#e58eaa","#c9a8df","#f4c46c","#9acdb3"][i%4];el.style.fontSize=(9+Math.random()*14)+"px";layer.append(el);setTimeout(()=>el.remove(),5000);}};
 candles.forEach(c=>c.addEventListener("click",()=>{if(c.classList.contains("out"))return;c.classList.add("out");if(candles.every(x=>x.classList.contains("out"))){hint.textContent="Your wish is on its way… 💫";message.classList.add("show");celebrate();}}));
 $("#celebrateBtn").addEventListener("click",celebrate);
}
