import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher.model';

@Component({
  selector: 'app-teacher-delete',
  templateUrl: './teacher-delete.component.html',
  styleUrls: ['./teacher-delete.component.css']
  
})
export class TeacherDeleteComponent implements OnInit {

  teacher: any = {}; 

  constructor(private TeacherService: TeacherService, 
    private Router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
    this.TeacherService.readById(id).subscribe(teacher => {
      this.teacher = teacher
    })
  }

  deleteTeacher(): void {
    debugger 
    this.teacher.ativo = !this.teacher.ativo;
  this.TeacherService.update(this.teacher).subscribe(() => {
    this.TeacherService.showMessage('Usario exluido com sucesso!')
    this.Router.navigate(['/teachers']);
  });
  }

  cancel(): void {
    this.Router.navigate(['/teachers']);
  }

}
