using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using todolistapi.Models;
using todolistapi.IServices;

namespace todolistapi.Services
{
    public class ItemizedRepository : IItemizedRepository
    {


        public const string ConnectionString = "mongodb://serviceappdbuser:flynnserviceapp@simpletodolistapplicationdb-shard-00-00-rkhbn.mongodb.net:27017,simpletodolistapplicationdb-shard-00-01-rkhbn.mongodb.net:27017,simpletodolistapplicationdb-shard-00-02-rkhbn.mongodb.net:27017/test?ssl=true&replicaSet=simpletodolistapplicationdb-shard-0&authSource=admin&retryWrites=true";
        public const string dbase = "simpleapp";
        public const string collection_name = "todolist";

        public List<Itemized> getCollections
        {
            get{ 
                IMongoCollection<Itemized> col = getMongoCollection;
                List<Itemized> resultDoc = col.AsQueryable().ToList();
             return resultDoc;
            }
        }

        private IMongoCollection<Itemized> getMongoCollection
        {

            get { 
            var dbClient = new MongoClient(ConnectionString);
            return dbClient.GetDatabase(dbase).GetCollection<Itemized>(collection_name);
            }
        }

        

        public virtual bool editItem(Itemized itemized)
        {
            var things = getMongoCollection;
            var builderFilter = Builders<Itemized>.Filter.Eq("identifier", itemized.identifier);
            var newResult = Builders<Itemized>.Update.Set("Name", itemized.Name);
            var result = things.UpdateOne(builderFilter, newResult);

            return result.IsAcknowledged;
            
        }

        public virtual bool addItem(Itemized itemized)
        {
            var things = getMongoCollection; //db.GetCollection<Itemized>(collection);
            if (things != null)
            {
                things.InsertOne(itemized);
                return true;
            }
            else return false;
        }

        public virtual bool deleteItem(int identifier)
        {
            var things = getMongoCollection; //db.GetCollection<Itemized>(collection);
            var deleted = things.DeleteOne(x => x.identifier == identifier);

            return deleted.IsAcknowledged;

        }

    }
}