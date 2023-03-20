import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { UsersService } from '../users.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export interface UserData {
  phonenumber?: number;
  emailid?: number;
  username?: string;
  id:number;
  isChecked?:boolean;

}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 

  userData?:UserData[];
  sortedData?: any;
  isOpenDeleteDialog:boolean;
  checkedArray:any = [];  
  selectedUsers:any;
  isDisabled:boolean;
  multipleId:any;
  isOpenBulkDeleteDialog:boolean;
  selectedUserId : any;
  isTosterPopup : any;
  isLoginToster:any;
  constructor(private api:UsersService) {
    this.isOpenDeleteDialog = false;
    this.isOpenBulkDeleteDialog = false;
    this.isDisabled = false;
    this.isTosterPopup = false;
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.loginTosterCall()

  }


  getAllUsers() {
    this.api.getUsers().subscribe((response:any)=>{
      this.userData=response
      this.sortedData = response.slice();
    })
  }

  loginTosterCall() {
    this.isLoginToster = true
  setTimeout(()=>{
      this.isLoginToster = false;
  },2000);
  }
 

  openDeleteDialog(id:any) {
    this.isOpenDeleteDialog = true;
    this.api.selectOneUser(id).subscribe((response:any)=>{
      this.selectedUserId = response.id
    })
  }

  closeDeleteDialog() {
    this.isOpenDeleteDialog = false;
  }
  openBulkDeleteDialog() {
      this.isOpenBulkDeleteDialog = true;
  }

  closeBulkDeleteDialog() {
    this.isOpenBulkDeleteDialog = false;
  }



  deleteSingleUSer() {
    this.api.deleteSingleUser(this.selectedUserId).subscribe(()=>{
      this.getAllUsers()
      this.isOpenDeleteDialog = false;
      this.tosterPopup()
    })
  }

  sortData(sort: Sort) {
    const data = this.userData?.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data?.sort((a?:any, b?:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return compare(a.username, b.username, isAsc);
        case 'phonenumber':
          return compare(a.phonenumber, b.phonenumber, isAsc);
        case 'emailid':
          return compare(a.emailid, b.emailid, isAsc);
        default:
          return 0;
      }
    });
  }

 
  drop(event:any) {
    moveItemInArray(this.sortedData,event.previousIndex,event.currentIndex)
  } 

 

 removeDuplicates(arr:any) {
  return [...new Set(arr)]
 }

  removeItemAll(arr:any, value:any) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

 getCheckdData(data:any) {
     if(data.target.checked) {
      this.checkedArray.push(data.target.value)
      this.multipleId = this.removeDuplicates(this.checkedArray)

     } else {
       this.multipleId = this.removeItemAll(this.checkedArray,data.target.value)
     }
 }

 bulkDelete() {
  this.api.deleteMultipleUser(this.multipleId).subscribe((response:any)=>{
  this.isOpenBulkDeleteDialog = false;
  this.tosterPopup()
  this.getAllUsers()

  })
}

tosterPopup(){
  this.isTosterPopup = true
  setTimeout(()=>{
      this.isTosterPopup = false;
  },2000);
}


}



function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

