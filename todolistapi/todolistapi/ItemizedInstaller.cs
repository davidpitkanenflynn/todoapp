using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using todolistapi.IServices;
using todolistapi.Services;

namespace todolistapi
{
    public class ItemizedInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            //Need to Register controllers explicitly in your container
            //Failing to do so Will receive Exception:

            //> An error occurred when trying to create //a controller of type
            //> 'xxxxController'. Make sure that the controller has a parameterless
            //> public constructor.

            //Reason::Basically, what happened is that you didn't register your controllers explicitly in your container. 
            //Windsor tries to resolve unregistered concrete types for you, but because it can't resolve it (caused by an error in your configuration), it return null.
            //It is forced to return null, because Web API forces it to do so due to the IDependencyResolver contract. 
            //Since Windsor returns null, Web API will try to create the controller itself, but since it doesn't have a default constructor it will throw the "Make sure that the controller has a parameterless public constructor" exception.
            //This exception message is misleading and doesn't explain the real cause.

            container.Register(Classes.FromThisAssembly()
                                  .BasedOn<IHttpController>()
                                  .LifestylePerWebRequest()); //***
                 container.Register(
                     Component.For<IMongohelper>().ImplementedBy<Mongohelper>()
                 );
        }
    }
   
}