using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Data
{
    public class UserPicBinary
    {
        public int Id { get; set; }
        public byte[] PictureBinary { get; set; }
    }
}
