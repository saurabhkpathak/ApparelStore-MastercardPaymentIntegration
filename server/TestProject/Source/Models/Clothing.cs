namespace ApparelStore.Models
{
    public class Clothing
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public decimal Price { get; set; }
        public string Color { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
    }
}