import { useState } from "react";
import { toast } from "react-toastify";
import { useGetProvienceQuery } from "../../../redux/features/provienceSlice.js";
import {
  useAddManagerMutation,
  useDeleteManagerMutation,
  useEditManagerMutation,
  useGetManagerQuery,
} from "../../../redux/features/authSlice.js";
import { useGetPDBQuery } from "../../../redux/features/branchSlice.js";
import DetailsModal from "../../shared/Model";
import Select from "../../shared/Select";
import Input from "../../shared/input";

const ManagerManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingManagerId, setDeletingManagerId] = useState(null);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const { data: provinces } = useGetProvienceQuery();
  const [addManager] = useAddManagerMutation();
  const [deleteManager] = useDeleteManagerMutation();
  const [editManager] = useEditManagerMutation();

  const { data: districts } = useGetPDBQuery(
    { province_id: selectedProvince },
    { skip: !selectedProvince }
  );
  const { data: branches } = useGetPDBQuery(
    { district_id: selectedDistrict },
    { skip: !selectedDistrict }
  );

  const { data: managers } = useGetManagerQuery();

  const districtData = districts?.data || [];
  const provinceData = provinces?.data || [];
  const managerData = managers?.data || [];
  const branchData = branches?.data || [];

  console.log(provinceData);

  const provinceOptions = provinceData.map((p) => ({
    value: p.province_id,
    label: p.province_name,
  }));
  const districtOptions = districtData.map((d) => ({
    value: d.district_id,
    label: d.district_name,
  }));

  const branchOptions = branchData.map((b) => ({
    value: b.branch_id,
    label: b.branch_name,
  }));

  const handleAction = async (action, manager) => {
    if (action.target.value === "Delete") {
      try {
        setShowDeleteModal(true);
        setDeletingManagerId(manager);
      } catch (err) {
        toast.error("Failed to delete manager", err);
      }
    } else if (action.target.value === "Edit") {
      setIsEditing(true);
      setSelectedManager(manager);
      setFormData({
        name: manager.name || "",
        email: manager.email || "",
        phone: manager.phone || "",
        password: "",
        image: null,
      });
      setSelectedProvince(manager.province_id);
      setSelectedDistrict(manager.district_id);
      setSelectedBranch(manager.branch_id);

      setShowModal(true);
    } else if (action.target.value === "View") {
      setSelectedManager(manager);
      setShowViewModal(true);
    }
    action.target.value = "";
  };

  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "Edit", label: "Edit" },
    { value: "View", label: "View" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("manager_name", formData.name);
      formDataToSend.append("manager_email", formData.email);
      formDataToSend.append("manager_phone", formData.phone);
      if (formData.password) {
        formDataToSend.append("password", formData.password);
      }
      formDataToSend.append("role", "manager");
      formDataToSend.append("branch_id", selectedBranch);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (isEditing) {
        const result = await editManager({
          id: selectedManager.id,
          data: formDataToSend,
        }).unwrap();
        toast.success(result.message);
      } else {
        const result = await addManager(formDataToSend).unwrap();
        toast.success(result.message);
      }

      setShowModal(false);
      setIsEditing(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        image: null,
      });
    } catch (error) {
      toast.error(error.data?.message || "Failed to save manager");
    }
  };
  const handleDelete = async () => {
    await deleteManager(deletingManagerId.user_id).unwrap();
    toast.success(`${deletingManagerId.name || deletingManagerId.email} deleted successfully`);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Branch Manager Management
        </h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setSelectedProvince("");
            setSelectedDistrict("");
            setSelectedBranch("");
            setFormData({
              name: "",
              email: "",
              phone: "",
              password: "",
              image: null,
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Manager
        </button>
      </div>

      <DetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? "Edit Manager" : "Add Manager"}
        size="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Select
              label="Province"
              options={provinceOptions}
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedBranch("");
              }}
              placeholder="Select Province"
            />
            <Select
              label="District"
              options={districtOptions}
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedBranch("");
              }}
              placeholder="Select district"
              disabled={!selectedProvince}
            />

            <Select
              label="Branch"
              options={branchOptions}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              placeholder="Select Branch"
              disabled={!selectedDistrict}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Name"
              type="text"
              id="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Phone"
              type="tel"
              id="phone"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {isEditing ? "Update Manager" : "Add Manager"}
            </button>
          </div>
        </form>
      </DetailsModal>

      <DetailsModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Manager Details"
        size="2xl"
      >
        {selectedManager && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${selectedManager.img}`}
                alt={selectedManager.manager_name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedManager.name || 'N/A'}
                </h3>
                <p className="text-gray-600">Manager</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-900">{selectedManager.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="text-gray-900">N/A</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Branch
                </label>
                <p className="text-gray-900">{selectedManager.branch_id}</p>
              </div>
            </div>
          </div>
        )}
      </DetailsModal>

      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Manager"
        size="md"
      >
        <div>
          <p>Are you sure you want to delete this manager?</p>
          <strong>{deletingManagerId?.email}</strong>
          <div className="flex justify-end gap-3 pt-4">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </DetailsModal>

      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Manager Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Manager-email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {managerData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                  No Manager found
                </td>
              </tr>
            ) : (
              managerData.map((manager, index) => (
                <tr key={manager.user_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      {manager.name ? manager.name.charAt(0).toUpperCase() : manager.email.charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {manager.name || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {manager.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    N/A
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Select
                      options={actionOptions}
                      placeholder="Action"
                      onChange={(e) => handleAction(e, manager)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerManagement;
