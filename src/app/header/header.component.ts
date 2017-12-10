import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    dish: Dish;
    promotion: Promotion;

    constructor(private dishservice: DishService,
        private promotionservice: PromotionService,
        private dialog: MdDialog) { }

    ngOnInit() {
        this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish);
        this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    }

    openLoginForm(){
        this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
    }


}
