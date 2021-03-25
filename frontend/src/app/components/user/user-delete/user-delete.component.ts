import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
  
})
export class UserDeleteComponent implements OnInit {

  user: any = {}; 

  constructor(private UserService: UserService, 
    private Router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
    this.UserService.readById(id).subscribe(user => {
      this.user = user
    })
  }

  deleteUser(): void {
    debugger 
    this.user.ativo = !this.user.ativo;
  this.UserService.update(this.user).subscribe(() => {
    this.UserService.showMessage('Usario exluido com sucesso!')
    this.Router.navigate(['/users']);
  });
  }

  cancel(): void {
    this.Router.navigate(['/users']);
  }

}
