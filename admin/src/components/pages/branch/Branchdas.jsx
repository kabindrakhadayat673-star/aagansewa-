import { useGetbranchQuery, useDeletebranchMutation } from "../../../redux/features/branchSlice";

import Select from "../../shared/Select";

const BranchManagement = () => {
  const { data: branch, isloading } = useGetbranchQuery();
  const [deleteBranch] = useDeletebranchMutation();

  if (isloading) {
    return <div>Loading...</div>;
  }

  const data = branch?.data;

  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "view", label: "View" },
  ];

  const handleActionChange = async (action, branchId, branchName) => {
    if (action === "Delete") {
      const confirmed = window.confirm(
        `Are you sure you want to permanently delete branch "${branchName}"? This action cannot be undone.`
      );
      
      if (confirmed) {
        try {
          await deleteBranch(branchId).unwrap();
          alert("Branch deleted successfully!");
        } catch (error) {
          console.error("Delete error:", error);
          alert(`Failed to delete branch: ${error?.data?.message || "Please try again."}`);
        }
      }
    }
  };

  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="text-3xl pb-7 font-bold">
        <h2 className="text-lg font-semibold text-gray-800">
          Branch Management Dashboard
        </h2>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              S.N
            </th>
            
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Branch Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.branch_id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
              
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.branch_name}
              </td>
              <td className="px-4 py-3 text-sm">
                <Select 
                  options={actionOptions} 
                  placeholder="Action"
                  onChange={(e) => handleActionChange(e.target.value, item.branch_id, item.branch_name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchManagement;
