import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { ExerciseComponent } from './components/exercise/exercise.component';

const routes: Routes = [
	{ path: '', component: LandingComponent, pathMatch: 'full' },
	{ path: 'exercise', component: ExerciseComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
