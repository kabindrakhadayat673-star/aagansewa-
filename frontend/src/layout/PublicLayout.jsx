import { Outlet } from "react-router-dom";
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow"></header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
