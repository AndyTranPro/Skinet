using System;

namespace API.Errors;

public class ApiErrorResponse(int StatusCode, string Message, string? Details)
{
    public int StatusCode { get; set; } = StatusCode;
    public string Message { get; set; } = Message;
    public string? Details { get; set; } = Details;
}
