import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewSitesPage } from './review-sites.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewSitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewSitesPageRoutingModule {}
