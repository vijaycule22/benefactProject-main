using BenefactServer.Business;
using BenefactServer.Core;
using BenefactServer.Data;
using BenefactServer.DataRepository;
using BenefactServer.Model;
using Microsoft.EntityFrameworkCore;

namespace BenefactServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            string connstring = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<MT_Context>(options =>
            options.UseSqlServer(connstring));
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            LoadDepencyies(builder);

            var app = builder.Build();
            app.UseCors(x =>
            x.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin());
            app.UseCors("AllowOrigin");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
               app.UseDeveloperExceptionPage();
            }
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            //app.UseHangfireDashboard();

            app.MapControllers();

            app.Run();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllers();
            //    //endpoints.MapHangfireDashboard();
            //});

            HangFireJobs.DisplayingHangFire(builder, app);
        }

        private static void LoadDepencyies(WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IUser, UserService>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ICommonService, CommonService>();
        }
    }
}