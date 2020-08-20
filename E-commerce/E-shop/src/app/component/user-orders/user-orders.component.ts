import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  orders : Order[]=[];

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.collectOrders();
  }

  collectOrders(){
    this.orderService.getUserOrder().subscribe({
      next :(orders)=>{
        this.orders =orders;
        console.log(orders);
      }
    })
  }

}
