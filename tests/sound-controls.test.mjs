import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Instrument} from '../docs/play/audio-engine.js';
import {voiceToPreset} from '../docs/play/engine/src/preset.js';
import {createInitVoice} from '../docs/play/engine/src/sysex.js';
test('DX7 envelope display follows an audible carrier and edits reach exported voice parameters',async()=>{const i=new Instrument();i.fmPreset=voiceToPreset(createInitVoice());i.fmPreset.algorithm=0;i.fmPreset.operators[1].envelope.rates[0]=20;i.fmPreset.operators[3].envelope.rates[0]=70;i.fm={setPreset:async()=>{}};assert.equal(i.envelopeValue(0),20);await i.envelope(0,63);assert.equal(i.fmPreset.operators[3].envelope.rates[0],63);assert.equal(i.fmPreset.operators[1].envelope.rates[0],63);assert.equal(voiceToPreset(i.voiceBytes()).operators[3].envelope.rates[0],63);});
test('analog LFO routes modulation to pitch, filter or both',()=>{const param=()=>({value:0,setTargetAtTime(v){this.value=v}});const i=new Instrument();i.kind='Analog';i.ac={currentTime:0};i.vib={frequency:param()};i.vibDepth={gain:param()};i.vibFilterDepth={gain:param()};i.lfo.depth=30;for(const target of [0,1,2]){i.lfo.target=target;i.updateLFO();assert.equal(i.vibDepth.gain.value>0,target!==1);assert.equal(i.vibFilterDepth.gain.value>0,target!==0);}});
