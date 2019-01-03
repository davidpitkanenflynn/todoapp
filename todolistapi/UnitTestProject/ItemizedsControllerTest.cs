using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using todolistapi;
using todolistapi.Controllers;
using todolistapi.IServices;
using todolistapi.Models;
using todolistapi.Services;
using System.Web.Http;
using System.Net.Http;
using System.Web.Http.Results;

namespace UnitTestProject
{
    [TestClass]
    public class ItemizedsControllerTest
    {

        private Mock<Mongohelper> mockService = new Mock<Mongohelper>();
        private List<Itemized> listOfItemized = new List<Itemized>()
        { 
            new Itemized { Name = "fake item 1", identifier = 1 },
            new Itemized { Name = "Number 2", identifier = 2 },
            new Itemized { Name = "Number 3", identifier = 3 }
        };


        [TestMethod]
        public void GetItemizeds()
        {

            var itemizedsController = new ItemizedsController(mockService.Object);

            mockService.Setup(x => x.getCollections()).Returns(listOfItemized);
            itemizedsController.GetItemizeds();

            // check that GetItemized returns the list from the mockService unaltered
            var result = itemizedsController.GetItemizeds();
            Assert.AreEqual(result, listOfItemized);
            
        }

        [TestMethod]
        public void DeleteItemized()
        {

            // Mock this class
            var itemizedsController = new ItemizedsController(mockService.Object);
            int itemIdTrue = 2;
            int itemIdFalse = 3;
            mockService.Setup(x => x.deleteItem(itemIdTrue)).Returns(true);
            mockService.Setup(x => x.deleteItem(itemIdFalse)).Returns(false);
            var nm = itemizedsController.DeleteItemized(itemIdTrue);

            // if service returns true method should return an ok result
            Assert.IsInstanceOfType(nm, typeof(OkResult));

            // if service returns false method should return BadRequestResult
            nm = itemizedsController.DeleteItemized(itemIdFalse);
            Assert.IsInstanceOfType(nm, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutItemized()
        {

            // Mock this class
            var itemizedsController = new ItemizedsController(mockService.Object);
            int itemIdTrue = 0;
            int itemIdFalse = 1;
            mockService.Setup(x => x.editItem(listOfItemized[itemIdTrue])).Returns(true);
            mockService.Setup(x => x.editItem(listOfItemized[itemIdFalse])).Returns(false);

            // if the identifier and object id match return ok Result
            var nm = itemizedsController.PutItemized(listOfItemized[itemIdTrue].identifier, listOfItemized[itemIdTrue]);
            Assert.IsInstanceOfType(nm, typeof(OkResult));

            // if the identifier and object id don't match return bad request result
            nm = itemizedsController.PutItemized(listOfItemized[itemIdTrue].identifier - 1, listOfItemized[itemIdTrue]);
            Assert.IsInstanceOfType(nm, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PostItemized()
        {

            // Mock this class
            var itemizedsController = new ItemizedsController(mockService.Object);
            int itemIdTrue = 0;
            int itemIdFalse = 1;
            mockService.Setup(x => x.addItem(listOfItemized[itemIdTrue])).Returns(true);
            mockService.Setup(x => x.addItem(listOfItemized[itemIdFalse])).Returns(false);

            IHttpActionResult nm = itemizedsController.PostItemized(listOfItemized[itemIdTrue]);
            var createdResult = nm as CreatedAtRouteNegotiatedContentResult<Itemized>;

            // check that CreatedAtRoute IHttpActionResult is created and when database service returns true that
            // that it returns the added item
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(createdResult.Content, listOfItemized[itemIdTrue]);

            // check when service returns false that BadRequestResult is returned
            nm = itemizedsController.PostItemized(listOfItemized[itemIdFalse]);
            Assert.IsInstanceOfType(nm, typeof(BadRequestResult));
            
        }
    }
}