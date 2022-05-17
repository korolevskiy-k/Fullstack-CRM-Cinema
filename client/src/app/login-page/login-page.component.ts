import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MaterialService} from '../shared/classes/material.service'
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    })

    this.route.queryParams.subscribe( (params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему')
      } else if (params['accessDenied']) {
        MaterialService.toast('Авторизуйтесь в системе')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заново')
      }
    })
  }
  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message)
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
