using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
//using todoapi.Models;
using todolistapi.Models;
using MongoDB.Driver;
using todolistapi.Services;
using todolistapi.IServices;


namespace todolistapi.Controllers
{
    public class ItemizedsController : ApiController
    {
        private todolistapiContext db = new todolistapiContext();
        //public const string ConnectionString = "mongodb://serviceappdbuser:flynnserviceapp@simpletodolistapplicationdb-shard-00-00-rkhbn.mongodb.net:27017,simpletodolistapplicationdb-shard-00-01-rkhbn.mongodb.net:27017,simpletodolistapplicationdb-shard-00-02-rkhbn.mongodb.net:27017/test?ssl=true&replicaSet=simpletodolistapplicationdb-shard-0&authSource=admin&retryWrites=true";
        //public const string ConnectionString2 = "mongodb://admin:grade123@ds139944.mlab.com:39944/simpleapplicationdb";
        //public const string dbase = "simpleapp";
        //public const string collection = "todolist";
        private IMongohelper _mhelper;// = new Mongohelper();

        public ItemizedsController(IMongohelper mhelper)
        {
            this._mhelper = mhelper;
        }

        // GET: api/Itemizeds
        public List<Itemized> GetItemizeds()
        {
            return _mhelper.getCollections();
        }

        // GET: api/Itemizeds/5
        [ResponseType(typeof(Itemized))]
        public IHttpActionResult GetItemized(string id)
        {
            Itemized itemized = db.Itemizeds.Find(id);
            if (itemized == null)
            {
                return NotFound();
            }

            return Ok(itemized);
        }

        // PUT: api/Itemizeds/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutItemized(int id, Itemized itemized)
        {
            

            if (id != itemized.identifier)
            {
                return BadRequest();
            }

            _mhelper.editItem(itemized);
            return Ok();
        }

        // POST: api/Itemizeds
        [ResponseType(typeof(Itemized))]
        public IHttpActionResult PostItemized(Itemized itemized)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_mhelper.addItem(itemized))
            {
                return CreatedAtRoute("DefaultApi", new { id = itemized.Id }, itemized);
            }
            else return BadRequest();
        }

        // DELETE: api/Itemizeds/5
        [ResponseType(typeof(Itemized))]
        public IHttpActionResult DeleteItemized(int identifier)
        {

            if (_mhelper.deleteItem(identifier))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ItemizedExists(string id)
        {
            return db.Itemizeds.Count(e => e.Id == id) > 0;
        }
    }
}