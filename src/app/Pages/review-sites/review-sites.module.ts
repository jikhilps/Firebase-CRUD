import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewSitesPageRoutingModule } from './review-sites-routing.module';

import { ReviewSitesPage } from './review-sites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewSitesPageRoutingModule
  ],
  declarations: [ReviewSitesPage]
})
export class ReviewSitesPageModule {}
