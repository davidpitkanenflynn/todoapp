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
       
        private IItemizedRepository _mhelper;

        public ItemizedsController(IItemizedRepository mhelper)
        {
            this._mhelper = mhelper;
        }

        // GET: api/Itemizeds
        public List<Itemized> GetItemizeds()
        {
            return _mhelper.getCollections;
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

    }
}