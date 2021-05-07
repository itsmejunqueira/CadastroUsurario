import { Teacher } from '../teacher.model';
import { TeacherService } from '../teacher.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-teacher-read',
  templateUrl: './teacher-read.component.html',
  styleUrls: ['./teacher-read.component.css' ]
})
export class TeacherReadComponent implements OnInit {

  displayedColumns= ['id', 'name', 'ativo', 'bio']
  dataSource = new MatTableDataSource<Teacher>([]);
  teste= "";
  checkbox=true;
  teachers: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private TeacherService: TeacherService) {}

  ngOnInit(): void {
    this.TeacherService.read().subscribe(teachers => {
      this.teachers = teachers;
      this.dataSource = new MatTableDataSource<Teacher>(teachers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  filter(){
    this.dataSource.filter = this.teste;
  }

  filterAtivo(e:any){
    this.dataSource.data = this.teachers.filter(x => x.ativo == e);
  }
}
