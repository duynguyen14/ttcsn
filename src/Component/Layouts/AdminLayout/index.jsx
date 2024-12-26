import FooterAdmin from "./FooterAdmin";
import HeaderAdmin from "./HeaderAdmin";
import Sidebar from "./Navbar";
function AdminLayout({ children }) {
  return (
    <div className="flex ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full h-screen font-Montserrat">
        <HeaderAdmin />

        <div className=" bg-gray-50 w-full">{children}</div>
        {/* <FooterAdmin /> */}
      </div>
    </div>
  );
}

export default AdminLayout;
