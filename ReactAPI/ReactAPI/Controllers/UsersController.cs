using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ReactAPI.Business;
using ReactAPI.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<UsersController> _logger;
        private readonly IUsersBusiness _userBusiness;

        public UsersController(ILogger<UsersController> logger,
            IUsersBusiness userBusiness)
        {
            _logger = logger;
            _userBusiness = userBusiness;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]")]
        public int GetUser(string usr, string pss)
        {
            return _userBusiness.GetUser(usr, pss);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]")]
        public string GetUserAddress(int userId)
        {
            var model = _userBusiness.GetUserAddress(userId);
            return JsonConvert.SerializeObject(model);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public bool UpdateUserAddress([FromForm] IFormFile Picture, [FromForm]UserAddressModel addressModel)
        {
            try {
                if (Picture != null)
                {
                    addressModel.Picture = ReadFully(Picture.OpenReadStream());
                }
                else {
                    addressModel.Picture = null;
                }
                return _userBusiness.UpdateAddress(addressModel);
            }
            catch (Exception e) {
                return false;
            }
        }

        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]")]
        public string GetUserList(int userId)
        {
            var model = _userBusiness.GetUserList(userId);
            return JsonConvert.SerializeObject(model);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public bool InsertElementToList(ElementModel elementModel)
        {
            try
            {
                return _userBusiness.InsertElement(elementModel);
            }
            catch (Exception e)
            {
                return false;
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public bool ModifyElementToList(ElementModel elementModel)
        {
            try
            {
                return _userBusiness.ModifyElement(elementModel);
            }
            catch (Exception e)
            {
                return false;
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("[action]")]
        public bool DeleteElementToList(int idElement)
        {
            try
            {
                return _userBusiness.DeleteElement(idElement);
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
