using Microsoft.EntityFrameworkCore;
using ReactAPI.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Data
{
    public interface IUsersData
    {
        Users GetUser(string usr, string pss);
        UserAddress GetUserAddress(int userId);
        UserAddress GetAddressById(int addressId);
        byte[] GetUserPic(int picId);

        int InsertPicBinary(UserPicBinary picB);
        void UpdatePicBinary(UserPicBinary picB);
        void UpdateAddress(UserAddress updAddress);

        UserList GetListInfo(int userId);

        List<ElementList> GetElementsByListId(int listId);

        void InsertElement(ElementList newElement);
        
        ElementList GetElementsById(int elementId);

        void UpdateElement(ElementList updElement);
        void DeleteElement(int idElement);
    }
    public class UsersData : DbContext, IUsersData
    {
        private readonly AppDbContext _context;

        public UsersData(AppDbContext context) {
            _context = context;
        }


        public Users GetUser(string usr, string pss) {
            var user = _context.Users.FirstOrDefault(u => u.UserName == usr && u.UserPassword == pss);

            if (user != null)
            {
                return user;
            }
            else {
                return null;
            }
        }

        public UserAddress GetUserAddress(int userId)
        {
            var address = _context.UserAddress.FirstOrDefault(u => u.UserId == userId);

            if (address != null)
            {
                return address;
            }
            else
            {
                return null;
            }
        }

        public UserAddress GetAddressById(int addressId)
        {
            var address = _context.UserAddress.FirstOrDefault(u => u.Id == addressId);

            if (address != null)
            {
                return address;
            }
            else
            {
                return null;
            }
        }

        public byte[] GetUserPic(int picId) {
            var pic = _context.UserPicBinary.FirstOrDefault(u => u.Id == picId);

            if (pic != null)
            {
                return pic.PictureBinary;
            }
            else
            {
                return null;
            }
        }

        public int InsertPicBinary(UserPicBinary picB) {
            _context.UserPicBinary.Add(picB);
            _context.SaveChanges();
            return picB.Id;
        }

        public void UpdatePicBinary(UserPicBinary picB)
        {
            _context.UserPicBinary.Update(picB);
        }

        public void UpdateAddress(UserAddress updAddress) {
            _context.UserAddress.Update(updAddress);
            _context.SaveChanges();
        }

        public UserList GetListInfo(int userId) {
            var list = _context.UserList.FirstOrDefault(u => u.UserId == userId);

            if (list != null)
            {
                return list;
            }
            else
            {
                return null;
            }
        }

        public List<ElementList> GetElementsByListId(int listId) {
            var list = _context.ElementList.Select(u => u).Where(e => e.ListId == listId);

            if (list.Count() > 0)
            {
                return list.ToList();
            }
            else
            {
                return null;
            }
        }

        public void InsertElement(ElementList newElement) {
            _context.ElementList.Add(newElement);
            _context.SaveChanges();
        }

        public ElementList GetElementsById(int elementId) {
            return _context.ElementList.FirstOrDefault(element => element.Id == elementId);
        }

        public void UpdateElement(ElementList updElement) {
            _context.ElementList.Update(updElement);
            _context.SaveChanges();
        }

        public void DeleteElement(int idElement) {
            _context.ElementList.Remove(_context.ElementList.FirstOrDefault(el=> el.Id== idElement));
            _context.SaveChanges();
        }
    }
}
