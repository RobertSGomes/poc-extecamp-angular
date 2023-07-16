import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormGroup } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-step-four-form-one',
  templateUrl: './step-four-form-one.component.html',
  styleUrls: ['./step-four-form-one.component.css'],
})
export class StepFourFormOneComponent {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  historySteps: HistoryStep[] = [
    { stepIndex: 0, title: 'Custos do oferecimento' },
    { stepIndex: 1, title: 'Taxas' },
    { stepIndex: 2, title: 'Formas de pagamento' },
    { stepIndex: 3, title: 'Condições' },
  ];

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepFourFormOne!: FormGroup;

  setTotal() {
    const formattedValue = this.getTotal();

    this.stepFourFormOne.get('total')?.setValue(formattedValue);
  }

  getTotal() {
    return (
      this.transformValueToNumber(
        this.stepFourFormOne.get('professores_hora_aula')?.value
      ) +
      this.transformValueToNumber(
        this.stepFourFormOne.get('professores_outras_atividades')?.value
      ) +
      this.transformValueToNumber(
        this.stepFourFormOne.get('material_consumo')?.value
      ) +
      this.transformValueToNumber(
        this.stepFourFormOne.get('material_permanente')?.value
      ) +
      this.transformValueToNumber(
        this.stepFourFormOne.get('servico_terceiros')?.value
      ) +
      this.transformValueToNumber(
        this.stepFourFormOne.get('outros_custos')?.value
      ) +
      this.transformValueToNumber(
        this.stepFourFormOne.get('aproveitamento_recursos')?.value
      )
    );
  }

  transformValueToNumber(value: string) {
    const newValue = value.toString().replaceAll(',', '');

    return isNaN(Number(newValue)) ? 0 : Number(newValue);
  }
}
