import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SubmissionForm1Component } from './submission-form1/submission-form1.component';
import { SubmissionForm2Component } from './submission-form2/submission-form2.component';
import { SubmissionForm3Component } from './submission-form3/submission-form3.component';
import { SubmissionForm4Component } from './submission-form4/submission-form4.component';



const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full', component: SubmissionForm1Component},  // this is how to set up the default page
  // {path: '', redirectTo: '', pathMatch: 'full', component: HomepageComponent},  // this is how to set up the default page

  // {path: 'baltimore', component: SubmissionForm1Component },
  {path: 'admin', component: AdminComponent },
  {path: 'komen', component: SubmissionForm2Component },
  {path: 'uvavsduke', component: SubmissionForm3Component },
  //{path: 'statefair', component: SubmissionForm4Component },

    //Keep this path last since it is PageNotFound
  {path: '**', component: PageNotFoundComponent} //Setup for if URL does not match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const routingComponents = [
//   HomepageComponent,
//   AdminComponent,
//   PageNotFoundComponent,
//   SubmissionForm1Component
// ];
