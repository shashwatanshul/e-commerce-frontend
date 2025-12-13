import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import userLogo from "../assets/user.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyOrder from "./MyOrder";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    }); // preview only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      // Use FormData for text + file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file); // image file for backend multer
      }

      const res = await axios.put(
        `https://e-commerce-l3ci.vercel.app/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center px-4 sm:px-6 lg:px-8">
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="py-6">
            <div className="flex flex-col justify-center items-center bg-gray-100">
              <h1 className="font-bold mb-7 text-2xl text-gray-800">
                Update Profile
              </h1>
              <div className="w-full flex flex-col md:flex-row gap-10 justify-center items-start max-w-4xl mx-auto">
                {/* Profile Picture */}
                <div className="flex flex-col items-center w-full md:w-auto">
                  <div className="relative group">
                     <img
                        src={updateUser?.profilePic || userLogo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-pink-600 shadow-md"
                      />
                  </div>
                 
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-sm">
                    Change Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>

                {/* Profile Form */}
                <div className="w-full md:flex-1 bg-white shadow-lg p-6 rounded-xl border border-gray-100">
                    <form
                      className="space-y-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="block text-sm font-medium mb-1">
                            First Name
                          </Label>
                          <Input
                            type="text"
                            name="firstName"
                            value={updateUser.firstName}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium mb-1">
                            Last Name
                          </Label>
                          <Input
                            type="text"
                            name="lastName"
                            value={updateUser.lastName}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="block text-sm font-medium mb-1">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          value={updateUser.email}
                          disabled
                          className="w-full bg-gray-50 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <Label className="block text-sm font-medium mb-1">
                          Phone Number
                        </Label>
                        <Input
                          type="text"
                          name="phoneNo"
                          placeholder="Enter Your Contact Number"
                          value={updateUser.phoneNo}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label className="block text-sm font-medium mb-1">Address</Label>
                        <Input
                          type="text"
                          name="address"
                          placeholder="Enter Your Address"
                          value={updateUser.address}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="block text-sm font-medium mb-1">City</Label>
                          <Input
                            type="text"
                            name="city"
                            placeholder="Enter Your City"
                            value={updateUser.city}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium mb-1">
                            Zip Code
                          </Label>
                          <Input
                            type="text"
                            name="zipCode"
                            placeholder="Enter Your ZipCode"
                            value={updateUser.zipCode}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition-colors"
                      >
                        Update Profile
                      </Button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
