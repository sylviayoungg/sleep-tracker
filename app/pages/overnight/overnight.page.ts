import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { overNightSleepInterface, OvernightSleepData  } from '../../data/overnight-sleep-data';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})
export class OvernightPage implements OnInit {
  startDayTime: Date;
  endDayTime: Date;
  lastAdded: OvernightSleepData;
  overNightLog: OvernightSleepData[];
  recentOverNightLog: OvernightSleepData;
  startNight: string;
  recentTotalSleepHours: string;

  constructor(private sleepService:SleepService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    let overNightSleep = localStorage.getItem("overNightData");
    if(overNightSleep){
      const overNightArr: OvernightSleepData[] = [];
      // sleep should look like an array of sleepDataInterface but the dates are stringified date objects
      const sleepArr: Array<{
        sleepStart: string,
        sleepEnd: string
      }> = JSON.parse(overNightSleep);
      for (const entry of sleepArr) {
        //generate sleepDataInterface object

        const sleepDataObj: overNightSleepInterface = {
          sleepStart: new Date(JSON.parse(entry.sleepStart)),
          sleepEnd: new Date(JSON.parse(entry.sleepEnd))
        }
        const sleepData = new OvernightSleepData(sleepDataObj.sleepStart, sleepDataObj.sleepEnd);

        // add to array and to sleep service
        overNightArr.push(sleepData);
        this.sleepService.logOvernightData(sleepData);
      }
      // now change the attribute of the sleep service
      this.overNightLog = overNightArr;

    }else{
      this.overNightLog = SleepService.AllOvernightData;
    }
    this.overNightLog = SleepService.AllOvernightData;
    this.recentOverNightLog = this.overNightLog[this.overNightLog.length-1];
    this.lastAdded = this.overNightLog[this.overNightLog.length-1];
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Wrong Time Set',
      message: 'Please Reenter',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Added!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

  addNewDataClick(){
    console.log(this.startDayTime);
    console.log(this.endDayTime);

    let newOverNightDate:OvernightSleepData = new OvernightSleepData(this.startDayTime, this.endDayTime);
    console.log(newOverNightDate);
    if (newOverNightDate.checkTimeDifferenceIsNegative() < 0) {
      console.log(this.presentAlert());
      return;
    }

    this.sleepService.logOvernightData(newOverNightDate);
    this.lastAdded = newOverNightDate;
    this.recentOverNightLog = this.overNightLog[this.overNightLog.length-1];

    const sleepData = this.overNightLog.map((sleepData) => {
      return {
        sleepStart: JSON.stringify(sleepData.getSleepStart()),
        sleepEnd: JSON.stringify(sleepData.getSleepEnd())
      }
    })

    // convert the array into a JSON string to save in the cookie
    const sleepJSONString = JSON.stringify(sleepData);
    // save in the cookie
    localStorage.setItem("overNightData", sleepJSONString);

    this.startNight = this.lastAdded.dateString();
    //console.log(this.startNight);
    this.recentTotalSleepHours = this.lastAdded.summaryString();
    //console.log(this.recentTotalSleepHours);

    console.log(this.presentToast());

  }

}
