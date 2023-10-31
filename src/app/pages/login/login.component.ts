import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  connexion!: FormGroup;
  loginError!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }
  private initialForm() {
    this.connexion = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onConnect() {
    if (this.connexion.valid) {
      console.log(this.connexion.value,'VALEUR DE FORMULAIRE DE CONNEXION')
      let email = this.connexion.value.email;
      let password = this.connexion.value.password;
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Réponse complète du serveur :', response);
          if (response && response.accessToken) {
            localStorage.setItem('access_token', response.accessToken);

            console.log('Connexion réussie et token stocké!');
            this.router.navigate(['/products']);
          } else {
            console.error('Token non reçu dans la réponse.');
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error);
          this.loginError = "Les champs renseignés ne sont pas corrects.";
        },
      });
    }
  }

}
