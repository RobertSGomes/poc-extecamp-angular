import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-step-four-form-four',
  templateUrl: './step-four-form-four.component.html',
  styleUrls: ['./step-four-form-four.component.css'],
})
export class StepFourFormFourComponent {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
    rightAlign: false,
  });

  percentageInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    max: 100,
    rightAlign: false,
  });

  historySteps: HistoryStep[] = [
    { stepIndex: 0, title: 'Custos do oferecimento' },
    { stepIndex: 1, title: 'Taxas' },
    { stepIndex: 2, title: 'Formas de pagamento' },
    { stepIndex: 3, title: 'Condições' },
  ];

  constructor(private readonly formBuilder: FormBuilder) {}

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepFourFormFour!: FormGroup;

  get parcelas_boleto() {
    return this.stepFourFormFour.get('parcelas_boleto') as FormArray;
  }

  get opcao_desconto() {
    return this.stepFourFormFour.get('opcao_desconto') as FormArray;
  }

  addPaymentSlip(): void {
    const newPaymentSlip = this.formBuilder.group({
      nmr_parcelas: [''],
      valor: [''],
      data_vencimento: ['', [Validators.required]],
    });

    this.parcelas_boleto.push(newPaymentSlip);
  }

  removePaymentSlip(index: number): void {
    this.parcelas_boleto.removeAt(index);
  }

  addDiscountMethod(): void {
    const newDiscountMethod = this.formBuilder.group({
      para: ['', Validators.required],
      porcentagem_desconto: [''],
    });

    this.opcao_desconto.push(newDiscountMethod);
  }

  removeDiscountMethod(index: number): void {
    this.opcao_desconto.removeAt(index);
  }
}
