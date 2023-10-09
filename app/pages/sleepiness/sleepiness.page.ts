import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { sleepDataInterface, StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  sleepinessTime: Date;
  levelOfSleepiness: number;
  recentAddedData: StanfordSleepinessData;
  sleepinessDataLog: StanfordSleepinessData[] = [];
  summaryString: string;
  dateString: string;
  settedLevelOfSleepiness: number;


  constructor(private sleepService:SleepService, private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
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
        this.sleepService.logSleepinessData(sleepData);
      }
      // now change the attribute of the sleep service
      this.sleepinessDataLog = stanfordSleepArr;
    } else {
      // get default data
      this.sleepinessDataLog = SleepService.AllSleepinessData;
    }
    this.recentAddedData = this.sleepinessDataLog[this.sleepinessDataLog.length - 1];
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'No Selection',
      message: 'Please choose one of the sleepiness level',
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

    console.log(this.sleepinessTime);

    if(this.levelOfSleepiness === undefined){
      console.log(this.presentAlert());
      return;
    }

    let newSleepinessData: StanfordSleepinessData = new StanfordSleepinessData(this.levelOfSleepiness, this.sleepinessTime);
    this.sleepService.logSleepinessData(newSleepinessData);
    this.recentAddedData = this.sleepinessDataLog[this.sleepinessDataLog.length - 1];
    this.summaryString = this.recentAddedData.summaryString();
    this.dateString = this.recentAddedData.dateString();
    this.settedLevelOfSleepiness = this.recentAddedData.getLoggedValue();

    // convert the sleepinessDataLog into a JSON string to store in a cookie
    // sleepinessDataLog should have the new data already
    const sleepData = this.sleepinessDataLog.map((sleepData) => {
      return {
        loggedValue: sleepData.getLoggedValue(),
        loggedAt: JSON.stringify(sleepData.getLoggedAt())
      }
    })

    // convert the array into a JSON string to save in the cookie
    const sleepJSONString = JSON.stringify(sleepData);
    // save in the cookie
    localStorage.setItem("sleepData", sleepJSONString);

    console.log(this.presentToast());

  }



}
