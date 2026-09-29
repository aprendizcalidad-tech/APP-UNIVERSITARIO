/* Shared 720 × 405 certificate composition. No external font or image requests. */
const UC_CERTIFICATE={
 layout(c){
  const fit=(value,max,width,lines=1,height=999)=>{const text=String(value||'');let size=max;while(size>7){const capacity=width/(size*.57);let count=1,used=0;for(const word of text.split(/\s+/)){if(word.length>capacity){count+=Math.ceil(word.length/capacity)-1;used=word.length%capacity;}else if(used+word.length+1>capacity){count++;used=word.length;}else used+=word.length+1;}if(count<=lines&&count*size*1.18<=height-6)break;size-=.5;}return size;};
  const box=(id,text,x,y,w,h,size,font='Arial',color='#1c2a40',bold=false)=>({id,text:String(text||''),x,y,w,h,size,font,color,bold});
  const issuer=c.company||'Universidad Corporativa',name=c.name||'Nombre del participante',title=c.title||'Nombre del curso',signer=c.signer||'Dirección de Gestión Humana';
  return [
   box('brand','UNIVERSIDAD CORPORATIVA',200,33,320,16,11,'Arial','#1c2a40',true),
   box('company',issuer,205,50,310,22,fit(issuer,10,300,2,22),'Arial','#677181'),
   box('eyebrow','CERTIFICADO DE',170,85,380,20,13,'Georgia','#9b7a3b'),
   box('heading','APROBACIÓN',110,105,500,46,34,'Georgia','#1c2a40',true),
   box('intro','Se otorga a',170,154,380,18,10,'Arial','#677181'),
   box('name',name,110,176,500,47,fit(name,29,475,2,47),'Georgia','#957236'),
   box('body','Por completar y aprobar satisfactoriamente '+(c.routeId?'la ruta de aprendizaje':'el curso'),100,229,520,18,10,'Arial','#677181'),
   box('title',title,110,251,500,39,fit(title,18,470,2,39),'Georgia','#1c2a40',true),
   box('details',String(c.hours)+' horas  ·  Fecha de aprobación: '+String(c.date||'').slice(0,10),150,295,420,18,9,'Arial','#677181'),
   box('signer',signer,118,332,205,30,fit(signer,9,195,2,30),'Arial','#1c2a40',true),
   box('signer-role','Responsable de formación',118,363,205,12,7.5,'Arial','#677181'),
   box('verification','VERIFICACIÓN DIGITAL',375,332,173,14,8,'Arial','#957236',true),
   box('code',c.code||'VISTA PREVIA',370,349,178,13,7,'Arial','#1c2a40'),
   {...box('link','Verificar autenticidad',370,366,163,13,7.5,'Arial','#677181'),link:/^https:\/\//.test(c.portalUrl||'')?c.portalUrl.replace(/#.*$/,'')+'#verificar/'+encodeURIComponent(c.code||''):''}
  ];
 }
};
