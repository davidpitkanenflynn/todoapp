using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todolistapi.Models;

namespace todolistapi.IServices
{
    public interface IMongohelper
    {
        // need get, delete, edit, insert
        List<Itemized> getCollections();
        bool editItem(Itemized itemized);
        bool addItem(Itemized itemized);
        bool deleteItem(int identifier);


    }
}
