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
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import { BsTrash, BsPencil } from "react-icons/bs";

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
  const navigate = useNavigate();

  const defaultImages = [
    "https://via.placeholder.com/400x400?text=No+Image+1",
    "https://via.placeholder.com/400x400?text=No+Image+2",
    "https://via.placeholder.com/400x400?text=No+Image+3",
  ];

  // ✅ Авторизация текшерүү
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
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

  const handleDelete = async (id) => {
    if (!window.confirm("Бул товарды өчүрөсүзбү?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
      alert("✅ Товар өчүрүлдү!");
    } catch (e) {
      console.error(e);
      alert("❌ Өчүрүүдө ката кетти!");
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
  const totalValue = products.reduce(
    (s, p) => s + p.price * (p.stock || 0),
    0
  );
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
          scrolled
            ? "backdrop-blur-md shadow-lg"
            : "backdrop-blur-sm shadow-sm"
        } ${darkMode ? "bg-gray-800/70" : "bg-white/70"}`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3 select-none">
            {darkMode ? (
              <FaMoon className="text-3xl text-yellow-400" />
            ) : (
              <FaSun className="text-3xl text-gray-900" />
            )}
            <span className="text-3xl font-bold tracking-wide">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Dark / Light режим"
            >
              {darkMode ? (
                <FaSun className="text-xl text-yellow-400" />
              ) : (
                <FaMoon className="text-xl text-gray-800" />
              )}
            </button>

            <span className="text-sm hidden md:block opacity-80">
              👤 {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-black dark:bg-white dark:text-black text-white px-5 py-2 rounded-full hover:opacity-80 transition font-semibold"
            >
              <AiOutlineLogout className="text-xl" />
              Чыгуу
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-[1400px] mx-auto px-6 pt-24 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Жалпы товарлар", value: totalProducts },
            { title: "Жалпы наркы", value: `${totalValue.toLocaleString()} сом` },
            { title: "Категориялар", value: totalCategories },
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-xl shadow-md p-6 border-l-4 ${
                darkMode
                  ? "bg-gray-800 border-gray-500"
                  : "bg-white border-black"
              }`}
            >
              <p className="text-sm font-semibold mb-1 opacity-75">
                {stat.title}
              </p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div
          className={`shadow-xl rounded-2xl p-6 mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AiOutlinePlus />{" "}
            {editingId ? "Товарды өзгөртүү" : "Жаңы товар кошуу"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-lg bg-transparent focus:ring-2 ring-gray-400"
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
              className="border p-3 rounded-lg bg-transparent focus:ring-2 ring-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Баасы (сом)"
              className="border p-3 rounded-lg bg-transparent focus:ring-2 ring-gray-400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Саны"
              className="border p-3 rounded-lg bg-transparent focus:ring-2 ring-gray-400"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <input
              type="text"
              placeholder="Сүрөт URL (https://...)"
              className="border p-3 rounded-lg md:col-span-2 bg-transparent focus:ring-2 ring-gray-400"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleUpload}
              className="flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:text-black text-white py-3 rounded-lg font-semibold transition"
            >
              {editingId ? "Өзгөртүүнү сактоо" : "Товар кошуу"}
            </button>
            {editingId && (
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
              >
                Жокко чыгаруу
              </button>
            )}
          </div>
        </div>

        {/* Products */}
        <h3 className="text-2xl font-bold mb-6">Товарлар</h3>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center aspect-square overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-xs font-semibold">
                    {p.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 truncate">{p.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold">
                      {p.price.toLocaleString()} сом
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold">
                      {p.stock || 0} даана
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    >
                      <BsPencil /> Өзгөртүү
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      <BsTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 opacity-70">
            <p className="text-xl">Товарлар жок. Биринчи товарыңызды кошуңуз!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
