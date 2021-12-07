import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild, Input } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-grid-filter',
  styleUrls: ['grid-filter.component.scss'],
  template: `
    <div class="grid-filter">
      <input nbInput fullWidth placeholder="Search By {{searchKeyWord}}" #searchInput autocomplete="off"/>
    </div>
`,
})

export class GridFilterComponent implements AfterViewInit, OnDestroy {
  @Input()
  searchKeyWord: string = 'Name';

  @Output()
  onSearch = new EventEmitter<string>();

  @ViewChild('searchInput', { static: false })
  input: ElementRef;

  private subscription: Subscription;

  ngAfterViewInit(): void {

    const terms$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(250),
      );
    this.subscription = terms$
      .subscribe(
        criterion => {
          this.onSearch.emit(criterion);
        },
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
