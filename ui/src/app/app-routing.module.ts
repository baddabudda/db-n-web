import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './components/subject/subject.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path:"", redirectTo:"welcome", pathMatch: 'full'},
  {path:"welcome", component:WelcomeComponent},
  {path:"subject", component:SubjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
