import { useGetDistrictQuery } from "../../../redux/features/districtSlice";
import Select from "../../shared/Select";

const DistrictManagement = () => {
  const { data: district, isloading } = useGetDistrictQuery();

  if (isloading) {
    return <div>Loading...</div>;
  }

  const data = district?.data;

  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "view", label: "View" },
  ];

  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="text-3xl pb-7 font-bold">
        <h2 className="text-lg font-semibold text-gray-800">
          District Management Dashboard
        </h2>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              S.N
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              District ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              District Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.district_id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.district_id}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.district_name}
              </td>
              <td className="px-4 py-3 text-sm">
                <Select options={actionOptions} placeholder="Action" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictManagement;
