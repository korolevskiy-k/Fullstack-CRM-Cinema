import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/interfaces';
import { PositionService } from 'src/app/shared/services/postion.service';
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false
  positionId: any
  modal: MaterialInstance
  form: FormGroup

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
      description: new FormControl(null, Validators.required)
      
    })

    this.loading = true
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
      description: position.description
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: null,
      cost: 1
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()
    const newposition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
      description: this.form.value.description
    }

    const completed = () => {
      this.modal.close()
      this.form.reset({name: '', cost: 1})
      this.form.enable()
    }

    if(this.positionId) {
      newposition._id = this.positionId
      this.positionService.update(newposition).subscribe(
        position => {
          const idx = this.positions.findIndex(P => P._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Изменения сохранены')
        }, error => 
          MaterialService.toast(error.error.message),
        completed
        )
    } else {

      this.positionService.create(newposition).subscribe(
        position => {
          MaterialService.toast('Позиция создана')
          this.positions.push(position)
        }, error => MaterialService.toast(error.error.message),        
        completed
      )
  }
}
  onDeletePosition(event: Event, position: Position){
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)

    if(decision) {
      this.positionService.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(response.messageString)
        }, error => MaterialService.toast(error.error.message)
      )
    }
  }

}
