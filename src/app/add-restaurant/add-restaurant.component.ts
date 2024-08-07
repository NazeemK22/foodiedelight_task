import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  restaurantForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private router: Router, private snackBar: MatSnackBar) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      contact: ['', Validators.required],
      hours: ['', Validators.required],
      cuisine: ['', Validators.required],
      image: ['']
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.restaurantForm.patchValue({ image: this.selectedImage });
      };
    }
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      const restaurantData = this.restaurantForm.value;
      this.restaurantService.addRestaurant(restaurantData).subscribe(
        response => {
          console.log('Restaurant added:', response);
          this.openSnackBar('Restaurant added successfully!', 'Close');
          this.router.navigate(['/list']);
        },
        error => {
          console.error('Error adding restaurant:', error);
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
