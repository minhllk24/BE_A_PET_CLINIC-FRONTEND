import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MOCK_PETS } from "../../data/mockPets";

import buddyImg from "../../assets/images/pets/buddy.jpg";
import lunaImg from "../../assets/images/pets/luna.jpg";
import maxImg from "../../assets/images/pets/max.jpg";
import snowImg from "../../assets/images/pets/snow.jpg";

import uploadIcon from "../../assets/icons/upload-icon.png";

const petImages = {
  Buddy: buddyImg,
  Luna: lunaImg,
  Max: maxImg,
  Snow: snowImg,
};

const getLatestDate = (records) => {
  if (!records || records.length === 0) return "Chưa khám";
  
  const validRecords = records.filter(r => r && r.date);
  if (validRecords.length === 0) return "Chưa khám";

  const sorted = [...validRecords].sort((a, b) => {
    const [d1, m1, y1] = a.date.split('/');
    const [d2, m2, y2] = b.date.split('/');
    return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
  });
  
  return sorted[0].date;
};

const MedicalRecordCard = ({ fileName, size, onEdit, onDelete, onDownload }) => (
  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm5 0h-2V8h2v8z" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-800">{fileName}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">{size}</p>
      </div>
    </div>
    <div className="flex items-center gap-2 text-slate-500">
      <button type="button" onClick={onEdit} className="p-1.5 hover:text-yellow-600 bg-white shadow-sm border border-slate-100 rounded-md transition" title="Chỉnh sửa tệp">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      </button>
      <button type="button" onClick={onDownload} className="p-1.5 hover:text-blue-600 bg-white shadow-sm border border-slate-100 rounded-md transition" title="Tải xuống tệp">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
      </button>
      <button type="button" onClick={onDelete} className="p-1.5 hover:text-red-600 bg-white shadow-sm border border-slate-100 rounded-md transition" title="Xóa tệp">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
  </div>
);

function PetFormPage() {
  const { id: petId } = useParams();
  const navigate = useNavigate();
  
  const isEdit = Boolean(petId && petId !== "new");
  
  const [allPets, setAllPets] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showDeleteMedicalConfirm, setShowDeleteMedicalConfirm] = useState(false);
  const [medicalToDelete, setMedicalToDelete] = useState(null);

  const [medicalRecords, setMedicalRecords] = useState([]);
  
  const [medicalModalMode, setMedicalModalMode] = useState('create');
  const [editingMedicalId, setEditingMedicalId] = useState(null);

  const [newMedicalName, setNewMedicalName] = useState("");
  const [newMedicalDoctor, setNewMedicalDoctor] = useState("");
  const [newMedicalDate, setNewMedicalDate] = useState("");
  const [newMedicalNotes, setNewMedicalNotes] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("petsData");
    let pets = [];
    if (stored) {
      pets = JSON.parse(stored);
      setAllPets(pets);
    } else {
      setAllPets(MOCK_PETS);
      pets = MOCK_PETS;
    }

    if (isEdit) {
      const currentPet = pets.find((p) => p.id === petId);
      if (currentPet) {
        if (currentPet.avatar) {
          setAvatarPreview(currentPet.avatar);
        } else if (currentPet.name && petImages[currentPet.name]) {
          setAvatarPreview(petImages[currentPet.name]);
        }
        
        if (currentPet.medicalRecords) {
          setMedicalRecords(currentPet.medicalRecords);
        }
      }
    }
  }, [petId, isEdit]);

  const pet = isEdit ? allPets.find((p) => p.id === petId) : null;
  const currentPetImage = avatarPreview || (pet?.name ? petImages[pet.name] : null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelete = () => {
    const updatedPets = allPets.filter((p) => p.id !== petId);
    localStorage.setItem("petsData", JSON.stringify(updatedPets));
    setShowDeleteModal(false);
    navigate("/my-pets");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 

    const genderValue = formData.get("gender") === "Đực" ? "♂" : "♀";
    const weightInput = formData.get("weight");

    const petData = {
      id: isEdit ? petId : `pet_${Date.now()}`,
      name: formData.get("name"),
      species: formData.get("species"),
      breed: formData.get("breed"),
      age: formData.get("age") || "Chưa rõ", 
      gender: genderValue,
      weight: weightInput ? `${weightInput} kg` : "",
      medicalNotes: formData.get("medicalNotes") || "", 
      healthStatus: formData.get("healthStatus"), 
      avatar: avatarPreview, 
      medicalRecords: medicalRecords, 
      lastCheckup: getLatestDate(medicalRecords), 
    };

    let updatedPets;
    if (isEdit) {
      updatedPets = allPets.map((p) => (p.id === petId ? { ...p, ...petData } : p));
    } else {
      updatedPets = [petData, ...allPets];
    }

    localStorage.setItem("petsData", JSON.stringify(updatedPets));
    navigate("/my-pets");
  };

  const handleOpenCreateMedical = () => {
    setNewMedicalName(""); setNewMedicalDoctor(""); setNewMedicalDate(""); setNewMedicalNotes("");
    setMedicalModalMode('create');
    setEditingMedicalId(null);
    setShowMedicalModal(true);
  };

  const handleOpenEditMedical = (record) => {
    let formattedDateForInput = "";
    if (record.date && record.date !== "Chưa khám") {
      const parts = record.date.split("/");
      if (parts.length === 3) formattedDateForInput = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    setNewMedicalName(record.condition || record.name.replace(".pdf", ""));
    setNewMedicalDoctor(record.doctor || "");
    setNewMedicalDate(formattedDateForInput);
    setNewMedicalNotes(record.notes || "");
    
    setMedicalModalMode('edit');
    setEditingMedicalId(record.id);
    setShowHistoryModal(false);
    setShowMedicalModal(true);
  };

  const handleSaveMedicalRecord = (e) => {
    e.preventDefault();
    if (!newMedicalName || !newMedicalDate) {
      alert("Vui lòng nhập tên bệnh án và ngày khám!");
      return;
    }
    
    const [y, m, d] = newMedicalDate.split("-");
    const formattedDate = `${d}/${m}/${y}`;

    if (medicalModalMode === 'edit' && editingMedicalId) {
      const updatedRecords = medicalRecords.map(r => {
        if (r.id === editingMedicalId) {
          return {
            ...r,
            name: newMedicalName + ".pdf",
            date: formattedDate,
            condition: newMedicalName,
            doctor: newMedicalDoctor,
            notes: newMedicalNotes,
            fileUrl: `${newMedicalName.replace(/\s+/g, '-')}.pdf`
          };
        }
        return r;
      });
      setMedicalRecords(updatedRecords);
    } else {
      const newRecord = {
        id: Date.now(),
        name: newMedicalName + ".pdf",
        size: "120 KB",
        date: formattedDate,
        condition: newMedicalName,
        doctor: newMedicalDoctor || "Chưa rõ",
        notes: newMedicalNotes || "Không có ghi chú y tế.",
        fileUrl: `${newMedicalName.replace(/\s+/g, '-')}.pdf`
      };
      setMedicalRecords([newRecord, ...medicalRecords]);
    }

    setShowMedicalModal(false);
    setNewMedicalName("");
    setNewMedicalDoctor("");
    setNewMedicalDate("");
    setNewMedicalNotes("");
  };

  const handleConfirmDeleteMedical = () => {
    setMedicalRecords(medicalRecords.filter(record => record.id !== medicalToDelete));
    setShowDeleteMedicalConfirm(false);
    setMedicalToDelete(null);
    if (showHistoryModal) {
      setShowHistoryModal(false);
    }
  };

  const handleDownloadFile = (fileName) => {
    alert(`Đang tải xuống tệp: ${fileName}...`);
  };

  const defaultHealthStatus = pet?.healthStatus === 'Khỏe mạnh' ? 'Bình thường' : (pet?.healthStatus || "Bình thường");

  return (
    <div className="max-w-4xl mx-auto pb-10 pt-6 px-4 font-sans">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/my-pets" className="text-slate-500 hover:text-slate-900 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          {isEdit ? "Chỉnh sửa hồ sơ" : "Tạo hồ sơ thú cưng"}
        </h1>
      </div>

      <form key={pet ? pet.id : "new-pet-form"} className="space-y-6" onSubmit={handleSubmit}>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Thông tin cơ bản
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div 
              onClick={() => document.getElementById("pet-avatar-file").click()}
              className="w-32 h-32 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 relative group cursor-pointer mx-auto md:mx-0 shadow-inner"
            >
              {currentPetImage ? (
                <img src={currentPetImage} alt={pet?.name || "Pet"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-slate-300">🐾</div>
              )}
              <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white text-xs font-medium transition">
                Đổi ảnh
              </div>
            </div>
            <input 
              id="pet-avatar-file"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên thú cưng <span className="text-red-500">*</span></label>
                <input required type="text" name="name" defaultValue={pet?.name || ""} placeholder="Nhập tên thú cưng..." className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Loài <span className="text-red-500">*</span></label>
                <select required name="species" defaultValue={pet?.species || ""} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                  <option value="" disabled hidden>-- Chọn loài --</option>
                  <option value="Mèo">Mèo</option>
                  <option value="Chó">Chó</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Giống <span className="text-red-500">*</span></label>
                <input required type="text" name="breed" defaultValue={pet?.breed || ""} placeholder="VD: Poodle, Mèo Anh lông ngắn..." className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Hồ sơ bệnh án (Tùy chọn)
            </h2>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={() => setShowHistoryModal(true)}
                className="text-xs font-medium border border-slate-300 px-3 py-1.5 rounded-md hover:bg-slate-50 transition"
              >
                Xem tất cả
              </button>
              <button 
                type="button" 
                onClick={handleOpenCreateMedical}
                className="bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 w-7 h-7 flex items-center justify-center rounded-md font-bold transition"
              >
                +
              </button>
            </div>
          </div>
          
          {medicalRecords.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {medicalRecords.slice(0, 2).map((record) => (
                  <MedicalRecordCard 
                    key={record.id} 
                    fileName={record.name || record.condition} 
                    size={record.size || "PDF"} 
                    onEdit={() => handleOpenEditMedical(record)}
                    onDownload={() => handleDownloadFile(record.fileUrl)}
                    onDelete={() => {
                      setMedicalToDelete(record.id);
                      setShowDeleteMedicalConfirm(true);
                    }}
                  />
                ))}
              </div>
              
              {/* THÔNG BÁO NẾU CÓ NHIỀU HƠN 2 BỆNH ÁN */}
              {medicalRecords.length > 2 && (
                <p className="text-xs text-center text-slate-500 italic mt-2">
                  Còn {medicalRecords.length - 2} hồ sơ bệnh án khác. Bấm "Xem tất cả" để xem toàn bộ.
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-lg">
              <p className="text-sm text-slate-500">Chưa có hồ sơ bệnh án nào.</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Đặc điểm & Sức khỏe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Ngày sinh / Tuổi <span className="text-red-500">*</span></label>
              <input required type="text" name="age" defaultValue={pet?.age || ""} placeholder="VD: 06/05/2022 hoặc 2 tuổi" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Giới tính <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="gender" value="Đực" defaultChecked={!pet || pet?.gender === 'Đực' || pet?.gender === '♂'} className="w-4 h-4 text-slate-800 border-slate-300 focus:ring-slate-800" />
                  Đực
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="gender" value="Cái" defaultChecked={pet?.gender === 'Cái' || pet?.gender === '♀'} className="w-4 h-4 text-slate-800 border-slate-300 focus:ring-slate-800" />
                  Cái
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cân nặng <span className="text-red-500">*</span></label>
              <div className="relative">
                <input required type="number" step="0.1" name="weight" defaultValue={pet?.weight?.replace(' kg', '') || ""} placeholder="0" className="w-full border border-slate-300 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">kg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tình trạng sức khỏe <span className="text-red-500">*</span></label>
              <select required name="healthStatus" defaultValue={defaultHealthStatus} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                {pet?.healthStatus === "Cần tái khám" && <option value="Cần tái khám" disabled>Cần tái khám (Admin)</option>}
                <option value="Bình thường">Bình thường</option>
                <option value="Đang điều trị">Đang điều trị</option>
                <option value="Có bệnh nền">Có bệnh nền</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Lưu ý y tế / Dị ứng (Tùy chọn)</label>
            <textarea 
              name="medicalNotes" 
              defaultValue={pet?.medicalNotes || ""} 
              placeholder="VD: Dị ứng nhẹ với thịt gà, cần kiểm tra răng miệng định kỳ..." 
              rows="3" 
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            {isEdit && (
              <button 
                type="button" 
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa hồ sơ
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/my-pets" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 transition">
              Hủy
            </Link>
            <button type="submit" className="bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              Lưu hồ sơ
            </button>
          </div>
        </div>
      </form>

      {/* MODAL THÊM/SỬA BỆNH ÁN */}
      {showMedicalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {medicalModalMode === 'edit' ? "Chỉnh sửa bệnh án" : "Thêm bệnh án mới"}
              </h3>
              <button onClick={() => setShowMedicalModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <form onSubmit={handleSaveMedicalRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên bệnh án <span className="text-red-500">*</span></label>
                <input type="text" value={newMedicalName} onChange={e => setNewMedicalName(e.target.value)} placeholder="VD: Khám tổng quát tháng 10" className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm outline-none transition placeholder-slate-400" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bác sĩ điều trị</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <input type="text" value={newMedicalDoctor} onChange={e => setNewMedicalDoctor(e.target.value)} placeholder="Tên bác sĩ" className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition placeholder-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ngày khám <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="date" value={newMedicalDate} onChange={e => setNewMedicalDate(e.target.value)} className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm outline-none transition text-slate-700" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ghi chú (Triệu chứng / Chẩn đoán ban đầu)</label>
                <textarea rows="3" value={newMedicalNotes} onChange={e => setNewMedicalNotes(e.target.value)} placeholder="Nhập chi tiết các triệu chứng quan sát được hoặc kết luận sơ bộ của bác sĩ..." className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg px-4 py-3 text-sm outline-none transition placeholder-slate-400 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  Tài liệu đính kèm (Kết quả xét nghiệm, X-quang,...)
                  <span className="text-[10px] font-normal text-slate-400">(0/1 file)</span>
                </label>
                <div className="border-2 border-dashed border-blue-200 bg-[#F0F7FF] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition group relative">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                    <img src={uploadIcon} alt="Upload" className="w-5 h-5 object-contain opacity-70" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Kéo thả file hoặc <span className="text-blue-500">chọn tệp</span></p>
                  <p className="text-xs text-slate-500 mt-1">Hỗ trợ PDF, JPG, PNG (Tối đa 10MB)</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-4">
                <button type="button" onClick={() => setShowMedicalModal(false)} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                  Hủy
                </button>
                <button type="submit" className="bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                  Lưu bệnh án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL XEM TẤT CẢ BỆNH ÁN TRONG FORM CHỈNH SỬA */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[600px] flex flex-col overflow-hidden max-h-[85vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#E5F6FD]/30 relative">
              <h2 className="text-lg font-bold text-slate-900 relative z-10">Lịch sử bệnh án {pet?.name ? `- ${pet.name}` : ""}</h2>
              <button type="button" onClick={() => setShowHistoryModal(false)} className="text-slate-400 hover:text-slate-600 transition relative z-10 bg-white rounded-full p-1">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50" style={{ scrollbarWidth: 'thin' }}>
              {medicalRecords.length > 0 ? (
                <div className="relative border-l-2 border-slate-200 ml-2 space-y-8">
                  {medicalRecords.map((item) => (
                    <div key={item.id} className="relative pl-6">
                      <div className="absolute -left-[10px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm flex-shrink-0 bg-blue-500" />
                      <p className="text-[10px] font-bold text-slate-500 mb-1 tracking-wide">{item.date || "Gần đây"}</p>
                      
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-bold text-slate-900">{item.condition || item.name}</p>
                          <div className="flex items-center gap-1.5">
                            <button type="button" onClick={() => handleOpenEditMedical(item)} className="p-1.5 text-slate-400 hover:text-yellow-600 transition bg-slate-50 border border-slate-100 rounded-md" title="Chỉnh sửa bệnh án">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button type="button" onClick={() => handleDownloadFile(item.fileUrl || item.name)} className="p-1.5 text-slate-400 hover:text-blue-600 transition bg-slate-50 border border-slate-100 rounded-md" title="Tải file đính kèm">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                            <button type="button" onClick={() => { setMedicalToDelete(item.id); setShowDeleteMedicalConfirm(true); }} className="text-slate-400 hover:text-red-600 transition p-1.5 bg-slate-50 border border-slate-100 rounded-md" title="Xóa bệnh án">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-3 font-medium">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                          BS. {item.doctor || "Chưa rõ"}
                        </p>
                        <div className="bg-[#fef9c3] rounded-lg p-3 text-xs text-slate-800 leading-relaxed border border-yellow-100">
                          {item.notes || "Không có ghi chú chi tiết."}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-slate-500">Chưa có lịch sử bệnh án nào.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA BỆNH ÁN */}
      {showDeleteMedicalConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Xóa bệnh án?</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6 pl-13">Bạn có chắc chắn muốn xóa tệp bệnh án này? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowDeleteMedicalConfirm(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Giữ lại</button>
              <button type="button" onClick={handleConfirmDeleteMedical} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition">Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA HỒ SƠ THÚ CƯNG CHÍNH */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Xác nhận xóa hồ sơ</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6 pl-13">Bạn có chắc chắn muốn xóa vĩnh viễn hồ sơ của bé <strong>{pet?.name}</strong>? Hành động này sẽ xóa toàn bộ dữ liệu khám bệnh và không thể hoàn tác.</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Giữ lại</button>
              <button type="button" onClick={handleConfirmDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition">Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetFormPage;
