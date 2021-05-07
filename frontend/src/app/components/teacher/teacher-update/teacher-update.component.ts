import { Teacher } from '../teacher.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit {

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
      ativo:[null],
      id:[null,[Validators.required]],
      materia:[null,[Validators.required]],
      bio:[null,[Validators.required]],
      avatar:[null,[Validators.required]],
    })
    
    const id = this.route.snapshot.paramMap.get('id')
    this.TeacherService.readById(id).subscribe(teacher => {
    this.form.patchValue({
        id:teacher.id,
        name: teacher.name,
        ativo: teacher.ativo,
        materia:teacher.materia,
        bio:teacher.bio,
        avatar:teacher.avatar,
      });
    });
  }

  editeTeacher(): void {
    
  }

  updateTeacher() {
    if (!this.form.valid) {
      this.teacherService.showMessage('Verifique o preenchimento do seu formulário!', true);
      return;
    }
    let teacher: Teacher = {
      id: this.form.value.id,
      name: this.form.value.name,
      ativo: this.form.value.ativo,
      materia:this.form.value.materia,
      bio:this.form.value.bio,
      avatar:this.form.value.avatar,

    }
    this.TeacherService.update(teacher).subscribe(() => {
      this.TeacherService.showMessage('Cadastro atualizado com sucesso!')
      this.router.navigate(['/teachers']);
    });
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
