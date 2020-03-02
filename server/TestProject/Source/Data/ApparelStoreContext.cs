using Microsoft.EntityFrameworkCore;

namespace ApparelStore.Data
{
    public class ApparelStoreContext : DbContext
    {
        public ApparelStoreContext(
            DbContextOptions<ApparelStoreContext> options)
            : base(options)
        {
        }

        public DbSet<ApparelStore.Models.Clothing> Clothing { get; set; }
    }
}