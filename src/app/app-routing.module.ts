import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component'
const routes: Routes = [
	{ 
		path: '',
		children:[ 
			{ path: '', redirectTo: 'query', pathMatch: 'full'  },
			{ path: 'query', component: UserProfileComponent }
		]
	},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}