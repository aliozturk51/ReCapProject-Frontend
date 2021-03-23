import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  cars: Car[] = [];
  dataLoaded = false;
  apiUrl = 'https://localhost:44378/api/';
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        this.getImagesByCarId(params['carId']);
      }
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarsDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
}
