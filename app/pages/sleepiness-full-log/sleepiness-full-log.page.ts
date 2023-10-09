import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { sleepDataInterface, StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness-full-log',
  templateUrl: './sleepiness-full-log.page.html',
  styleUrls: ['./sleepiness-full-log.page.scss'],
})
export class SleepinessFullLogPage implements OnInit {
  fullSleepinessLog: StanfordSleepinessData[] = [];
  dateString: string[] = [];
  levelOfSleepinessString: string[] = [];

  constructor() { }

  ngOnInit() {
    // try to get data from cookie

    // retrieve a cookie for previous data
    let sleep = localStorage.getItem("sleepData");
    
    // if there is existing data, convert to sleep data
    if (sleep) {
      const stanfordSleepArr: StanfordSleepinessData[] = [];
      // sleep should look like an array of sleepDataInterface but the dates are stringified date objects
      const sleepArr: Array<{
        loggedValue: string,
        loggedAt: string
      }> = JSON.parse(sleep);
      for (const entry of sleepArr) {

        // convert from string to number
        const dateInt = parseInt(entry.loggedValue);
        if (isNaN(dateInt)) {
          console.log(entry.loggedValue, "is not a number")
          continue;
        }

        // generate sleepDataInterface object
        const sleepDataObj: sleepDataInterface = {
          loggedValue: dateInt,
          loggedAt: new Date(JSON.parse(entry.loggedAt))
        }

        const sleepData = new StanfordSleepinessData(sleepDataObj.loggedValue, sleepDataObj.loggedAt);

        // add to array and to sleep service
        stanfordSleepArr.push(sleepData);
      }
      // now change the attribute of the sleep service
      this.fullSleepinessLog = stanfordSleepArr;
    } else {
      this.fullSleepinessLog = SleepService.AllSleepinessData;
    }
    let index = 0;
    while(index < this.fullSleepinessLog.length){
      this.dateString.push(this.fullSleepinessLog[index].dateString());
      this.levelOfSleepinessString.push(this.fullSleepinessLog[index].summaryString());
      index++;
    }
  }

}
