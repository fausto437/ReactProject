using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Data
{
    public class UserList
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string NameList { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
