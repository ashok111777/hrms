import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-leave-calender',
  templateUrl: './leave-calender.component.html',
  styleUrls: ['./leave-calender.component.scss']
})
export class LeaveCalenderComponent implements OnInit {
    calendarEvent: any = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
        headerToolbar: {
      right: 'dayGridMonth,dayGridWeek,timeGridDay',
      left: 'prev,next',
      center: 'title',
    },
    businessHours: true,
    plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin],
    height: '550px',
  };

  constructor(private rest: RestService) { }

  ngOnInit(): void {
    this.updateCalendarEvents();
      }
  
  updateCalendarEvents() {
    const holidaysApi = 'api/web/v1/calenderDetails'; // Remove double slashes here
    this.rest.getService(holidaysApi).subscribe((res: any) => {
      this.calendarEvent = res.data;
      this.calendarOptions.events = this.calendarEvent;
    });
  }

  }

