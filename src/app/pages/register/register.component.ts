import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  addUser!: FormGroup;
  newUser!: User;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {


    this.addUser = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    let newUser: User = { ...this.addUser.value };

    this.authService.addUser(newUser).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès !');
        this.addUser.reset();
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      },
    });
  }

  OnAddUser() {
    let newUser: User = { ...this.addUser.value };
    if (!this.addUser.valid) {
      newUser = { ...this.addUser.value };
    }
    console.log(newUser);
  }


}
