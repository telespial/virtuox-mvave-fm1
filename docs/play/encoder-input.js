// SPDX-License-Identifier: GPL-3.0-only
export function rotationDelta(previous,current){let delta=current-previous;while(delta>Math.PI)delta-=Math.PI*2;while(delta<-Math.PI)delta+=Math.PI*2;return delta;}
// Screen coordinates: increasing atan2 angle is clockwise.
export class RotaryGesture{
 constructor(x,y,cx,cy,radius){Object.assign(this,{x,y,cx,cy});this.circular=Math.hypot(x-cx,y-cy)>radius*.28;this.angle=Math.atan2(y-cy,x-cx);this.acc=0;}
 move(x,y){if(this.circular){const angle=Math.atan2(y-this.cy,x-this.cx);this.acc+=rotationDelta(this.angle,angle)*180/Math.PI;this.angle=angle;}else this.acc+=(x-this.x)+(this.y-y);this.x=x;this.y=y;const step=this.circular?18:8,n=Math.trunc(this.acc/step);this.acc-=n*step;return n;}
}
