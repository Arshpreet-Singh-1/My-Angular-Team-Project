import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private membersUrl = 'api/members';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }


  /** GET meroes from the server */
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(_ => this.log('fetched members')),
        catchError(this.handleError<Member[]>('getMembers', []))
      );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** GET member by id. Will 404 if id not found */
  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => this.log(`fetched member id=${id}`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  /** PUT: update the member on the server */
  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions).pipe(
      tap(_ => this.log(`updated member id=${member.id}`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  /** POST: add a new member to the server */
  addMember(hero: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, hero, this.httpOptions).pipe(
      tap((newMember: Member) => this.log(`added member w/ id=${newMember.id}`)),
      catchError(this.handleError<Member>('addMemebr'))
    );
  }

  /** DELETE: delete the member from the server */
  deleteMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted member id=${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }


  /* GET members whose name contains search term */
  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found members matching "${term}"`) :
        this.log(`no members matching "${term}"`)),
      catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }

  /** Log a MemberService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }
}
