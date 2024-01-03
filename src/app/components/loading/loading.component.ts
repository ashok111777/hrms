import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {

  constructor(public loaderService: LoaderService,private cdr: ChangeDetectorRef) {
    

  }
  ngOnInit() { 
    this.loaderService.isLoading.subscribe((isLoading) => {
      this.loaderService.loading = isLoading;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
    
  }

  

}
