using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Data
{
    public class ListModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ElementModel> Elements { get; set; }
    }
}
