import { UpdateCourseDTO } from './../../../../../../../shared/dtos/update-course.dto';
import { CourseService } from 'src/app/shared/services/course.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CourseModel } from 'src/app/shared/models/course.model';
import { UpdateOfferingDTO } from 'src/app/shared/dtos/update-offering.dto';
import { UpdateOfferingCostDTO } from 'src/app/shared/dtos/update-offering-cost.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-five-form-one',
  templateUrl: './step-five-form-one.component.html',
  styleUrls: ['./step-five-form-one.component.css'],
})
export class StepFiveFormOneComponent implements OnInit, AfterViewInit {
  @Input() courseId!: string;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  course?: CourseModel;

  signatureType: '' | 'offering' | 'cost' = '';
  signatureModalOpened: boolean = false;
  submitModalOpened: boolean = false;

  // Variáveis para o canvas
  @ViewChild('signatureCanvas', { static: false }) canvasRef!: ElementRef;
  canvasContext!: CanvasRenderingContext2D | null;
  isDrawing: boolean = false;
  lastMousePosition = {
    x: 0,
    y: 0,
  };

  constructor(
    private readonly courseService: CourseService,
    private readonly router: Router
  ) {}

  get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  ngOnInit(): void {
    this.loadCourse();
  }

  ngAfterViewInit(): void {
    this.loadSignatureCanvas();
  }

  loadCourse() {
    this.courseService.getOne(this.courseId).subscribe({
      next: (response) => {
        this.course = response;
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }

  openSubmitModal(): void {
    this.submitModalOpened = true;
  }

  openSignatureModal(type: 'offering' | 'cost') {
    this.signatureModalOpened = true;
    this.signatureType = type;
  }

  closeSignatureModal() {
    this.signatureModalOpened = false;
    this.signatureType = '';
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

  startDrawingTouch(event: TouchEvent): void {
    this.isDrawing = true;

    const rect = this.canvas.getBoundingClientRect();

    this.lastMousePosition = {
      x: event.touches[0].clientX - rect.x,
      y: event.touches[0].clientY - rect.y,
    };
  }

  drawTouch(event: TouchEvent): void {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();

    const currentMousePosition = {
      x: event.touches[0].clientX - rect.x,
      y: event.touches[0].clientY - rect.y,
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

  exportSignature(type: 'oferecimento' | 'custo-oferecimento'): void {
    const anchor = document.createElement('a');

    anchor.href = this.canvas.toDataURL('image/jpeg', 1.0);
    anchor.download = `${this.courseId}-assinatura-${type}.jpeg`;
    anchor.click();

    this.clearSignatureCanvas();
  }

  handleSendSignature() {
    if (this.signatureType === 'offering') {
      const updateOfferingDTO = new UpdateOfferingDTO({
        stepFiveFormOneValues: { assinatura_status: 'Assinado' },
      });

      this.courseService
        .updateOffering(this.courseId, updateOfferingDTO)
        .subscribe({
          next: () => {
            this.loadCourse();
            this.exportSignature('oferecimento');
            this.closeSignatureModal();
          },
          error: ({ error }) => {
            alert(error.error);
          },
        });
    }

    if (this.signatureType === 'cost') {
      const updateOfferingCostDTO = new UpdateOfferingCostDTO({
        stepFiveFormOneValues: { assinatura_status: 'Assinado' },
      });

      this.courseService
        .updateOfferingCost(this.courseId, updateOfferingCostDTO)
        .subscribe({
          next: () => {
            this.loadCourse();
            this.exportSignature('custo-oferecimento');
            this.closeSignatureModal();
          },
          error: ({ error }) => {
            alert(error.error);
          },
        });
    }
  }

  handleUpdateCourseStatus() {
    const updateCourseDTO = new UpdateCourseDTO({ curso_status: 'Pendente' });

    this.courseService.updateCourse(this.courseId, updateCourseDTO).subscribe({
      next: () => {
        this.router.navigate(['/professor', 'offerings']);
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }
}
