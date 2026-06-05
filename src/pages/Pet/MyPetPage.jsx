import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MOCK_PETS } from "../../data/mockPets";

import buddyImg from "../../assets/images/pets/buddy.jpg";
import lunaImg from "../../assets/images/pets/luna.jpg";
import maxImg from "../../assets/images/pets/max.jpg";
import snowImg from "../../assets/images/pets/snow.jpg";

import dogIcon from "../../assets/icons/dog-icon.png";
import catIcon from "../../assets/icons/cat-icon.png";
import pawIcon from "../../assets/icons/paw-icon.png";

const petImages = {
  Buddy: buddyImg,
  Luna: lunaImg,
  Max: maxImg,
  Snow: snowImg,
};

const getHealthStatusColor = (status) => {
  const safeStatus = status === "Khỏe mạnh" ? "Bình thường" : status;
  switch (safeStatus) {
    case "Đang điều trị":
      return { bg: "#fef0c7", dot: "#d97706", text: "#b45309" }; 
    case "Bình thường":
      return { bg: "#dcfce3", dot: "#22c55e", text: "#15803d" }; 
    case "Có bệnh nền":
      return { bg: "#f3e8ff", dot: "#6366f1", text: "#4338ca" }; 
    case "Cần tái khám":
      return { bg: "#fee2e2", dot: "#ef4444", text: "#b91c1c" }; 
    default:
      return { bg: "#dcfce3", dot: "#22c55e", text: "#15803d" };
  }
};

const parseAgeToDays = (ageString) => {
  if (!ageString) return 0;
  const str = ageString.toLowerCase();
  const num = parseFloat(str); 
  if (isNaN(num)) return 0;

  if (str.includes("tuổi") || str.includes("năm")) return num * 365;
  if (str.includes("tháng")) return num * 30;
  if (str.includes("ngày")) return num;
  return num; 
};

const calculateAge = (birthDateString) => {
  if (!birthDateString) return "Chưa rõ";
  const parts = birthDateString.split("/");
  if (parts.length !== 3) return birthDateString;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years} tuổi${months > 0 ? ` ${months} tháng` : ""}`;
  } else if (months > 0) {
    return `${months} tháng${days > 0 ? ` ${days} ngày` : ""}`;
  } else {
    return days > 0 ? `${days} ngày` : "Mới sinh";
  }
};

const GenderIcon = ({ gender }) => {
  const isMale = gender === 'Đực' || gender === '♂';
  const isFemale = gender === 'Cái' || gender === '♀';

  if (isMale) {
    return (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" title="Đực">
        <circle cx="10" cy="14" r="6" />
        <path d="M14.24 9.76L21 3M15 3h6v6" />
      </svg>
    );
  }
  if (isFemale) {
    return (
      <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" title="Cái">
        <circle cx="12" cy="10" r="6" />
        <path d="M12 16v6M9 19h6" />
      </svg>
    );
  }
  return null;
};

const SpeciesIcon = ({ species, gender }) => {
  const isMale = gender === 'Đực' || gender === '♂';
  const isFemale = gender === 'Cái' || gender === '♀';

  let maskColorClass = "bg-slate-400 text-slate-400"; 
  if (isMale) maskColorClass = "bg-blue-500 text-blue-500";
  else if (isFemale) maskColorClass = "bg-pink-500 text-pink-500";

  const boldFilter = "drop-shadow(0px 0px 0.5px currentColor) drop-shadow(0.5px 0px 0px currentColor) drop-shadow(0px 0.5px 0px currentColor)";

  let targetIcon = pawIcon; 
  if (species === "Chó") targetIcon = dogIcon;
  else if (species === "Mèo") targetIcon = catIcon;

  return (
    <div 
      className={`w-5 h-5 flex-shrink-0 ${maskColorClass}`} 
      style={{ 
        WebkitMaskImage: `url(${targetIcon})`, 
        WebkitMaskSize: 'contain', 
        WebkitMaskRepeat: 'no-repeat', 
        WebkitMaskPosition: 'center',
        maskImage: `url(${targetIcon})`, 
        maskSize: 'contain', 
        maskRepeat: 'no-repeat', 
        maskPosition: 'center',
        filter: boldFilter
      }} 
      title={species || "Khác"} 
    />
  );
};

// HÀM TÍNH NGÀY KHÁM (ĐÃ BỌC CHỐNG LỖI TRẮNG MÀN HÌNH)
const getLatestCheckupDate = (pet) => {
  if (pet.medicalRecords && pet.medicalRecords.length > 0) {
    const validRecords = pet.medicalRecords.filter(r => r && r.date);
    if (validRecords.length === 0) return pet.lastCheckup || "Chưa khám";

    const sorted = [...validRecords].sort((a, b) => {
      const [d1, m1, y1] = a.date.split('/');
      const [d2, m2, y2] = b.date.split('/');
      return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
    });
    return sorted[0].date;
  }
  return pet.lastCheckup || "Chưa khám";
};

function PetListPage() {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("Tên");

  useEffect(() => {
    const storedPets = localStorage.getItem("petsData");
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    } else {
      localStorage.setItem("petsData", JSON.stringify(MOCK_PETS));
      setPets(MOCK_PETS);
    }
  }, []);

  let filteredPets = pets;

  if (searchQuery) {
    filteredPets = filteredPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterStatus !== "Tất cả") {
    filteredPets = filteredPets.filter((pet) => {
      const stat = pet.healthStatus === "Khỏe mạnh" ? "Bình thường" : (pet.healthStatus || "Bình thường");
      return stat === filterStatus;
    });
  }

  if (sortBy === "Tên") {
    filteredPets = [...filteredPets].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "Tuổi") {
    filteredPets = [...filteredPets].sort((a, b) => {
      const ageDaysA = parseAgeToDays(a.age);
      const ageDaysB = parseAgeToDays(b.age);
      return ageDaysB - ageDaysA;
    });
  }

  return (
    <div className="font-sans">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Danh sách hồ sơ thú cưng</h1>
        <p className="text-sm text-slate-600">
          Quản lý và xem thông tin chi tiết của tất cả thú cưng trong hệ thống.
        </p>
      </div>

      <div className="mb-6 flex gap-3 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm thú cưng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm min-w-[140px]">
          <option>Tất cả</option>
          <option>Bình thường</option>
          <option>Đang điều trị</option>
          <option>Có bệnh nền</option>
          <option>Cần tái khám</option>
        </select>

        <button 
          onClick={() => setSortBy(prev => prev === "Tên" ? "Tuổi" : "Tên")}
          className="flex items-center justify-center gap-2 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-slate-50 shadow-sm transition min-w-[140px]"
        >
          <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h6v2H3v-2z" />
          </svg>
          <span className="font-medium text-slate-700">
            {sortBy === "Tên" ? "Tên A-Z" : "Tuổi giảm dần"}
          </span>
        </button>

        <Link to="/my-pets/new">
          <button className="bg-yellow-400 hover:bg-yellow-500 rounded-md px-4 py-2 font-medium text-sm text-slate-900 transition flex items-center gap-1 shadow-sm">
            <span>+</span> Tạo mới
          </button>
        </Link>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPets.map((pet) => {
          const displayStatus = pet.healthStatus === "Khỏe mạnh" ? "Bình thường" : (pet.healthStatus || "Bình thường");
          const statusColor = getHealthStatusColor(displayStatus);
          const currentPetImage = pet.avatar || (pet.name ? petImages[pet.name] : null);
          const displayAge = pet.birthDate ? calculateAge(pet.birthDate) : pet.age;
          const displayCheckup = getLatestCheckupDate(pet);

          return (
            <div key={pet.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              
              <div className="relative h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                {currentPetImage ? (
                  <img src={currentPetImage} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-5xl text-slate-300">🐾</div>
                )}

                <div className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full shadow-sm" style={{ backgroundColor: statusColor.bg }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor.dot }} />
                  <span className="text-[10px] font-semibold" style={{ color: statusColor.text }}>{displayStatus}</span>
                </div>
              </div>

              <div className="flex-1 p-4 flex flex-col">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{pet.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{pet.breed} • {displayAge}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <SpeciesIcon species={pet.species} gender={pet.gender} />
                    <GenderIcon gender={pet.gender} />
                  </div>
                </div>

                <div className="mb-4 pb-3 border-t border-slate-100 pt-3">
                  <p className="text-[11px] text-slate-400 mb-0.5">Khám gần nhất</p>
                  <p className={`text-xs font-medium ${displayCheckup === "Chưa khám" ? "text-slate-400 italic" : "text-slate-700"}`}>
                    {displayCheckup}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Link to={`/my-pets/${pet.id}/edit`} className="w-full">
                    <button className="w-full bg-[#fcd34d] hover:bg-[#fbbf24] rounded-md py-2 font-medium text-xs text-slate-900 transition">
                      Chỉnh sửa hồ sơ
                    </button>
                  </Link>
                  <Link to={`/my-pets/${pet.id}`} className="w-full">
                    <button className="w-full bg-[#0a0f3a] hover:bg-[#070b29] rounded-md py-2 font-medium text-xs text-white transition">
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">Không tìm thấy thú cưng nào</p>
        </div>
      )}
    </div>
  );
}

export default PetListPage;
