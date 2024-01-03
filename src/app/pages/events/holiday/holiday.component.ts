import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent {


  templateform = new FormGroup({ 
    Name: new FormControl('',[Validators.required]),
    Designation: new FormControl('',[Validators.required]),
    Wishes: new FormControl('',[Validators.required]),
    Description: new FormControl('',[Validators.required]),
  });


  holidays = [
    {
      date: new Date(2023, 0, 1),
      description: 'New Year\'s Day'
    },
    {
      date: new Date(2023, 0, 26),
      description: 'Republic Day'
    },
    {
      date: new Date(2023, 2, 21),
      description: 'Holi'
    },
    {
      date: new Date(2023, 3, 14),
      description: 'Ambedkar Jayanti'
    },
    {
      date: new Date(2023, 3, 15),
      description: 'Ram Navami'
    },
    {
      date: new Date(2023, 3, 16),
      description: 'Mahavir Jayanti'
    },
    {
      date: new Date(2023, 4, 1),
      description: 'Labour Day'
    },
    {
      date: new Date(2023, 5, 5),
      description: 'Eid al-Fitr'
    },
    {
      date: new Date(2023, 7, 15),
      description: 'Independence Day'
    },
    {
      date: new Date(2023, 8, 2),
      description: 'Ganesh Chaturthi'
    },
    {
      date: new Date(2023, 10, 6),
      description: 'Diwali'
    },
    {
      date: new Date(2023, 11, 25),
      description: 'Christmas Day'
    }
  ];

  @ViewChild('tooltip', { static: true }) tooltip: ElementRef<HTMLElement>;

  dateClass = (date: Date) => {
    const holiday = this.holidays.find(
      (holiday) => holiday.date.getTime() === date.getTime()
    );
    if (holiday) {
      return 'holiday';
    }
    return '';
  };

  
  showHolidayDetails(event: { value: Date; }): void {
    const holiday = this.holidays.find(
      (holiday) => holiday.date.getTime() === event.value.getTime()
    );
    if (holiday) {
      const tooltip = this.tooltip.nativeElement;
      tooltip.innerText = holiday.description;
      tooltip.style.display = 'block';
      setTimeout(() => {
        tooltip.style.display = 'none';
      }, 2000);
    }
  }
  constructor( public global: GlobalService,
    public restApi: RestService,
    private alertService: AlertService,
    ){

  }

  imgUrl: any = this.global.avatar;
  get getImgUrl() {
    return this.imgUrl;
  }
  async selectFile(event: any) { //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.alertService.showToast('You must select an image');
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.alertService.showToast("Only images are supported");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.imgUrl = reader.result;
      this.alertService.showToast('Image updated');
    }
  }


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
  }}

