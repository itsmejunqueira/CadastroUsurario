import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Teacher } from '../teacher.model';
import { TeacherService } from '../teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
  
})


export class TeacherCreateComponent implements OnInit {

  form: FormGroup;

  constructor
  (private teacherService: TeacherService,
    private router: Router, 
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null,[Validators.required, Validators.minLength(3)]],
      materia:[null,[Validators.required]],
      bio:[null,[Validators.required]],
      avatar:[null,[Validators.required]],
    })
  }

  createTeacher
  ():void {
    if(!this.form.valid){
      this.teacherService.showMessage('Verifique o preenchimento do seu formulário!', true);
      return;
    }
    let teacher: Teacher
     = {
      id: this.form.value.id,
      name: this.form.value.name,
      ativo: true,
      materia:this.form.value.materia,
      bio:this.form.value.bio,
      avatar:this.form.value.avatar,
    }
    this.teacherService.create(teacher).subscribe(()=> {
      this.teacherService.showMessage('Cadastro concluido!')
      this.router.navigate(['/teachers'])
    })
  }

  cancel():void {
   this.router.navigate(['/teachers'])
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
