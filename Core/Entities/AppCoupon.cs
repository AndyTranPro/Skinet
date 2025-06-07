using System;

namespace Core.Entities;

public class AppCoupon
{
    // Name, AmountOff?, PercentOff?, PromotionCode and CouponId
    public string Name { get; set; }
    public decimal? AmountOff { get; set; }
    public decimal? PercentOff { get; set; }
    public string PromotionCode { get; set; }
    public string CouponId { get; set; }
}
