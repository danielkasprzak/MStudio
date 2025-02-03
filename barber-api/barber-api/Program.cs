using barber_api.Services;
using barber_api.Data;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using barber_api.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .WithHeaders("Content-Type", "X-XSRF-TOKEN")
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .AllowCredentials();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddGoogle(options =>
{
    IConfigurationSection configurationSection = builder.Configuration.GetSection("Authentication:Google");

    options.ClientId = configurationSection["ClientId"] ?? throw new ArgumentNullException("ClientId");
    options.ClientSecret = configurationSection["ClientSecret"] ?? throw new ArgumentNullException("ClientSecret");
}).AddJwtBearer(options =>
{
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var token = context.Request.Cookies["MSTOKEN"];
            if (token != null)
                context.Token = token;
            
            return Task.CompletedTask;
        }
    };
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer"),
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key")))
    };
});

builder.Services.AddHttpClient();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("admin"));
});


builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<OfferService>();
builder.Services.AddScoped<OpeningHoursService>();
builder.Services.AddScoped<SpecialOpeningHoursService>();
builder.Services.AddScoped<ReservationsService>();
builder.Services.AddScoped<StatisticsService>();

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/openapi/v1.json", "Barber API v1"));
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    context.Response.Headers.Add("Content-Security-Policy", "script-src 'self' https://accounts.google.com/gsi/client; frame-src 'self' https://accounts.google.com/gsi/; connect-src 'self' https://accounts.google.com/gsi/;");
    await next();
});

app.UseMiddleware<TokenRefreshMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
