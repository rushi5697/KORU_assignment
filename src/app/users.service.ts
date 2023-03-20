import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/userdata')
  }

  deleteSingleUser(id:any){
    return this.http.delete(`http://localhost:3000/userdata/${id}`)
  }

  // deleteMultipleUser(idArray:any) {
  //   if(idArray.length>0) {
  //     for(const element of idArray) {
  //         this.http.delete(`http://localhost:3000/userdata/${element}`).subscribe((response:any)=>{
  //           return response
  //         })
  //     }
  //   }
    

  // }  

  deleteMultipleUser(idArray:any):Observable<any> {
      const deleteRequests = idArray.map((id:any) => this.http.delete(`http://localhost:3000/userdata/${id}`));
      return forkJoin(deleteRequests).pipe(
        map((response:any)=>{
          console.log(response);
          return response
        })
      )
  }

  selectOneUser(id:any) {
    return this.http.get(`http://localhost:3000/userdata/${id}`)
  }

  getSingleUser() {
    return this.http.get("http://localhost:3000/user")
  }
}
