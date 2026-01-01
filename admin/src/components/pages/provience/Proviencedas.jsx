import { useGetProvienceQuery, useDeleteprovienceMutation } from "../../../redux/features/provienceSlice";
import Select from "../../shared/Select";

const ProvienceManagement = () => {
  const { data: provience, isloading } = useGetProvienceQuery();
  const [deleteprovience] = useDeleteprovienceMutation();

  if (isloading) {
    return <div>Loading...</div>;
  }

  const data = provience?.data;

  const handleAction = async (action, provinceId) => {
    if (action === "Delete") {
      if (window.confirm("Are you sure you want to delete this province?")) {
        try {
          await deleteprovience({ id: provinceId }).unwrap();
        } catch (error) {
          console.error("Delete failed:", error);
        }
      }
    }
  };

  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "view", label: "View" },
  ];

  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="text-3xl pb-7 font-bold">
        <h2 className="text-lg font-semibold text-gray-800">
          Provience Management Dasboard
        </h2>
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
          {data?.map((item, index) => (
            <tr key={item.province_id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
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
                  onChange={(e) => handleAction(e.target.value, item.province_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProvienceManagement;
