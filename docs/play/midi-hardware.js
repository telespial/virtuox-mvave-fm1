// SPDX-License-Identifier: GPL-3.0-only
import {createVoiceSysex,parseSysex} from './engine/src/sysex.js';
export function hardwareVoiceMessage(profile,data,{channel=1}={}){
 if(profile!=='stock-v16')throw Error('Select M-VAVE stock V16. Unsupported firmware is not sent patches.');
 if(!Number.isInteger(channel)||channel<1||channel>16)throw Error('MIDI channel must be 1–16');
 return createVoiceSysex(data,{channel:channel-1});
}
export class HardwareLink{
 constructor(log=()=>{}){this.log=log;this.output=null;this.inputId='';}
 setPorts(output,inputId){this.output=output;this.inputId=inputId;}
 async send(profile,data,options={}){
  if(!this.output)throw Error('Select the actual FM-1 output port');
  const message=hardwareVoiceMessage(profile,data,options);parseSysex(message);this.output.send(message);
  this.log('Patch sent to the stock V16 edit buffer. Delivery is unacknowledged. Open OSC → SAVE → Preset on the FM-1 to store it. Browser FX are not part of this DX7 file.');
  return {acknowledged:false};
 }
}
