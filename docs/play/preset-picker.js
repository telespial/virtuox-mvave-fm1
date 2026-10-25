// SPDX-License-Identifier: GPL-3.0-only
export class PresetPicker {
 constructor(timeout=5000){this.timeout=timeout;this.open=false;this.deadline=0;this.items=[];this.position=0;}
 show(items,position,time){this.items=items;this.position=position;this.open=true;this.deadline=time+this.timeout;}
 activity(time){if(this.open)this.deadline=time+this.timeout;}
 visible(time,held=false){if(!this.open)return false;if(held)return true;if(time>=this.deadline){this.open=false;return false}return true;}
 neighbors(radius=3){const out=[];for(let offset=-radius;offset<=radius;offset++){const index=this.position+offset;if(index>=0&&index<this.items.length)out.push({offset,index,item:this.items[index],selected:offset===0})}return out;}
 close(){this.open=false;}
}
