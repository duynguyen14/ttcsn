import { HiPlusSm } from "react-icons/hi";
import { RiSubtractFill } from "react-icons/ri";
import { request1 } from "../../utils/request";

function CartItem({ item, setCartgoods, setSelectedItems, setSelectedId, access_token }) {
  const handleClickPlus = async () => {
    try {
      await request1.patch(
        `cart/update/${item.id}/`,
        { quantity: item.quantity + 1 },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCartgoods((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } catch (error) {
      console.error("Lỗi khi tăng số lượng:", error);
    }
  };

  const handleClickSubtraction = async () => {
    if (item.quantity === 0) return;
    try {
      await request1.patch(
        `cart/update/${item.id}/`,
        { quantity: item.quantity - 1 },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCartgoods((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
      );
    } catch (error) {
      console.error("Lỗi khi giảm số lượng:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await request1.delete(`cart/remove/${item.id}/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        });
        setCartgoods((prev) => prev.filter((i) => i.id !== item.id));
        alert("Xóa sản phẩm thành công");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-md p-4 mb-4">
      {/* Hiển thị ảnh sản phẩm */}
      <div className="flex items-center gap-4">
        <img
          src={item.good.image} // Thay bằng trường dữ liệu ảnh của bạn
          alt={item.good.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        {/* Thông tin sản phẩm */}
        <div>
          <p className="font-semibold text-gray-700">{item.good.name}</p>
          <p className="text-gray-500">Giá: {item.good.price}₫</p>
        </div>
      </div>

      {/* Phần điều khiển số lượng và xóa */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleClickSubtraction}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          <RiSubtractFill />
        </button>
        <p>{item.quantity}</p>
        <button
          onClick={handleClickPlus}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          <HiPlusSm />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default CartItem;
