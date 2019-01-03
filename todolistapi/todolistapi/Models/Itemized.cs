using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace todolistapi.Models
{
    public class Itemized
    {
        //public ObjectId _Id { get; set; }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int identifier { get; set; }
    }
}