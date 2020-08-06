import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
/* import Swal from 'sweetalert2';
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: usuarioModel = new usuarioModel();
  recordarme = false;

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm){
    if(form.valid){
      this.auth.login(this.usuario).subscribe(
        result => {
          if(this.recordarme){
            localStorage.setItem('email', this.usuario.email);
          }else{
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/home');

        },
        error => { console.log({ error }) }
      );
    }
  }

}
