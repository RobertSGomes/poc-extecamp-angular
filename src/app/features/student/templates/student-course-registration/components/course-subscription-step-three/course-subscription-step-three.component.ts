import { CourseService } from 'src/app/shared/services/course.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-subscription-step-three',
  templateUrl: './course-subscription-step-three.component.html',
  styleUrls: ['./course-subscription-step-three.component.css'],
})
export class CourseSubscriptionStepThreeComponent implements AfterViewInit {
  @Input() courseId!: string;
  @Input() stepThreeForm!: FormGroup;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('signatureCanvas', { static: false }) canvasRef!: ElementRef;
  canvasContext!: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastMousePosition = {
    x: 0,
    y: 0,
  };

  signatureModalOpened = false;

  get termo_compromisso_assinado() {
    return this.stepThreeForm.get('termo_compromisso_assinado');
  }

  get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  ngAfterViewInit(): void {
    this.loadSignatureCanvas();
  }

  openSignatureModal() {
    this.signatureModalOpened = true;
  }

  closeSignatureModal() {
    this.signatureModalOpened = false;
  }

  loadSignatureCanvas() {
    this.canvas.width = 952;
    this.canvas.height = 500;

    this.canvasContext = this.canvas.getContext('2d');
    this.canvasContext!.fillStyle = '#fff';
    this.canvasContext!.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext!.strokeStyle = '#000';
    this.canvasContext!.lineWidth = 3;
  }

  clearSignatureCanvas() {
    this.loadSignatureCanvas();
  }

  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    this.lastMousePosition = {
      x: event.offsetX,
      y: event.offsetY,
    };
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const currentMousePosition = {
      x: event.offsetX,
      y: event.offsetY,
    };

    this.canvasContext!.beginPath();
    this.canvasContext!.moveTo(
      this.lastMousePosition.x,
      this.lastMousePosition.y
    );
    this.canvasContext!.lineTo(currentMousePosition.x, currentMousePosition.y);
    this.canvasContext!.stroke();

    this.lastMousePosition = currentMousePosition;
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }

  exportSignature(): void {
    const anchor = document.createElement('a');

    anchor.href = this.canvas.toDataURL('image/jpeg', 1.0);
    anchor.download = `${this.courseId}-assinatura-termo-compromisso.jpeg`;
    anchor.click();

    this.clearSignatureCanvas();
  }

  handleSendSignature() {
    this.exportSignature();
    this.termo_compromisso_assinado?.setValue(true);
    this.clearSignatureCanvas();
    this.closeSignatureModal();
  }
}
