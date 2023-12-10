import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Component,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileserviceService } from 'src/app/core/services/file/fileservice.service';

@Component({
  selector: 'app-addcash',
  templateUrl: './addcash.component.html',
  styleUrls: ['./addcash.component.css']
})
export class AddcashComponent {

  // @ts-ignore
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddcashComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder,
    
  )  {
    this.form = this.fb.group({
      type: ['A', [Validators.required]],
      cash_value: [0, [Validators.required]],
      entry_date: [new Date()]
    });

    

  }

  onClose() {
    this.dialogRef.close(); // Close the dialog without saving anything
  }

  onSave() {
    this.dialogRef.close(this.form.value); // Close the dialog without saving anything
  }

}
