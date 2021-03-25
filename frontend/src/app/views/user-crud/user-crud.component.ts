import { HeaderService } from './../../components/template/header/header.service';
import { User } from './../../components/user/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css'
  ]
})

export class UserCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de alunos',
      icon: 'person_pin',
      routerUrl: '/users'
    }
  }
  ngOnInit(): void {
  }


  navigateToUserCreate(): void {
    this.router.navigate(['/users/create'])
  }
}


