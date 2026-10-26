// SPDX-License-Identifier: GPL-3.0-only
// Semantic matching uses only voices actually installed in the selected library.
export function lessonSound(lesson,patches,indices){
 const recipe=lesson.soundRecipe||(/scale|chord|theory|piano|bach|mozart/i.test(lesson.group+' '+lesson.name)?5:4);
 const groups={1:[/syn.*bass|bass.*syn/i,/bass/i],2:[/syn.*lead|lead.*syn|moog/i,/lead|brass/i],3:[/syn.*pad|pad/i,/string|voice|choir/i],4:[/pluck|clav|harpsi|marimba|kalimba/i,/guitar|piano|bell/i],5:[/piano|harpsi/i,/clav|guitar/i],6:[/e[. ]*piano|epiano|piano/i,/organ|clav/i],7:[/syn.*lead|lead.*syn/i,/lead|brass/i],8:[/harpsi|clav|piano/i,/marimba|guitar/i]};
 const available=[...new Set(indices)].filter(i=>patches[i]);const patterns=groups[recipe]||groups[5];
 let pool=[];for(const pattern of patterns){pool=available.filter(i=>pattern.test(patches[i].name));if(pool.length)break;}if(!pool.length)pool=available;
 if(!pool.length)return null;
 const seed=[...(lesson.style||lesson.group||'')].reduce((n,c)=>n+c.charCodeAt(0),0),track=lesson.trackNumber||[...lesson.id].reduce((n,c)=>n+c.charCodeAt(0),0);
 const index=pool[(seed+track-1)%pool.length];return {index,name:patches[index].name,recipe};
}
