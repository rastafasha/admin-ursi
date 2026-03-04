import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

export interface AngularFileUploaderConfig {
  multiple?: boolean;
  formatsAllowed?: string;
  maxSize?: string;
  method?: 'POST' | 'PUT';
  uploadAPI: {
    url: string;
    headers?: { [key: string]: string };
    responseType?: 'json' | 'text';
  };
  theme?: string;
  selectFileBtn?: string;
  hideProgressBar?: boolean;
  hideResetBtn?: boolean;
  hideSelectBtn?: boolean;
  fileNameIndex?: boolean;
  replaceTexts?: {
    selectFileBtn?: string;
    resetBtn?: string;
    uploadBtn?: string;
    dragNDropBox?: string;
    attachPinBtn?: string;
    afterUploadMsg_success?: string;
    afterUploadMsg_error?: string;
    sizeLimit?: string;
  };
}

export interface ApiResponse {
  status: string;
  data?: any;
  response?: any;
}

@Component({
  selector: 'angular-file-uploader',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="afu-container" [class.drag-over]="isDragOver">
      <!-- Drag and Drop Zone -->
      <div 
        class="afu-drop-zone"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="fileInput.click()"
      >
        <input 
          #fileInput
          type="file"
          [multiple]="config?.multiple || false"
          [accept]="config?.formatsAllowed || '*'"
          (change)="onFileSelected($event)"
          style="display: none"
        />
        
        <div class="afu-upload-icon">
          <i class="fa fa-cloud-upload"></i>
        </div>
        
        <div class="afu-instructions">
          {{ getText('selectFileBtn') }}
        </div>
        
        <div class="afu-hint">
          {{ config?.formatsAllowed ? 'Formats: ' + config.formatsAllowed : '' }}
          {{ config?.maxSize ? ' | Max Size: ' + config.maxSize + ' MB' : '' }}
        </div>
      </div>

      <!-- File List -->
      <div class="afu-file-list" *ngIf="selectedFiles.length > 0">
        <div class="afu-file-item" *ngFor="let file of selectedFiles; let i = index">
          <div class="afu-file-info">
            <span class="afu-file-name">{{ file.name }}</span>
            <span class="afu-file-size">{{ formatFileSize(file.size) }}</span>
          </div>
          
          <!-- Progress Bar -->
          <div class="afu-progress-container" *ngIf="uploadProgress[i] !== undefined && uploadProgress[i] < 100">
            <div class="afu-progress-bar" [style.width.%]="uploadProgress[i]"></div>
          </div>
          
          <!-- Status Icons -->
          <div class="afu-file-status">
            <span *ngIf="uploadProgress[i] === undefined" class="afu-pending">⏳</span>
            <span *ngIf="uploadProgress[i] !== undefined && uploadProgress[i] < 100" class="afu-uploading">📤</span>
            <span *ngIf="uploadProgress[i] === 100" class="afu-success">✅</span>
            <span *ngIf="uploadError[i]" class="afu-error">❌</span>
          </div>
          
          <!-- Remove Button -->
          <button 
            *ngIf="uploadProgress[i] === undefined || uploadProgress[i] >= 100"
            class="afu-remove-btn" 
            (click)="removeFile(i, $event)"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Upload Button -->
      <div class="afu-actions" *ngIf="selectedFiles.length > 0 && !config?.hideProgressBar">
        <button 
          class="afu-upload-btn" 
          (click)="uploadFiles()"
          [disabled]="isUploading"
        >
          {{ isUploading ? 'Uploading...' : getText('uploadBtn') }}
        </button>
      </div>

      <!-- Reset Button -->
      <div class="afu-actions" *ngIf="selectedFiles.length > 0 && !config?.hideResetBtn">
        <button 
          class="afu-reset-btn" 
          (click)="reset()"
          [disabled]="isUploading"
        >
          {{ getText('resetBtn') }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .afu-container {
      font-family: inherit;
    }
    
    .afu-drop-zone {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 40px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #fafafa;
    }
    
    .afu-drop-zone:hover, .afu-drop-zone.drag-over {
      border-color: #007bff;
      background: #f0f8ff;
    }
    
    .afu-upload-icon {
      font-size: 48px;
      color: #007bff;
      margin-bottom: 15px;
    }
    
    .afu-instructions {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }
    
    .afu-hint {
      font-size: 12px;
      color: #666;
    }
    
    .afu-file-list {
      margin-top: 20px;
    }
    
    .afu-file-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 8px;
      background: #fff;
    }
    
    .afu-file-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .afu-file-name {
      font-weight: 500;
      color: #333;
    }
    
    .afu-file-size {
      font-size: 12px;
      color: #666;
    }
    
    .afu-progress-container {
      width: 100px;
      height: 6px;
      background: #eee;
      border-radius: 3px;
      margin: 0 15px;
      overflow: hidden;
    }
    
    .afu-progress-bar {
      height: 100%;
      background: #007bff;
      transition: width 0.3s ease;
    }
    
    .afu-file-status {
      margin: 0 10px;
      font-size: 18px;
    }
    
    .afu-remove-btn {
      background: none;
      border: none;
      color: #dc3545;
      cursor: pointer;
      font-size: 16px;
      padding: 5px;
    }
    
    .afu-remove-btn:hover {
      color: #a71d2a;
    }
    
    .afu-actions {
      margin-top: 15px;
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    
    .afu-upload-btn, .afu-reset-btn {
      padding: 10px 25px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    
    .afu-upload-btn {
      background: #007bff;
      color: white;
      border: none;
    }
    
    .afu-upload-btn:hover:not(:disabled) {
      background: #0056b3;
    }
    
    .afu-upload-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .afu-reset-btn {
      background: #6c757d;
      color: white;
      border: none;
    }
    
    .afu-reset-btn:hover:not(:disabled) {
      background: #545b62;
    }
  `]
})
export class AngularFileUploaderComponent {
  @Input() config: AngularFileUploaderConfig;
  @Output() ApiResponse = new EventEmitter<ApiResponse>();

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  selectedFiles: File[] = [];
  uploadProgress: { [key: number]: number } = {};
  uploadError: { [key: number]: boolean } = {};
  isDragOver = false;
  isUploading = false;

  private defaultTexts = {
    selectFileBtn: 'Select Files',
    resetBtn: 'Reset',
    uploadBtn: 'Upload',
    dragNDropBox: 'Drag & drop files here',
    attachPinBtn: 'Attach files',
    afterUploadMsg_success: 'Successfully uploaded!',
    afterUploadMsg_error: 'Error uploading file!',
    sizeLimit: 'Size limit exceeded'
  };

  constructor(private http: HttpClient) {}

  getText(key: keyof typeof this.defaultTexts): string {
    return this.config?.replaceTexts?.[key] || this.defaultTexts[key];
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(input.files);
      // Reset input to allow selecting same file again
      input.value = '';
    }
  }

  handleFiles(files: FileList): void {
    const maxSizeMB = parseFloat(this.config?.maxSize || '5');
    const formats = this.config?.formatsAllowed?.split(',').map(f => f.trim().toLowerCase()) || [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check format
      if (formats.length > 0 && !formats.some(format => {
        // Handle extensions like .jpg, .png
        const ext = file.name.toLowerCase().split('.').pop();
        return format.includes(ext || '');
      })) {
        continue;
      }

      // Check size
      if (file.size > maxSizeMB * 1024 * 1024) {
        continue;
      }

      if (!this.config?.multiple && this.selectedFiles.length > 0) {
        this.selectedFiles[0] = file;
      } else if (this.config?.multiple || this.selectedFiles.length === 0) {
        this.selectedFiles.push(file);
      }
    }
  }

  removeFile(index: number, event: Event): void {
    event.stopPropagation();
    this.selectedFiles.splice(index, 1);
    delete this.uploadProgress[index];
    delete this.uploadError[index];
  }

  uploadFiles(): void {
    if (this.isUploading || this.selectedFiles.length === 0) return;

    this.isUploading = true;
    const uploadConfig = this.config?.uploadAPI;

    if (!uploadConfig?.url) {
      this.emitResponse({ status: 'error', response: 'No upload URL configured' });
      this.isUploading = false;
      return;
    }

    // Upload each file
    this.selectedFiles.forEach((file, index) => {
      this.uploadFile(file, index);
    });
  }

  private uploadFile(file: File, index: number): void {
    const uploadConfig = this.config?.uploadAPI;
    const formData = new FormData();
    formData.append(this.config?.fileNameIndex ? `file[${index}]` : 'file', file);

    let headers = new HttpHeaders();
    if (uploadConfig?.headers) {
      Object.entries(uploadConfig.headers).forEach(([key, value]) => {
        headers = headers.set(key, value);
      });
    }

    this.http.post(uploadConfig.url, formData, {
      headers,
      reportProgress: true,
      responseType: 'json' as 'json'
    }).subscribe({
      next: (response: any) => {
        this.uploadProgress[index] = 100;
        this.emitResponse({
          status: 'success',
          data: response,
          response: response
        });
        
        // Check if all uploads are complete
        if (Object.values(this.uploadProgress).every(p => p === 100)) {
          this.isUploading = false;
        }
      },
      error: (error) => {
        this.uploadError[index] = true;
        this.emitResponse({
          status: 'error',
          response: error
        });
        
        if (Object.keys(this.uploadError).length === this.selectedFiles.length) {
          this.isUploading = false;
        }
      }
    });
  }

  private emitResponse(data: ApiResponse): void {
    this.ApiResponse.emit(data);
  }

  reset(): void {
    this.selectedFiles = [];
    this.uploadProgress = {};
    this.uploadError = {};
    this.isUploading = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

