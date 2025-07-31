import { useEffect, useState } from "react";
import { deleteById, getAllUsers } from "../../features/Auth/userService";

const getRoleLabel = (role) => {
  switch (role) {
    case "teacher":
      return "Öğretmen";
    case "student":
      return "Öğrenci";
    case "admin":
      return "Admin";
    default:
      return role;
  }
};

const UsersDetails = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => filterRole === "all" || user.role === filterRole)
    .filter(
      (user) =>
        user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const handleDeleteUser = async (user) => {
    const confirmDelete = window.confirm(
      `${user.displayName || "Bu kullanıcı"} silinsin mi?`
    );
    if (!confirmDelete) return;
    const collectionName =
      user.role === "student"
        ? "students"
        : user.role === "teacher"
        ? "teachers"
        : "admins";
    await deleteById(user.id, collectionName);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200 p-6">
      {/* Başlık */}
      <h2 className="text-2xl font-bold text-[#044c5c] mb-6">
        Kullanıcı Yönetimi
      </h2>

      {/* Filtreler */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Rol Filtresi */}
        <div className="flex items-center gap-3">
          <label className="text-[#2d6c74] font-medium whitespace-nowrap">
            Rol:
          </label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-purple-200 rounded-lg bg-white/80 text-[#2d6c74] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
          >
            <option value="all">Tümü</option>
            <option value="admin">Admin</option>
            <option value="teacher">Öğretmen</option>
            <option value="student">Öğrenci</option>
          </select>
        </div>

        {/* Arama */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="İsim veya e-posta ile ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg bg-white/80 text-[#2d6c74] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Sonuç Sayısı */}
      <div className="mb-4">
        <p className="text-sm text-[#37747c]">
          {filteredUsers.length} kullanıcı bulundu
        </p>
      </div>

      {/* Tablo Container */}
      <div className="overflow-x-auto rounded-lg border border-purple-200 z-0">
        <table className="min-w-full bg-white/50">
          <thead className="bg-gradient-to-r from-purple-50 to-orange-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Kullanıcı Adı
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                E-posta
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Rol
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Kayıt Tarihi
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-8 text-center text-gray-500">
                  Kullanıcı bulunamadı
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gradient-to-r hover:from-purple-25 hover:to-orange-25 transition-all duration-200 ${
                    index % 2 === 0 ? "bg-white/30" : "bg-white/60"
                  }`}
                >
                  <td className="py-3 px-4 text-[#2d6c74] border-b border-purple-100">
                    {user.displayName || "-"}
                  </td>
                  <td className="py-3 px-4 text-[#2d6c74] border-b border-purple-100">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border-b border-purple-100">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : user.role === "teacher"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#2d6c74] border-b border-purple-100">
                    {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Sil
                    </button>
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

export default UsersDetails;
