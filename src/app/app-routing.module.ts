import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { HomepageComponent } from './homepage/homepage.component';



const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full', component: HomepageComponent},  // this is how to set up the default page
  {path: 'admin', component: AdminComponent },
    //Keep this path last since it is PageNotFound
  {path: '**', component: PageNotFoundComponent} //Setup for if URL does not match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

