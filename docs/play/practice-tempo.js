// SPDX-License-Identifier: GPL-3.0-only
// One relative speed setting; original catalog/MIDI BPM is never overwritten.
export const tempoPercent=value=>Math.max(25,Math.min(200,Math.round(Number(value)||100)));
export const lessonTempo=(lesson,percent=100)=>Math.max(1,Math.round((Number(lesson.bpm)||80)*tempoPercent(percent)/100));
export const tempoOffsetLabel=percent=>{const offset=tempoPercent(percent)-100;return (offset>0?'+':'')+offset+'%';};
