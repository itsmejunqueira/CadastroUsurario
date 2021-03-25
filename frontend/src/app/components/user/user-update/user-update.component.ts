import { User } from './../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: any = {};
  form: FormGroup;
  userService: any;

  constructor(
    private UserService: UserService,
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
    this.UserService.readById(id).subscribe(user => {
    this.form.patchValue({
        id:user.id,
        name: user.name,
        email: user.email,
        genero: user.genero,
        dataDeNascimento: user.dataDeNascimento,
        senha: user.senha,
        ativo: user.ativo,

      });
    });
  }

  editeUser(): void {
    
  }

  updateUser() {
    if (!this.form.valid) {
      this.userService.showMessage('Verifique o preenchimento do seu formulário!', true);
      return;
    }
    let user: User = {
      id: this.form.value.id,
      name: this.form.value.name,
      email: this.form.value.email,
      genero: this.form.value.genero,
      dataDeNascimento: this.form.value.dataDeNascimento,
      senha: this.form.value.senha,
      ativo: this.form.value.ativo,
    }
    this.UserService.update(user).subscribe(() => {
      this.UserService.showMessage('Cadastro atualizado com sucesso!')
      this.router.navigate(['/users']);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
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
