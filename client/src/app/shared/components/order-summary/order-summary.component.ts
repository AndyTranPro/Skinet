import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe, Location, NgIf } from '@angular/common';
import { StripeService } from '../../../core/services/stripe.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-summary',
  imports: [
    MatButton,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput,
    CurrencyPipe,
    FormsModule,
    MatIcon,
    NgIf
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  location = inject(Location);
  private stripeService = inject(StripeService);
  code?: string;

  applyCouponCode() {
    // apply coupon to cart if code is entered
    if (!this.code) return;
    this.cartService.applyDiscount(this.code).subscribe({
      // if the coupon is valid, it will be applied to the cart
      next: async coupon => {
        const cart = this.cartService.cart();
        // if the cart exists, set the coupon and update the cart
        if (cart) {
          cart.coupon = coupon;
          // update the cart with the new coupon
          await firstValueFrom(this.cartService.setCart(cart));
          // if the user is in the checkout page, update the payment intent
          this.code = undefined;
          // this returns an observable so we use firstValueFrom to convert it to a promise
          if (this.location.path().includes('checkout')) {
            await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
          }
        }
      }
    })
  }

  async removeCouponCode() {
    const cart = this.cartService.cart();
    if (!cart) return;
    // if the cart exists, remove the coupon and update the cart
    if (cart.coupon) cart.coupon = undefined;
    await firstValueFrom(this.cartService.setCart(cart));
    // if the user is in the checkout page, update the payment intent
    if (this.location.path().includes('checkout')) {
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
    }
  }
}
