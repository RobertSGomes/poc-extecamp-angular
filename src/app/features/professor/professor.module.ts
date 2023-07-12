import { NgModule } from '@angular/core';
import { ProfessorHomeComponent } from './templates/professor-home/professor-home.component';
import { ProfessorNewOfferingComponent } from './templates/professor-new-offering/professor-new-offering.component';
import { ProfessorOfferingComponent } from './templates/professor-offering/professor-offering.component';
import { StepOneFormOneComponent } from './templates/professor-new-offering/components/step-one/step-one-form-one/step-one-form-one.component';
import { StepOneFormTwoComponent } from './templates/professor-new-offering/components/step-one/step-one-form-two/step-one-form-two.component';
import { StepOneFormThreeComponent } from './templates/professor-new-offering/components/step-one/step-one-form-three/step-one-form-three.component';
import { StepOneFormFourComponent } from './templates/professor-new-offering/components/step-one/step-one-form-four/step-one-form-four.component';
import { StepOneFormFiveComponent } from './templates/professor-new-offering/components/step-one/step-one-form-five/step-one-form-five.component';
import { StepTwoFormOneComponent } from './templates/professor-new-offering/components/step-two/step-two-form-one/step-two-form-one.component';
import { StepTwoFormTwoComponent } from './templates/professor-new-offering/components/step-two/step-two-form-two/step-two-form-two.component';
import { StepTwoFormThreeComponent } from './templates/professor-new-offering/components/step-two/step-two-form-three/step-two-form-three.component';
import { StepTwoFormFourComponent } from './templates/professor-new-offering/components/step-two/step-two-form-four/step-two-form-four.component';
import { StepTwoFormFiveComponent } from './templates/professor-new-offering/components/step-two/step-two-form-five/step-two-form-five.component';
import { StepTwoFormSixComponent } from './templates/professor-new-offering/components/step-two/step-two-form-six/step-two-form-six.component';
import { StepThreeFormOneComponent } from './templates/professor-new-offering/components/step-three/step-three-form-one/step-three-form-one.component';
import { StepThreeFormTwoComponent } from './templates/professor-new-offering/components/step-three/step-three-form-two/step-three-form-two.component';
import { StepThreeFormThreeComponent } from './templates/professor-new-offering/components/step-three/step-three-form-three/step-three-form-three.component';
import { StepThreeFormFourComponent } from './templates/professor-new-offering/components/step-three/step-three-form-four/step-three-form-four.component';
import { StepFourFormOneComponent } from './templates/professor-new-offering/components/step-four/step-four-form-one/step-four-form-one.component';
import { StepFourFormTwoComponent } from './templates/professor-new-offering/components/step-four/step-four-form-two/step-four-form-two.component';
import { StepFourFormThreeComponent } from './templates/professor-new-offering/components/step-four/step-four-form-three/step-four-form-three.component';
import { StepFourFormFourComponent } from './templates/professor-new-offering/components/step-four/step-four-form-four/step-four-form-four.component';
import { StepFiveFormOneComponent } from './templates/professor-new-offering/components/step-five/step-five-form-one/step-five-form-one.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProfessorHomeComponent,
    ProfessorNewOfferingComponent,
    ProfessorOfferingComponent,
    StepOneFormOneComponent,
    StepOneFormTwoComponent,
    StepOneFormThreeComponent,
    StepOneFormFourComponent,
    StepOneFormFiveComponent,
    StepTwoFormOneComponent,
    StepTwoFormTwoComponent,
    StepTwoFormThreeComponent,
    StepTwoFormFourComponent,
    StepTwoFormFiveComponent,
    StepTwoFormSixComponent,
    StepThreeFormOneComponent,
    StepThreeFormTwoComponent,
    StepThreeFormThreeComponent,
    StepThreeFormFourComponent,
    StepFourFormOneComponent,
    StepFourFormTwoComponent,
    StepFourFormThreeComponent,
    StepFourFormFourComponent,
    StepFiveFormOneComponent,
  ],
  imports: [AppRoutingModule, FormsModule, SharedModule, CommonModule],
})
export class ProfessorModule {}
