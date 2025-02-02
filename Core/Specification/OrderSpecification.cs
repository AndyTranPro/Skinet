using System;
using Core.Entities.OrderAggregate;

namespace Core.Specification;

public class OrderSpecification : BaseSpecification<Order>
{
    public OrderSpecification(string email) : base(x => x.BuyerEmail == email)
    {
        AddInclude(x => x.OrderItems);
        AddInclude(x => x.DeliveryMethod);
        AddOrderByDesc(x => x.OrderDate);
    }

    public OrderSpecification(int id, string email) : base(x => x.Id == id && x.BuyerEmail == email)
    {
        AddInclude("OrderItems");
        AddInclude("DeliveryMethod");
    }

}
