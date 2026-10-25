import{test}from'node:test';import assert from'node:assert/strict';import{PresetPicker}from'../docs/play/preset-picker.js';
const patches=Array.from({length:20},(_,i)=>({name:'Patch '+i}));
test('shows three neighbors before and after the selected patch',()=>{const p=new PresetPicker();p.show(patches,8,0);assert.deepEqual(p.neighbors().map(r=>r.index),[5,6,7,8,9,10,11]);assert.equal(p.neighbors()[3].selected,true)});
test('closes precisely after five seconds of idle',()=>{const p=new PresetPicker();p.show(patches,0,100);assert.equal(p.visible(5099),true);assert.equal(p.visible(5100),false)});
test('turning the knob, note presses and releases restart the five second timer',()=>{const p=new PresetPicker();p.show(patches,5,0);p.activity(4000);assert.equal(p.visible(8000),true);p.activity(8000);assert.equal(p.visible(12999),true);assert.equal(p.visible(13000),false)});
test('holding a key keeps the list visible until five seconds after release',()=>{const p=new PresetPicker();p.show(patches,2,0);p.activity(1000);assert.equal(p.visible(25000,true),true);p.activity(25000);assert.equal(p.visible(29999,false),true);assert.equal(p.visible(30000,false),false)});
test('playing keys after dismissal does not reopen the list',()=>{const p=new PresetPicker();p.show(patches,2,0);assert.equal(p.visible(5000),false);p.activity(6000);assert.equal(p.visible(6001),false)});
