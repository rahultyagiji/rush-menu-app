import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuDisplay} from '../datatypes/menu';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-componentsmodal-menu',
  templateUrl: './componentsmodal-menu.component.html',
  styleUrls: ['./componentsmodal-menu.component.css']
})
export class ComponentsmodalMenuComponent implements OnInit {

  menu:MenuDisplay;
  isOnboarded:boolean;
  isCafeAvailable:boolean;
  vSpecialInstructions:string="";
  selectionOption:string=""
  optionText: string="";
  optionPrice: number=0;

  public extras: Array<{ "name": string, "extraPrice": number, "selected":boolean }> = [];
  public extrasAdded: Array<{ "text": string, "price": number }> = [];

  constructor(
    public dialogRef: MatDialogRef<ComponentsmodalMenuComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.menu=this.modalData.menu
    this.isOnboarded=this.modalData.isOnboarded
    this.isCafeAvailable = this.modalData.isAvailable


    if(typeof this.menu.extra!='undefined')
    {
      for(var i=0; i<this.menu.extra.length;i++){
        this.extras.push({name:this.menu.extra[i].name, extraPrice:this.menu.extra[i].extraPrice, selected:false})
      }

    }
  }

  closeModal(a:string) {
    if(a!='0'){

      for(var i=0; i<this.extras.length;i++) {
        if(this.extras[i].selected){
          this.extrasAdded.push({
            text: this.extras[i].name,
            price: this.extras[i].extraPrice
          })
        }
      }


    this.dialogRef.close({
      order:a,
      specialInstruction: this.vSpecialInstructions,
      option: { text: this.optionText, price: this.optionPrice },
      extras: this.extrasAdded,

    });}
    else{
      this.dialogRef.close({order:a})
    }
  }
  addItem(){
    if(typeof this.menu.option !='undefined') {
      if (this.menu.option.length > 0) {
          if (this.optionText != ''){
            this.closeModal('1');
            this.toastr.success('item added','',{
              positionClass: 'toast-center-center',
              timeOut: 1000
            });
          }
          else{
            alert("Please select an option")
          }
      }
    }
    else{
      this.closeModal('1');
    }

  }

  showValuePromptText(option, args){
    this.optionText = args;
    this.optionPrice = this.menu.option[this.menu.option.findIndex(x => x.name === args)].extraPrice
  }

  list_change(args, i){
    if ( args.checked){
      this.extras[i].selected = true;
    }
    else{
      this.extras[i].selected = false;
    }
  }

}
