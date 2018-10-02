using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace gamify.Models
{
    public partial class gamifyContext : DbContext
    {
        public gamifyContext()
        {
        }

        public gamifyContext(DbContextOptions<gamifyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Game> Game { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>(entity =>
            {
                entity.Property(e => e.GameImageName).HasMaxLength(100);

                entity.Property(e => e.GameImageType).HasMaxLength(20);
            });
        }
    }
}
