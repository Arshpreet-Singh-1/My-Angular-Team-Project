import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberService } from '../member.service';
import { Observable, Subject } from 'rxjs';
import { Member } from '../member';
import { AsyncPipe } from '@angular/common';

import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs';

@Component({
  selector: 'app-member-search',
  standalone: true,
  imports: [AsyncPipe,RouterModule, NgFor,],
  templateUrl: './member-search.component.html',
  styleUrl: './member-search.component.css'
})
export class MemberSearchComponent {
  members$!: Observable<Member[]>;
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.memberService.searchMembers(term)),
    );
  }
}
