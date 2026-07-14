import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getMyPets } from "../../services/petService";
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

const PET_STATUS_FILTERS = ["Tất cả", "Bình thường", "Đang điều trị", "Có bệnh nền", "Cần tái khám"];

function SearchAndSort({
  searchInput,
  onSearchInputChange,
  onSearch,
  sortBy,
  onSortChange,
}) {
  return (
    <form
      className="flex w-full gap-[10px]"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <label className="flex h-[52px] min-w-0 flex-1 items-center justify-between rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white/80 py-2 pl-5 pr-2">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên thú cưng hoặc giống"
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#5f5f5f] outline-none placeholder:text-[#5f5f5f]"
        />
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#fff176]"
          aria-label="Tìm kiếm thú cưng"
        >
          <svg className="h-5 w-5 text-[#06105a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </label>

      <label className="flex h-[52px] w-[180px] cursor-pointer items-center gap-[8px] rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white px-[14px]">
        <svg className="h-4 w-[18px] shrink-0 text-[#414141]" viewBox="0 0 18 12" aria-hidden="true">
          <path d="M1 1h16M1 6h10M1 11h5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-center text-[14px] font-medium outline-none"
          aria-label="Sắp xếp thú cưng"
        >
          <option value="name">Tên A-Z</option>
          <option value="age">Tuổi giảm dần</option>
        </select>
      </label>
    </form>
  );
}

function PetListPage() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");

    getMyPets()
      .then((items) => {
        if (active) setPets(items);
      })
      .catch((error) => {
        if (!active) return;
        setPets(MOCK_PETS);
        setLoadError(error?.message || "Không thể tải hồ sơ thú cưng, đang hiển thị dữ liệu mẫu.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const counts = useMemo(() => {
    return PET_STATUS_FILTERS.reduce((acc, status) => {
      acc[status] =
        status === "Tất cả"
          ? pets.length
          : pets.filter((pet) => {
              const displayStatus = pet.healthStatus === "Khỏe mạnh" ? "Bình thường" : (pet.healthStatus || "Bình thường");
              return displayStatus === status;
            }).length;
      return acc;
    }, {});
  }, [pets]);

  const filteredPets = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLocaleLowerCase("vi");
    const result = pets.filter((pet) => {
      const displayStatus = pet.healthStatus === "Khỏe mạnh" ? "Bình thường" : (pet.healthStatus || "Bình thường");
      const matchesFilter = filterStatus === "Tất cả" || displayStatus === filterStatus;
      const matchesSearch =
        !normalizedSearch ||
        [pet.name, pet.breed, pet.species]
          .join(" ")
          .toLocaleLowerCase("vi")
          .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });

    if (sortBy === "age") {
      return [...result].sort((a, b) => parseAgeToDays(b.age) - parseAgeToDays(a.age));
    }

    return [...result].sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }, [filterStatus, pets, searchQuery, sortBy]);

  return (
    <div className="font-sans">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-[28px] font-bold leading-9 text-[#031635]">Danh sách hồ sơ thú cưng</h1>
        <p className="text-[15px] leading-6 text-[#667085]">
          Quản lý và xem thông tin chi tiết của tất cả thú cưng trong hệ thống.
        </p>
      </div>

      <div className="mb-4 flex w-full items-center gap-2 overflow-x-auto pb-1 pt-1">
        {PET_STATUS_FILTERS.map((status) => {
          const active = filterStatus === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`focus-ring-brand shrink-0 rounded-full px-6 py-2 text-sm font-semibold leading-5 tracking-[0.14px] transition ${
                active
                  ? "bg-[#0d47a1] text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                  : "border border-[#c2c6d4] bg-white text-[#424752] hover:border-[#0d47a1]"
              }`}
            >
              {status} ({counts[status] || 0})
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex items-center gap-[10px]">
        <SearchAndSort
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={() => setSearchQuery(searchInput.trim())}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <Link to="/thu-cung-cua-toi/them-moi" className="shrink-0">
          <button className="flex h-[52px] items-center gap-2 rounded-[42px] bg-[#fff176] px-5 text-[14px] font-bold text-[#031635] shadow-elevation transition hover:bg-[#fdd835]">
            <span className="text-xl leading-none">+</span> Tạo mới
          </button>
        </Link>
      </div>

      {searchQuery && (
        <p className="mb-6 text-[16px] leading-[27px] text-[#414141]">
          Kết quả tìm kiếm cho &quot;{searchQuery}&quot;
        </p>
      )}

      {loadError && !isLoading && (
        <p className="mb-4 text-center text-sm text-[#0D47A1]">{loadError}</p>
      )}

      {isLoading ? (
        <div className="py-12 text-center text-slate-500">Đang tải hồ sơ thú cưng...</div>
      ) : (
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
                  <Link to={`/thu-cung-cua-toi/${pet.id}/chinh-sua`} className="w-full">
                    <button className="w-full bg-[#fcd34d] hover:bg-[#fbbf24] rounded-md py-2 font-medium text-xs text-slate-900 transition">
                      Chỉnh sửa hồ sơ
                    </button>
                  </Link>
                  <Link to={`/thu-cung-cua-toi/${pet.id}`} className="w-full">
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
      )}

      {!isLoading && filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">Không tìm thấy thú cưng nào</p>
        </div>
      )}
    </div>
  );
}

export default PetListPage;
