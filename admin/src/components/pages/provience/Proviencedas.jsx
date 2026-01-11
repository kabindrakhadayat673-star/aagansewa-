import { useState } from "react";
import DetailsModal from "../../shared/Model";
import Select from "../../shared/Select";
import { useGetProvienceQuery } from "../../../redux/features/provienceSlice";

const ProvienceManagement = () => {
  const [selectedProvience, setSelectedProvience] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const { data: provience, isLoading } = useGetProvienceQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const data = provience.data || [];
  console.log(data);
  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "view", label: "View" },
  ];
  const handleActionChange = (e, provience) => {
    const action = e.target.value;
    if (action == "view") {
      setSelectedProvience(provience);
      setShowModel(true);
    }
    e.target.value = "";
  };

  return (
    <>
      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <div className="text-3xl pb-7 font-bold">
          <h1>Provience Management</h1>
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.provience_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {item.province_id}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {item.province_name}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Select
                    options={actionOptions}
                    placeholder="Action"
                    onChange={(e) => handleActionChange(e, item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailsModal
        show={showModel}
        onClose={() => setShowModel(false)}
        title={`Districts in ${selectedProvience?.provience_name}`}
        size="lg"
      >
        <div className="space-y-2">
          {selectedProvience?.district ? (
            selectedProvience.district.split(",").map((district, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <span className="font-medium">{district}</span>
              </div>
            ))
          ) : (
            <div>No district Found</div>
          )}
        </div>
      </DetailsModal>
    </>
  );
};

export default ProvienceManagement;
