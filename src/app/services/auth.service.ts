import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private privateKey = 'AIzaSyD81BdBJ8IBfVR96UtuQBxHuZ93zE4JMWs';
  userToken : string;

  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
  };

  login( usuario: usuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.privateKey}`, authData).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    )

  };

  signUp( usuario: usuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signUp?key=${this.privateKey}`, authData ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    )

  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    const hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  isAutenticated(){
    if (this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiracion = new Date().setTime(expira);

    if (expiracion > new Date().getTime() ){
      return true
    }else{
      return false;
    }

  }

}
