import { HeaderService } from '../../components/template/header/header.service';
import { Teacher } from '../../components/teacher/teacher.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-teacher-crud',
  templateUrl: './teacher-crud.component.html',
  styleUrls: ['./teacher-crud.component.css'
  ]
})

export class TeacherCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de professor',
      icon: 'person_pin',
      routerUrl: '/teachers'
    }
  }
  ngOnInit(): void {
  }


  navigateToTeacherCreate(): void {
    this.router.navigate(['/teachers/create'])
  }
}


