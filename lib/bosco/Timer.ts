
module bosco.utils {

	export class Timer {
	
		private delay:number;
		private repeat:boolean;
		private acc:number;
		private done:boolean;
		private stopped:boolean;
		
		constructor(delay:number, repeat:boolean=false) {
			this.delay = delay;
			this.repeat = repeat;
			this.acc = 0;
		}
	
		public update(delta:number) {
			if (!this.done && !this.stopped) {
				this.acc += delta;
	
				if (this.acc >= this.delay) {
					this.acc -= this.delay;
	
					if (this.repeat) {
						this.reset();
					} else {
						this.done = true;
					}
	
					this.execute();
				}
			}
		}
	
		public reset() {
			this.stopped = false;
			this.done = false;
			this.acc = 0;
		}
	
		public isDone():boolean {
			return this.done;
		}
	
		public isRunning():boolean {
			return !this.done && this.acc < this.delay && !this.stopped;
		}
	
		public stop() {
			this.stopped = true;
		}
	
		public setDelay(delay:number) {
			this.delay = delay;
		}
	
		public execute = () => {}
	
		public getPercentageRemaining():number {
			if (this.done)
				return 100;
			else if (this.stopped)
				return 0;
			else
				return 1 - (this.delay - this.acc) / this.delay;
		}
	
		public getDelay():number {
			return this.delay;
		}
	
	}
}
/**
 * Timer.ts from Artemis: Copyright 2011, 2013 GAMADU.COM. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list of
 conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this list
 of conditions and the following disclaimer in the documentation and/or other materials
 provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY GAMADU.COM ``AS IS'' AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GAMADU.COM OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those of the
 authors and should not be interpreted as representing official policies, either expressed
 or implied, of GAMADU.COM.
 */

