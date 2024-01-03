import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-fullcalender',
  templateUrl: './fullcalender.component.html',
  styleUrls: ['./fullcalender.component.scss']
})
export class FullcalenderComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'Event 1', date: '2023-08-01' },
      { title: 'Event 2', date: '2023-08-10' }
    ]
  };

}
