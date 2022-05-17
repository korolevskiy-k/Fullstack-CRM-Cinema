import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  asub: Subscription

  constructor(private auth: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy(): void {
    if (this.asub) {
      this.asub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.asub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        MaterialService.toast(error.error.message)
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
