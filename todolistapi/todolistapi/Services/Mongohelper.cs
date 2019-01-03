using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using todolistapi.Models;
using todolistapi.IServices;

namespace todolistapi.Services
{
    public class Mongohelper : IMongohelper
    {
        //need edit, getItems, deleteItems, OneItem
        public const string ConnectionString = "mongodb://serviceappdbuser:flynnserviceapp@simpletodolistapplicationdb-shard-00-00-rkhbn.mongodb.net:27017,simpletodolistapplicationdb-shard-00-01-rkhbn.mongodb.net:27017,simpletodolistapplicationdb-shard-00-02-rkhbn.mongodb.net:27017/test?ssl=true&replicaSet=simpletodolistapplicationdb-shard-0&authSource=admin&retryWrites=true";
        //public const string ConnectionString2 = "mongodb://admin:grade123@ds139944.mlab.com:39944/simpleapplicationdb";
        public const string dbase = "simpleapp";
        public const string collection = "todolist";

        

        public static IMongoCollection<Itemized> getMongoCollection()
        {
            try
            {
                var dbClient = new MongoClient(ConnectionString);

                //IMongoDatabase db = dbClient.GetDatabase("simpleapplicationdb");
                //var things = db.GetCollection<Itemized>("todolist");
                //IMongoDatabase db = dbClient.GetDatabase("simpleapp");

                return dbClient.GetDatabase(dbase).GetCollection<Itemized>(collection);
            }
            catch {
                return null;
            }
        }

        public virtual List<Itemized> getCollections()
        {
            IMongoCollection<Itemized> col = getMongoCollection();
            if (col != null)
            {
                List<Itemized> resultDoc = col.AsQueryable().ToList();

                return resultDoc;
            }
            else return null;
        }

        public virtual bool editItem(Itemized itemized)
        {
            var things = getMongoCollection(); //db.GetCollection<Itemized>(collection);
            if (things != null)
            {
                var result = things.UpdateOne(Builders<Itemized>.Filter.Eq("identifier", itemized.identifier),
                    Builders<Itemized>.Update.Set("Name", itemized.Name));

                return result.MatchedCount == 1;
            }
            else return false;
        }

        public virtual bool addItem(Itemized itemized)
        {
            var things = getMongoCollection(); //db.GetCollection<Itemized>(collection);
            if (things != null)
            {
                things.InsertOne(itemized);
                return true;
            }
            else return false;
        }

        public virtual bool deleteItem(int identifier)
        {
            var things = getMongoCollection(); //db.GetCollection<Itemized>(collection);
            if (things != null)
            {
                var deleted = things.DeleteOne(x => x.identifier == identifier);

                return deleted.DeletedCount == 1;
            }
            else return false;
        }

    }
}