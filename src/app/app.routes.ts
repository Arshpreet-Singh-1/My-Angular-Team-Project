import { Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

export const routes: Routes = [
    { path: 'members' , component: MembersComponent},
    { path: 'dashboard' , component: DashboardComponent},
    { path: 'detail/:id' , component: MemberDetailComponent},
    { path: '' , redirectTo: '/dashboard' , pathMatch: 'full'}
];
