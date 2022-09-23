import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  data:any;

  constructor(private dialog:MatDialog, private api:ApiService){}

  ngOnInit(): void {
    this.getClientDetails();
  }

  openDialog() {
    this.dialog.open(EditProfileComponent, {
        width:'50%'
    }).afterClosed().subscribe( val => {
      if(val === 'save'){
        this.getClientDetails();
      }
    })
  }
  
  getClientDetails(){
    this.api.getData()
    .subscribe({
      next:(res) => {
        console.table(res);
        this.data = res
      },
      error:(err) => {
        alert("Error While Fetching Data")
      }
    })
  }


  editProfile(item:any){
    this.dialog.open(EditProfileComponent, {
      width:'50%',
      data:item
    }).afterClosed().subscribe( val => {
      if(val === 'update'){
        this.getClientDetails();
      }
    })

  }


}
