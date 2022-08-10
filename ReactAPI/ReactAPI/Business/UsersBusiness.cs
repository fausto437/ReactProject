using ReactAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Business
{
    public interface IUsersBusiness{
        int GetUser(string usr, string pss);
        UserAddressModel GetUserAddress(int userId);
        bool UpdateAddress(UserAddressModel addressModel);

        ListModel GetUserList(int userId);

        bool InsertElement(ElementModel elementModel);
        bool ModifyElement(ElementModel elementModel);
        bool DeleteElement(int elementId);
    }
    public class UsersBusiness : IUsersBusiness
    {
        //IUserData
        private readonly IUsersData _userData;

        public UsersBusiness(IUsersData userData) {
            _userData = userData;
        }
        public int GetUser(string usr, string pss) {
            try {
                var user = _userData.GetUser(usr, pss);
                if (user != null)
                {
                    return user.Id;
                }
                else {
                    return 0;
                }
            }
            catch (Exception e){
                return 0;
            }
        }

        public UserAddressModel GetUserAddress(int userId) {
            UserAddressModel usrAdd = new UserAddressModel();
            var address = _userData.GetUserAddress(userId);
            if (address != null) {
                usrAdd.Id = address.Id;
                usrAdd.address = address.Address;
                usrAdd.City = address.City;
                usrAdd.Country = address.Country;
                usrAdd.Email = address.Email;
                usrAdd.Phone = address.Phone;

                if (address.PictureId != null) {
                    usrAdd.Picture = _userData.GetUserPic(address.PictureId.Value);
                }
            }
            return usrAdd;
        }

        public bool UpdateAddress(UserAddressModel addressModel) {
            UserAddress updAddress = _userData.GetAddressById(addressModel.Id) ;
            updAddress.Address = addressModel.address;
            updAddress.City = addressModel.City;
            updAddress.Country = addressModel.Country;
            updAddress.Email = addressModel.Email;
            updAddress.ModifiedOn = DateTime.Now;
            updAddress.Phone = addressModel.Phone;
            if (addressModel.Picture != null) {
                UserPicBinary picB = new UserPicBinary();
                picB.PictureBinary = addressModel.Picture;
                if (updAddress.PictureId != null) {
                    picB.Id = updAddress.PictureId.Value;
                    _userData.UpdatePicBinary(picB);
                }
                else{
                    updAddress.PictureId =  _userData.InsertPicBinary(picB);
                }
            }

            _userData.UpdateAddress(updAddress);
            return true;
        }

        public ListModel GetUserList(int userId) {
            ListModel list = new ListModel();
            var listInfo = _userData.GetListInfo(userId);
            if (listInfo!=null) {
                list.Id = listInfo.Id;
                list.Name = listInfo.NameList;
                var elementsList = _userData.GetElementsByListId(list.Id);
                if (elementsList != null) {
                    list.Elements = elementsList.Select(e =>
                    {
                        ElementModel elementList = new ElementModel();
                        elementList.Id = e.Id;
                        elementList.ElementName = e.ElementName;
                        return elementList;
                    }).ToList();
                }
            }
            return list;
        }

        public bool InsertElement(ElementModel elementModel) {
            ElementList newElement = new ElementList();
            newElement.ElementName = elementModel.ElementName;
            newElement.ListId = elementModel.ListId;
            _userData.InsertElement(newElement);
            return true;
        }

        public bool ModifyElement(ElementModel elementModel) {
            ElementList updElement = _userData.GetElementsById(elementModel.Id);
            updElement.ElementName = elementModel.ElementName;
            _userData.UpdateElement(updElement);
            return true;
        }

        public bool DeleteElement(int idElement)
        {
            _userData.DeleteElement(idElement);
            return true;
        }
    }
}
