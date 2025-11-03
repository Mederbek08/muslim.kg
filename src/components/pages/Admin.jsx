import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import { BsTrash, BsPencil } from "react-icons/bs";
import { Tooltip } from "react-tooltip"; // npm i react-tooltip

const Admin = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const navigate = useNavigate();

  const defaultImages = [
    "https://via.placeholder.com/400x400?text=No+Image+1",
    "https://via.placeholder.com/400x400?text=No+Image+2",
    "https://via.placeholder.com/400x400?text=No+Image+3",
  ];

  // Авторизация
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        setLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          alert("⛔ У вас нет прав доступа к админ-панели!");
          navigate("/");
        }
      } catch (error) {
        console.error("Ошибка проверки роли:", error);
        alert("⛔ Ошибка проверки доступа!");
        navigate("/");
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user && isAdmin) fetchProducts();
  }, [user, isAdmin, sortBy, searchTerm]);

  const fetchProducts = async () => {
    try {
      const colRef = collection(db, "products");
      const q = query(colRef, orderBy(sortBy, "desc"));
      const querySnapshot = await getDocs(q);
      let data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (searchTerm) {
        data = data.filter(
          (p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setProducts(data);
    } catch (err) {
      console.error("Товарларды жүктөөдө ката:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleUpload = async () => {
    if (!category || !title || !price) {
      alert("Категория, аталышы жана баасы милдеттүү!");
      return;
    }
    try {
      const finalImageUrl =
        imageUrl ||
        defaultImages[Math.floor(Math.random() * defaultImages.length)];
      if (editingId) {
        const ref = doc(db, "products", editingId);
        await updateDoc(ref, {
          category,
          title,
          price: Number(price),
          stock: Number(stock) || 0,
          imageUrl: finalImageUrl,
          updatedAt: new Date(),
        });
        alert("✅ Товар ийгиликтүү өзгөртүлдү!");
      } else {
        await addDoc(collection(db, "products"), {
          category,
          title,
          price: Number(price),
          stock: Number(stock) || 0,
          imageUrl: finalImageUrl,
          createdAt: new Date(),
        });
        alert("✅ Товар ийгиликтүү кошулду!");
      }
      setCategory("");
      setTitle("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Ката кетти, кайра аракет кылыңыз!");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setCategory(p.category);
    setTitle(p.title);
    setPrice(p.price);
    setStock(p.stock || 0);
    setImageUrl(p.imageUrl || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Бул товарды өчүрөсүзбү?")) {
      deleteDoc(doc(db, "products", id))
        .then(() => {
          fetchProducts();
          alert("✅ Товар өчүрүлдү!");
        })
        .catch((e) => {
          console.error(e);
          alert("❌ Өчүрүүдө ката кетти!");
        });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setCategory("");
    setTitle("");
    setPrice("");
    setStock("");
    setImageUrl("");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-semibold">
            Текшерүү...
          </p>
        </div>
      </div>
    );

  if (!user || !isAdmin) return null;

  const totalProducts = products.length;
  const totalValue = products.reduce((s, p) => s + p.price * (p.stock || 0), 0);
  const totalCategories = new Set(products.map((p) => p.category)).size;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md shadow-lg" : "backdrop-blur-sm shadow-sm"
        } ${darkMode ? "bg-gray-800/70" : "bg-white/70"}`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2 select-none">
            {darkMode ? (
              <FaMoon className="text-2xl text-yellow-400" />
            ) : (
              <FaSun className="text-2xl text-gray-900" />
            )}
            <span className="text-2xl font-bold tracking-wide">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Dark / Light режим"
            >
              {darkMode ? (
                <FaSun className="text-lg text-yellow-400" />
              ) : (
                <FaMoon className="text-lg text-gray-800" />
              )}
            </button>
            <span className="text-xs md:text-sm hidden md:block opacity-80">
              👤 {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-2 bg-black dark:bg-white dark:text-black text-white px-3 py-1 rounded-full hover:opacity-80 transition font-semibold text-xs md:text-sm"
            >
              <AiOutlineLogout className="text-sm md:text-base" /> Чыгуу
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-3 pt-20 pb-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {[
            { title: "Жалпы товарлар", value: totalProducts },
            {
              title: "Жалпы наркы",
              value: `${totalValue.toLocaleString()} сом`,
            },
            { title: "Категориялар", value: totalCategories },
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-lg shadow p-2 border-l-2 ${
                darkMode
                  ? "bg-gray-800 border-gray-500"
                  : "bg-white border-black"
              }`}
            >
              <p className="text-[10px] md:text-xs font-semibold mb-1 opacity-75">
                {stat.title}
              </p>
              <p className="text-[12px] md:text-sm font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute top-3 left-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg pl-8 p-2 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg p-2 text-sm md:text-base"
          >
            <option value="createdAt">Sort by newest</option>
            <option value="price">Sort by price</option>
            <option value="stock">Sort by stock</option>
          </select>
        </div>

        {/* Form */}
        <div
          className={`shadow-lg rounded-xl p-3 mb-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-1">
            <AiOutlinePlus />{" "}
            {editingId ? "Товарды өзгөртүү" : "Жаңы товар кошуу"}
          </h2>
          <div className="grid grid-cols-1 gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded-lg bg-transparent focus:ring-1 ring-gray-400 text-sm md:text-base"
            >
              <option value="">Категория тандаңыз</option>
              <option value="Одежда">Одежда</option>
              <option value="Техника">Техника</option>
              <option value="Спорт">Спорт</option>
              <option value="Аксессуары">Аксессуары</option>
              <option value="Обувь">Обувь</option>
            </select>
            <input
              type="text"
              placeholder="Товардын аталышы"
              className="border p-2 rounded-lg bg-transparent focus:ring-1 ring-gray-400 text-sm md:text-base"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Баасы (сом)"
              className="border p-2 rounded-lg bg-transparent focus:ring-1 ring-gray-400 text-sm md:text-base"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Саны"
              className="border p-2 rounded-lg bg-transparent focus:ring-1 ring-gray-400 text-sm md:text-base"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <input
              type="text"
              placeholder="Сүрөт URL (https://...)"
              className="border p-2 rounded-lg bg-transparent focus:ring-1 ring-gray-400 text-sm md:text-base"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleUpload}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white py-2 rounded-lg font-semibold text-sm md:text-base transition"
            >
              {editingId ? "Өзгөртүүнү сактоо" : "Товар кошуу"}
            </button>
            {editingId && (
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold text-sm md:text-base transition"
              >
                Жокко чыгаруу
              </button>
            )}
          </div>
        </div>

        {/* Products */}
        <h3 className="text-lg md:text-xl font-bold mb-2">Товарлар</h3>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((p) => {
              const isNew =
                (new Date() -
                  new Date(p.createdAt?.seconds * 1000 || Date.now())) /
                  (1000 * 60 * 60 * 24) <
                7;
              return (
                <div
                  key={p.id}
                  className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {/* Image 
                  {/* Image */}
<div className="relative w-full aspect-[1/1] overflow-hidden rounded-t-xl">
  <img
    src={
      p.imageUrl ||
      "https://via.placeholder.com/400x400?text=No+Image"
    }
    alt={p.title}
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
  />
  {isNew && (
    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold shadow">
      NEW
    </span>
  )}
  <span className="absolute top-2 right-2 px-2 py-0.5 bg-gray-900/70 rounded-full text-[10px] md:text-xs text-white font-semibold shadow">
    {p.category}
  </span>
</div>


                  {/* Info */}
                  <div className="p-3 flex flex-col gap-2">
                    <h3
                      className="text-sm md:text-base font-semibold truncate"
                      title={p.title}
                    >
                      {p.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-600 font-bold text-sm md:text-base">
                        {p.price.toLocaleString()} сом
                      </span>
                      {p.stock > 0 ? (
                        <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs md:text-sm font-semibold">
                          {p.stock} даана
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs md:text-sm font-semibold">
                          Out of stock
                        </span>
                      )}
                    </div>

                    {/* Stock progress */}
                    {p.stock > 0 && (
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{
                            width: `${Math.min((p.stock / 100) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg text-sm md:text-base"
                      >
                        <BsPencil /> Өзгөртүү
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm md:text-base"
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 opacity-70">
            <p className="text-[12px] md:text-sm">
              Товарлар жок. Биринчи товарыңызды кошуңуз!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
