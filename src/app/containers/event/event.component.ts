import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Store } from '@ngrx/store';
import { EventApiActions } from '../../state/event/event.actions';
import { Event } from '../../type/interfaces/event.interface';
import { Observable, of, tap } from 'rxjs';
import { selectEvents, selectIsLoading } from '../../state/event/event.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  public events: Observable<Array<Event>> | null = null;
  public isFetching: Observable<boolean> = of(false);

  constructor(
    private readonly eventService: EventService,
    private readonly store: Store
  ) {
    this.events = this.store.select(selectEvents);
    this.isFetching = this.store.select(selectIsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(EventApiActions.eventsFetching());
    this.eventService.getAll().subscribe({
      next: (events: Array<Event>) => {
        this.store.dispatch(EventApiActions.eventsLoaddedSuccess({ events }));
      },
      error: (error) => console.log(error, 'error'),
    });
  }
}
