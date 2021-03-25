import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
  
})


export class UserCreateComponent implements OnInit {

  form: FormGroup;

  constructor
  (private userService: UserService,
    private router: Router, 
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null,[Validators.required, Validators.minLength(3)]],
      email: [null,[Validators.required, Validators.email]],
      genero: [null,[Validators.required]],
      dataDeNascimento:[null,[Validators.required]],
      senha:[null],
    })
  }

  createUser():void {
    if(!this.form.valid){
      this.userService.showMessage('Verifique o preenchimento do seu formulário!', true);
      return;
    }
    let user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      genero: this.form.value.genero,
      dataDeNascimento: this.form.value.dataDeNascimento,
      senha: this.form.value.senha,
      ativo: true
    }
    this.userService.create(user).subscribe(()=> {
      this.userService.showMessage('Cadastro concluido!')
      this.router.navigate(['/users'])
    })
  }

  cancel():void {
   this.router.navigate(['/users'])
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
