using System.Collections.Generic;

namespace API.DtOs
{
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketitemDto> Items { get; set; }
    }
}