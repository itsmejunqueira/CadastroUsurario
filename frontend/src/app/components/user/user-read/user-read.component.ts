import { User } from './../user.model';
import { UserService } from './../user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css' ]
})
export class UserReadComponent implements OnInit {

  displayedColumns= ['id', 'name', 'dataDeNascimento', 'email', 'genero', 'ativo', 'action']
  dataSource = new MatTableDataSource<User>([]);
  teste= "";
  checkbox=true;
  users: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.read().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  filter(){
    this.dataSource.filter = this.teste;
  }

  filterAtivo(e:any){
    this.dataSource.data = this.users.filter(x => x.ativo == e);
  }
}
