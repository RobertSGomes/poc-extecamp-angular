import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './components/accordion/accordion.component';
import { HeaderNavbarComponent } from './components/header-navbar/header-navbar.component';
import { HistoryLineComponent } from './components/history-line/history-line.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StepsComponent } from './components/steps/steps.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AccordionComponent,
    HeaderNavbarComponent,
    HistoryLineComponent,
    NavbarComponent,
    SidebarComponent,
    StepsComponent,
  ],
  imports: [AppRoutingModule, CommonModule],
  exports: [
    AccordionComponent,
    HeaderNavbarComponent,
    HistoryLineComponent,
    NavbarComponent,
    SidebarComponent,
    StepsComponent,
  ],
})
export class SharedModule {}
