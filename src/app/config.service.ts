import { Injectable } from "@angular/core";
import {AngularFireDatabase} from '@angular/fire/database';
import {Item} from './datatypes/item';
import {Config} from './datatypes/config';

@Injectable()
export class ConfigService {

  vConfiguration: Config;

  constructor(public fb: AngularFireDatabase){

  }


  getABN() {
    return this.vConfiguration.ABN;
  }

  getCompanyName() {
    return this.vConfiguration.companyName;
  }

  getFeedbackEmail() {
    return this.vConfiguration.feedbackEmail;
  }

  getChargeFunctionUrl() {
    return this.vConfiguration.chargeFunctionUrl;
  }

  getChargeWithCreditCardFunctionUrl() {
    return this.vConfiguration.chargeWithCreditCardFunctionUrl;
  }

  getCustomerFunctionUrl() {
    return this.vConfiguration.customerFunctionUrl;
  }

  getStripeKey() {
    return this.vConfiguration.stripeKey;
  }

  getMailgunApiKey() {
    return this.vConfiguration.mailgunApiKey;
  }

  getMailgunUrl() {
    return this.vConfiguration.mailgunUrl;
  }

  getShareAppUrl() {
    return this.vConfiguration.shareAppUrl;
  }

  setConfig() {

    this.fb.object<Config>('/Configuration').valueChanges()
      .subscribe((x)=>{
        this.vConfiguration = x
      })
  }
}
