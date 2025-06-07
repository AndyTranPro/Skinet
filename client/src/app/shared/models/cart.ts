import { nanoid } from 'nanoid';

export type Coupon = {
    couponId: string;
    promotionCode: string;
    name: string;
    amountOff?: number;
    percentOff?: number;
}

export type CartType = {
    id: string;
    items: CartItem[];
    deliveryMethodId?: number;
    paymentIntentId?: string;
    clientSecret?: string;
    coupon?: Coupon;
}

export type CartItem = {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Cart implements CartType {
    id = nanoid();
    items: CartItem[] = [];
    deliveryMethodId?: number;
    paymentIntentId?: string;
    clientSecret?: string;
    coupon?: Coupon;
}