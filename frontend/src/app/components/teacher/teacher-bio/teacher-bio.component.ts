import { Teacher } from '../teacher.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-bio',
  templateUrl: './teacher-bio.component.html',
  styleUrls: ['./teacher-bio.component.css']
})
export class TeacherBioComponent implements OnInit {

  teacher: any = {};
  form: FormGroup;
  teacherService: any;

  constructor(
    private TeacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null,[Validators.required, Validators.minLength(3)]],
      email: [null,[Validators.required, Validators.email]],
      genero: [null,[Validators.required]],
      dataDeNascimento:[null,[Validators.required]],
      senha:[null],
      ativo:[null],
      id:[null,[Validators.required]],
    })
    
    const id = this.route.snapshot.paramMap.get('id')
    this.TeacherService.readById(id).subscribe(retornoApi => {
      this.teacher=retornoApi;
    });
  }

  editeTeacher(): void {
    
  }

  updateTeacher() {
    const id = this.route.snapshot.paramMap.get('id')
    this.router.navigate(['/teachers/update/'+id]);
  }

  cancel(): void {
    this.router.navigate(['/teachers']);
  }

  applyCssError(field: string): object {
    return {
      'is-invalid': this.verifyInvalidAndTouched(field)
    };
  }

  verifyInvalidAndTouched(field: string) {
    return (
      this.form.get(field) != null &&
      !this.form.get(field)?.valid &&
      (this.form.get(field)?.touched || this.form.get(field)?.dirty)
    );
  }
}
