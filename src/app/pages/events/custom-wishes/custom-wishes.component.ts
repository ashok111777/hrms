import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-custom-wishes',
  templateUrl: './custom-wishes.component.html',
  styleUrls: ['./custom-wishes.component.scss']
})
export class CustomWishesComponent {

  templateform = new FormGroup({ 
    Name: new FormControl('',[Validators.required]),
    Designation: new FormControl('',[Validators.required]),
    Wishes: new FormControl('',[Validators.required]),
    Description: new FormControl('',[Validators.required]),
  });
  
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  fileInputRef: HTMLInputElement | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  openFileDialog() {
    if (this.fileInputRef) {
      this.fileInputRef.click();
    }
  }
}
