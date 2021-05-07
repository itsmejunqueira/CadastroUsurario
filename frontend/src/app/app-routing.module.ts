import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCrudComponent } from './views/user-crud/user-crud.component';
import { HomeComponent } from './views/home/home.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { TeacherCrudComponent } from './views/teacher-crud/teacher-crud.component';
import { TeacherUpdateComponent } from './components/teacher/teacher-update/teacher-update.component';
import { TeacherCreateComponent } from './components/teacher/teacher-create/teacher-create.component';
import { TeacherDeleteComponent } from './components/teacher/teacher-delete/teacher-delete.component';
import { TeacherBioComponent } from './components/teacher/teacher-bio/teacher-bio.component';

  const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "users",
    component: UserCrudComponent
  },
  {
    path: "users/create",
    component: UserCreateComponent
  },
  {
    path: "users/update/:id",
    component: UserUpdateComponent
  },
  {
    path: "users/delete/:id",
    component: UserDeleteComponent
  },   
  {
    path: "teachers",
    component: TeacherCrudComponent
  },
  {
    path: "teachers/create",
    component: TeacherCreateComponent
  },
  {
    path: "teachers/update/:id",
    component: TeacherUpdateComponent
  },
  {
    path: "teachers/delete/:id",
    component: TeacherDeleteComponent
  },  
  {
    path: "teachers/bio/:id",
    component: TeacherBioComponent
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
