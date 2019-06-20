import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatListModule,
    Material.MatButtonToggleModule,
    Material.MatBadgeModule,
    Material.MatDialogModule,
    Material.MatSortModule,
    Material.MatToolbarModule,
    Material.MatTooltipModule,
    Material.MatAutocompleteModule,
    Material.MatSelectModule,
    Material.MatGridListModule,
    Material.MatDialogModule
  ],
  exports:[
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatListModule,
    Material.MatButtonToggleModule,
    Material.MatBadgeModule,
    Material.MatDialogModule,
    Material.MatSortModule,
    Material.MatToolbarModule,
    Material.MatTooltipModule,
    Material.MatAutocompleteModule,
    Material.MatSelectModule,
    Material.MatGridListModule,
    Material.MatDialogModule


  ]
})
export class MaterialModule { }
