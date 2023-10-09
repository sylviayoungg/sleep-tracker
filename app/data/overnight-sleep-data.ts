import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date = new Date(), sleepEnd:Date = new Date()) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	getSleepStart(){
		return this.sleepStart;
	}

	getSleepEnd(){
		return this.sleepEnd;
	}

	public checkTimeDifferenceIsNegative():number {
		var sleepStart_ms = new Date (this.sleepStart);
		var sleepEnd_ms = new Date (this.sleepEnd);
		//console.log(sleepEnd_ms);

		var difference_ms = sleepEnd_ms.getTime() - sleepStart_ms.getTime();
		//console.log(difference_ms);

		return difference_ms;
	}

	override summaryString():string {
		var sleepStart_ms = new Date (this.sleepStart);
		var sleepEnd_ms = new Date (this.sleepEnd);

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms.getTime() - sleepStart_ms.getTime();
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	override dateString():string {
		let sleepStartDay = new Date (this.sleepStart);
		return "Night of " + sleepStartDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}

export interface overNightSleepInterface {
	sleepStart: Date,
	sleepEnd: Date
}
