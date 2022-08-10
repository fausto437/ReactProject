using Microsoft.EntityFrameworkCore;
using ReactAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
        public DbSet<UserAddress> UserAddress { get; set; }
        public DbSet<UserList> UserList { get; set; }
        public DbSet<ElementList> ElementList { get; set; }
        public DbSet<UserPicBinary> UserPicBinary { get; set; }
    }
}
