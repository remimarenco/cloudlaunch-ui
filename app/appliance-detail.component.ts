import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Appliance } from './appliance';
import { ApplianceService } from './appliance.service';

@Component({
  selector: 'appliance-detail',
  templateUrl: 'app/appliance-detail.component.html',
  styleUrls: ['app/appliance-detail.component.css'],
  inputs: ['appliance']
})
export class ApplianceDetailComponent implements OnInit{
  appliance: Appliance;

  constructor(
    private _applianceService: ApplianceService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._applianceService.getAppliance(id)
      .then(appliance => this.appliance = appliance);
  }

  goBack() {
    window.history.back();
  }

}
