using Microsoft.EntityFrameworkCore;

namespace BenefactServer.Model
{
    public partial class MT_Context : DbContext
    {
        public MT_Context()
        {
        }

        public MT_Context(DbContextOptions<MT_Context>options):base(options)
        {
            Database.EnsureCreated();
        }
       public DbSet<MT_USER_INFO> UserDetails { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//- see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=10.9.176.202,50244;Database=BENEF_MASTER_LOANS;User ID =BENEF_MASTER_USER_LOANS;Password=133tcru@NOS;Persist Security Info=True;Integrated Security=False;TrustServerCertificate=True");
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
           
            builder.Entity<MT_USER_INFO>(entity =>
            {
                entity.HasKey(e => new { e.EMPLOYEE_ID});

                entity.ToTable("BENEFACT_USER_DETAILS_TBL", "BENEF_MASTER_SCHEMA_LOANS");
                
                entity.Property(e => e.EMPLOYEE_ID)
                  .HasMaxLength(32)
                  .HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.FIRST_NAME)
                  .HasMaxLength(32)
                  .HasColumnName("FIRST_NAME");

                entity.Property(e => e.LAST_NAME)
                  .HasMaxLength(32)
                  .HasColumnName("LAST_NAME");

                entity.Property(e => e.DOJ)
                  .HasMaxLength(50)
                  .HasColumnName("DOJ");

                entity.Property(e => e.PASSHASH)
                .HasMaxLength(128)
                .HasColumnName("PASSHASH");

                entity.Property(e => e.USER_TYPE)
                .HasMaxLength(1)
                .HasColumnName("USER_TYPE");

                entity.Property(e => e.EMAIL)
                .HasMaxLength(32)
                .HasColumnName("EMAIL");

                entity.Property(e => e.MOBILE_NUMBER)
                .HasMaxLength(32)
                .HasColumnName("MOBILE_NUMBER");
            });

            OnModelCreatingPartial(builder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
