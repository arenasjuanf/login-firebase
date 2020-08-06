import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: usuarioModel;
  recordarme =false;
  constructor( private auth: AuthService, private router : Router) {

  }

  ngOnInit() {
    this.usuario = new usuarioModel();
  }

  onSubmit(formulario: NgForm){
    if(formulario.valid){
      this.auth.signUp(this.usuario).subscribe(
        result => { 

          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/home');

        },
        error  => { console.log(error.error.error.message)}
      )
    }
  }

}
