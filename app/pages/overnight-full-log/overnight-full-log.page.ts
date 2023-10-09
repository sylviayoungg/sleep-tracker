import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { overNightSleepInterface, OvernightSleepData  } from '../../data/overnight-sleep-data';


@Component({
  selector: 'app-overnight-full-log',
  templateUrl: './overnight-full-log.page.html',
  styleUrls: ['./overnight-full-log.page.scss'],
})
export class OvernightFullLogPage implements OnInit {
  fullOvernightLog: OvernightSleepData[] = [];
  dayString: string[] = [];
  timeString: string[] = [];
  range:string;


  constructor(private sleepService: SleepService) { }

  ngOnInit() {
    let sleep = localStorage.getItem("overNightData");
    
    // if there is existing data, convert to sleep data
    if (sleep) {
      const overNightArr: OvernightSleepData[] = [];
      // sleep should look like an array of sleepDataInterface but the dates are stringified date objects
      const sleepArr: Array<{
        sleepStart: string,
        sleepEnd: string
      }> = JSON.parse(sleep);
      for (const entry of sleepArr) {

        // generate sleepDataInterface object
        const sleepDataObj: overNightSleepInterface = {
          sleepStart: new Date(JSON.parse(entry.sleepStart)),
          sleepEnd: new Date(JSON.parse(entry.sleepEnd))
        }

        const sleepData = new OvernightSleepData(sleepDataObj.sleepStart, sleepDataObj.sleepEnd);

        // add to array and to sleep service
        overNightArr.push(sleepData);
      }
      // now change the attribute of the sleep service
      this.fullOvernightLog = overNightArr;
    } else {
      this.fullOvernightLog = SleepService.AllOvernightData;
    }
    let index = 0;
    while(index < this.fullOvernightLog.length){
      this.dayString.push(this.fullOvernightLog[index].dateString());
      this.timeString.push(this.fullOvernightLog[index].summaryString());
      index++;
    }
  }


}
