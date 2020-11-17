import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Menu} from '../datatypes/menu';

@Component({
  selector: 'app-componentsmodal-menu',
  templateUrl: './componentsmodal-menu.component.html',
  styleUrls: ['./componentsmodal-menu.component.css']
})
export class ComponentsmodalMenuComponent implements OnInit {

  menu:Menu;
  isOnboarded:boolean;
  vSpecialInstructions:string="";

  constructor(
    public dialogRef: MatDialogRef<ComponentsmodalMenuComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
  ) { }

  ngOnInit(): void {
    this.menu=this.modalData.menu
    this.isOnboarded=this.modalData.isOnboarded
  }

  closeModal(a:string) {
    if(a!='0'){
    this.dialogRef.close({order:a,specialInstruction:this.vSpecialInstructions});}
    else{
      this.dialogRef.close({order:a})
    }
  }
  addItem(){
    this.closeModal('1')
  }

}
