import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

// Services
import { ApplicationService } from '../services/application.service';

// Models
import { Application } from '../models/application';

// Components
import { StandardLayoutComponent } from '../layouts/standard-layout.component';
import { ApplianceDetailComponent } from '../components/appliance-detail.component';
import { ProtectedDirective } from '../directives/loggedinrouter.directive';

@Component({
   selector: 'appliance-detail-page',
   templateUrl: 'app/pages/appliance-detail.page.component.html',
   styleUrls: ['app/pages/appliance-detail.page.component.css'],
   inputs: ['appliance'],
   directives: [StandardLayoutComponent, ApplianceDetailComponent, ProtectedDirective],
   host: {'class' : 'ng-animate pageLoadAnimation'}
})
export class ApplianceDetailPageComponent implements OnInit {
   application: Application;

   constructor(
      private _applicationService: ApplicationService,
      private _routeParams: RouteParams) {
   }

   ngOnInit() {
      let slug = this._routeParams.get('slug');
      this._applicationService.getApplication(slug)
         .subscribe(application => this.application = application);
   }

}
