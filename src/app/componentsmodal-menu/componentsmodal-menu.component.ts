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

  constructor(
    public dialogRef: MatDialogRef<ComponentsmodalMenuComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
  ) { }

  ngOnInit(): void {
    this.menu=this.modalData.menu
    this.isOnboarded=this.modalData.isOnboarded
  }

  actionFunction() {
    this.closeModal('0');
  }

  closeModal(a:string) {
    this.dialogRef.close(a);
  }
  addItem(){
    this.closeModal('1')
  }

}
