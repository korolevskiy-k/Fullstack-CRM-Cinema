import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Position, Seans } from 'src/app/shared/interfaces';
import { PositionService } from 'src/app/shared/services/postion.service';
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { SeansService } from '../shared/services/seans.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './seans-page.component.html',
  styleUrls: ['./seans-page.component.css']
})
export class SeansPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('seansId') seansId: string
  @ViewChild('modal') modalRef: ElementRef
  seans: Seans[] = []
  loading = false
  modal: MaterialInstance
  form: FormGroup

  constructor(private seansService: SeansService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.loading = true
    this.seansService.fetch().subscribe(seans => {
      this.seans = seans
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(seans: Seans) {
    this.seansId = seans._id
    this.form.patchValue({
      name: seans.name,
      // cost: position.cost,
      // description: position.description
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.seansId = null
    this.form.reset({
      name: null,
     // cost: 1
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()
    const newseans: Seans = {
      name: this.form.value.name
      // cost: this.form.value.cost,
      // category: this.categoryId,
      // description: this.form.value.description
    }

    const completed = () => {
      this.modal.close()
      this.form.reset({name: ''})
      this.form.enable()
    }

  //   if(this.seansId) {
  //     newseans._id = this.seansId
  //     this.seansService.update(newseans).subscribe(
  //       position => {
  //         const idx = this.positions.findIndex(P => P._id === position._id)
  //         this.positions[idx] = position
  //         MaterialService.toast('Изменения сохранены')
  //       }, error => 
  //         MaterialService.toast(error.error.message),
  //       completed
  //       )
  //   } else {

  //     this.positionService.create(newposition).subscribe(
  //       position => {
  //         MaterialService.toast('Позиция создана')
  //         this.positions.push(position)
  //       }, error => MaterialService.toast(error.error.message),        
  //       completed
  //     )
  // }
// }
//   onDeletePosition(event: Event, position: Position){
//     event.stopPropagation()
//     const decision = window.confirm(`Удалить позицию "${position.name}"?`)

//     if(decision) {
//       this.positionService.delete(position).subscribe(
//         response => {
//           const idx = this.positions.findIndex(p => p._id === position._id)
//           this.positions.splice(idx, 1)
//           MaterialService.toast(response.messageString)
//         }, error => MaterialService.toast(error.error.message)
//       )
//     }
//   }

  }}
