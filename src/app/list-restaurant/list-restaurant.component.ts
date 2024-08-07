import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.css']
})
export class ListRestaurantComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'location', 'contact', 'hours', 'cuisine', 'image', 'actions'];
  dataSource = new MatTableDataSource<Restaurant>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private restaurantService: RestaurantService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteRestaurant(id: string): void {
    this.restaurantService.deleteRestaurant(id);
    this.openSnackBar('Restaurant deleted successfully!', 'Close');
    this.ngOnInit();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
