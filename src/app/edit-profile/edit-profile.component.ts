import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  genders = ["Male", "Female"];

  actionbtn:string = "Save";

  profileForm !: FormGroup;

  constructor(private formBuilder:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef:MatDialogRef<EditProfileComponent>) { 

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      clientName: ['',Validators.required],
      clientDomain: ['',Validators.required],
      clientGender: ['',Validators.required],
      clientDOB: ['',[Validators.required]],
      clientContact: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)]],
      clientLocation:['',[Validators.required,Validators.minLength(5)]]
    })

    if(this.editData){
      this.actionbtn = "Update"
      this.profileForm.controls['clientName'].setValue(this.editData.clientName);
      this.profileForm.controls['clientDomain'].setValue(this.editData.clientDomain);
      this.profileForm.controls['clientGender'].setValue(this.editData.clientGender);
      this.profileForm.controls['clientDOB'].setValue(this.editData.clientDOB);
      this.profileForm.controls['clientContact'].setValue(this.editData.clientContact);
      this.profileForm.controls['clientLocation'].setValue(this.editData.clientLocation);
    }
  }

  updateClientData(){
    if(!this.editData){
      if(this.profileForm.valid){
        this.api.postData(this.profileForm.value)
        .subscribe({
          next:(res) => {
            alert("Profile Details Updated")
            this.profileForm.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            alert("Something Went Wrong !!!")
          }
        })
      }
    }
    else{
      this.updateClient()
    }
  }
  updateClient() {
    this.api.putData(this.profileForm.value,this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Client Details Updated")
        this.profileForm.reset();
        this.dialogRef.close('update');
      },
      error:() => {
        alert("Error While Updating Data")
      }
    })
  }

}
