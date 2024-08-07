import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modify-restaurant',
  templateUrl: './modify-restaurant.component.html',
  styleUrls: ['./modify-restaurant.component.css']
})
export class ModifyRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurantId!: string;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService, 
    private snackBar: MatSnackBar
  ) {
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

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;
    this.restaurantService.getRestaurant(this.restaurantId).subscribe((restaurant: Restaurant) => {
      this.restaurantForm.patchValue(restaurant);
      this.selectedImage = restaurant.image || null;
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
      const updatedRestaurant = this.restaurantForm.value;
      this.restaurantService.updateRestaurant(this.restaurantId, updatedRestaurant).subscribe(
        response => {
          console.log('Restaurant updated:', response);
          this.openSnackBar('Restaurant updated successfully!', 'Close');
          this.router.navigate(['/list']);
        },
        error => {
          console.error('Error updating restaurant:', error);
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
