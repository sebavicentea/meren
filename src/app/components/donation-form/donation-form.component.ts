import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.sass']
})
export class DonationFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  amounts = [1600, 3200, 4800];

  private subscription: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      lastname: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      phone: this.fb.control(null, Validators.required),
      amount: this.fb.control(null, [Validators.min(0)]),
      customAmount: this.fb.control(null, [Validators.min(0)]),
      installments: this.fb.control(1, Validators.required),
    });

    this.form.setValidators(this.amountValidator())

    this.customAmountCtrl.valueChanges
      .subscribe((value) => {
        if (value) this.amountCtrl.patchValue(null)
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  get amountCtrl(): FormControl {
    return this.form.get('amount') as FormControl;
  }
  get customAmountCtrl(): FormControl {
    return this.form.get('customAmount') as FormControl;
  }

  setAmount(value: number): void {
    this.form.patchValue({
      amount: value,
      customAmount: null
    });
    this.form.updateValueAndValidity();
  }

  submit() {

  }

  private amountValidator(): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      if (formGroup.get('amount').value || formGroup.get('customAmount').value) {
        return null
      }

      return { amountValue: true };
    }
  };
}
