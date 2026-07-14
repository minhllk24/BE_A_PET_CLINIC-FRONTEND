import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MOCK_PETS } from "../../data/mockPets";
import { INITIAL_PET_EVENTS } from "../../data/petEvents";
import {
  createMedicalRecord,
  createReminder,
  deleteMedicalRecord,
  deleteReminder,
  getHealthDiariesByPet,
  getMedicalRecordsByPet,
  getPetDetails,
  getRemindersByPet,
  updateMedicalRecord,
} from "../../services/petService";

import buddyImg from "../../assets/images/pets/buddy.jpg";
import lunaImg from "../../assets/images/pets/luna.jpg";
import maxImg from "../../assets/images/pets/max.jpg";
import snowImg from "../../assets/images/pets/snow.jpg";
import patternBg from "../../assets/images/pets/patterntaddnote.jpg"; 

// IMPORT ICON UPLOAD
import uploadIcon from "../../assets/icons/upload-icon.png";

const petImages = {
  Buddy: buddyImg,
  Luna: lunaImg,
  Max: maxImg,
  Snow: snowImg,
};

const readFallbackPets = () => {
  try {
    const stored = localStorage.getItem("petsData");
    const pets = stored ? JSON.parse(stored) : null;

    if (!pets || (pets.length > 0 && pets[0].medicalRecords === undefined)) {
      localStorage.setItem("petsData", JSON.stringify(MOCK_PETS));
      return MOCK_PETS;
    }

    return pets;
  } catch (error) {
    return MOCK_PETS;
  }
};

const getFallbackPet = (petId) => {
  const pets = readFallbackPets();
  return pets.find((item) => item.id === petId || String(item.pet_id) === String(petId)) || pets[0];
};

const syncFallbackMedicalRecords = (petId, records) => {
  const pets = readFallbackPets();
  const updatedPets = pets.map((item) =>
    item.id === petId || String(item.pet_id) === String(petId)
      ? { ...item, medicalRecords: records }
      : item,
  );
  localStorage.setItem("petsData", JSON.stringify(updatedPets));
};

const renderIconSvg = (id, className = "w-5 h-5") => {
  switch(id) {
    case 'paw': 
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.0803 15.7199C18.4903 12.1899 15.1003 9.31995 11.5203 9.31995C7.63028 9.31995 4.21028 12.4699 3.88028 16.3499C3.75028 17.8499 4.23028 19.2699 5.22028 20.3399C6.20028 21.4099 7.58028 21.9999 9.08028 21.9999H13.7603C15.4503 21.9999 16.9303 21.3399 17.9403 20.1499C18.9503 18.9599 19.3503 17.3799 19.0803 15.7199Z" fill="currentColor"/>
          <path d="M10.2796 7.86C11.8978 7.86 13.2096 6.54819 13.2096 4.93C13.2096 3.31181 11.8978 2 10.2796 2C8.66141 2 7.34961 3.31181 7.34961 4.93C7.34961 6.54819 8.66141 7.86 10.2796 7.86Z" fill="currentColor"/>
          <path d="M16.94 9.03002C18.2876 9.03002 19.38 7.9376 19.38 6.59002C19.38 5.24245 18.2876 4.15002 16.94 4.15002C15.5924 4.15002 14.5 5.24245 14.5 6.59002C14.5 7.9376 15.5924 9.03002 16.94 9.03002Z" fill="currentColor"/>
          <path d="M20.5496 12.93C21.6266 12.93 22.4996 12.057 22.4996 10.98C22.4996 9.90307 21.6266 9.03003 20.5496 9.03003C19.4727 9.03003 18.5996 9.90307 18.5996 10.98C18.5996 12.057 19.4727 12.93 20.5496 12.93Z" fill="currentColor"/>
          <path d="M3.94 10.98C5.28757 10.98 6.38 9.88755 6.38 8.53998C6.38 7.1924 5.28757 6.09998 3.94 6.09998C2.59243 6.09998 1.5 7.1924 1.5 8.53998C1.5 9.88755 2.59243 10.98 3.94 10.98Z" fill="currentColor"/>
        </svg>
      );
    case 'medical': 
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 8V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M5 8h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2zM12 11v6M9 14h6" />
        </svg>
      );
    case 'scissors': 
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="3" strokeWidth={1.8}/><circle cx="6" cy="18" r="3" strokeWidth={1.8}/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
        </svg>
      );
    case 'food': 
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 4v6a2 2 0 01-4 0V4m2 6v10M18 4v16M18 4c-3 0-3 3-3 5h3z" />
        </svg>
      );
    case 'vaccine': 
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 3h2m-1 0v3m-2 0h4m-4 0v9m4-9v9m-4 0h4m-2 0v4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 9h4m-3 0v2m2-2v2m-3 0v5a1 1 0 001 1h2a1 1 0 001-1v-5h-4" />
        </svg>
      );
    case 'shower': 
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2C10.8954 2 10 2.89543 10 4V8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 11C7 9.34315 8.34315 8 10 8H14C15.6569 8 17 9.34315 17 11H7Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 14V16M12 15V18M15 14V16M10 19V21M14 19V22" />
        </svg>
      );
    default: 
      return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /></svg>;
  }
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
  if (years > 0) return `${years} tuổi${months > 0 ? ` ${months} tháng` : ""}`;
  if (months > 0) return `${months} tháng${days > 0 ? ` ${days} ngày` : ""}`;
  return days > 0 ? `${days} ngày` : "Mới sinh";
};

const getColorClass = (type) => {
  switch(type) {
    case 'blue': return "bg-[#60a5fa]"; 
    case 'green': return "bg-[#4ade80]";
    case 'yellow': return "bg-[#fcd34d]";
    case 'red': return "bg-[#f87171]";
    default: return "bg-[#60a5fa]";
  }
};

const convertTimeToInputFormat = (timeSACH) => {
  if (!timeSACH || timeSACH === "--:--") return "";
  try {
    const [time, modifier] = timeSACH.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    if (hours === 12 && modifier === 'SA') hours = 0;
    if (hours !== 12 && modifier === 'CH') hours += 12;
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  } catch (error) { return ""; }
};

const formatTimeToSACH = (time24h) => {
  if (!time24h) return "--:--";
  try {
    const [hourStr, minStr] = time24h.split(':');
    let hour = parseInt(hourStr, 10);
    const modifier = hour >= 12 ? 'CH' : 'SA';
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }
    return `${String(hour).padStart(2, '0')}:${minStr} ${modifier}`;
  } catch (error) { return "--:--"; }
};

const getEventDateParts = (event) => {
  if (event?.dateKey) {
    const date = new Date(event.dateKey);
    if (!Number.isNaN(date.getTime())) {
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    }
  }

  return {
    day: Number(event?.day),
    month: 9,
    year: 2023,
  };
};

const isEventInDate = (event, day, month, year) => {
  const eventDate = getEventDateParts(event);
  return eventDate.day === day && eventDate.month === month && eventDate.year === year;
};

function PetDetailPage() {
  const params = useParams();
  const currentPetId = params.id || params.petId;
  const navigate = useNavigate();
  const [pet, setPet] = useState(() => getFallbackPet(currentPetId));
  const [petLoadError, setPetLoadError] = useState("");
  
  // 3. KHỞI TẠO STATES
  const [calendarDate, setCalendarDate] = useState(new Date(2023, 9, 9)); 
  const [eventsList, setEventsList] = useState(INITIAL_PET_EVENTS); 
  const [medicalHistoryList, setMedicalHistoryList] = useState(() => getFallbackPet(currentPetId)?.medicalRecords || []);

  const [showGeneralNoteModal, setShowGeneralNoteModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [dayModalMode, setDayModalMode] = useState('view'); 
  const [selectedDateObj, setSelectedDateObj] = useState(null); 
  const [dayEventsData, setDayEventsData] = useState([]); 
  const [activeEventDetail, setActiveEventDetail] = useState(null); 
  
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showDeleteRecordModal, setShowDeleteRecordModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const [showAddMedicalModal, setShowAddMedicalModal] = useState(false);
  const [medicalModalMode, setMedicalModalMode] = useState('create');
  const [editingMedicalId, setEditingMedicalId] = useState(null);
  const [newMedicalName, setNewMedicalName] = useState("");
  const [newMedicalDoctor, setNewMedicalDoctor] = useState("");
  const [newMedicalDate, setNewMedicalDate] = useState("");
  const [newMedicalNotes, setNewMedicalNotes] = useState("");

  const [showDeleteNoteConfirm, setShowDeleteNoteConfirm] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState(null);

  const [editingNoteId, setEditingNoteId] = useState(null); 
  const [noteDate, setNoteDate] = useState("");
  const [noteTime, setNoteTime] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(""); 
  const [selectedColor, setSelectedColor] = useState(""); 
  
  const MAX_FILES = 3;
  const [existingFiles, setExistingFiles] = useState([]); 
  const [markedDeletions, setMarkedDeletions] = useState([]); 

  const currentPetImage = pet?.avatar || (pet?.name ? petImages[pet.name] : lunaImg);
  const displayAge = pet?.birthDate ? calculateAge(pet.birthDate) : (pet?.age || "3 tuổi");

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth(); 
  const selectedDay = calendarDate.getDate();

  useEffect(() => {
    let active = true;
    const fallbackPet = getFallbackPet(currentPetId);

    setPet(fallbackPet);
    setMedicalHistoryList(fallbackPet?.medicalRecords || []);
    setPetLoadError("");

    Promise.allSettled([
      getPetDetails(currentPetId),
      getMedicalRecordsByPet(currentPetId),
      getHealthDiariesByPet(currentPetId),
      getRemindersByPet(currentPetId),
    ]).then(([petResult, recordsResult, diariesResult, remindersResult]) => {
      if (!active) return;

      if (petResult.status === "fulfilled") {
        setPet((current) => ({ ...current, ...petResult.value }));
      }

      if (recordsResult.status === "fulfilled") {
        setMedicalHistoryList(recordsResult.value);
      }

      if (diariesResult.status === "fulfilled" || remindersResult.status === "fulfilled") {
        const diaryEvents = diariesResult.status === "fulfilled" ? diariesResult.value : [];
        const reminderEvents = remindersResult.status === "fulfilled" ? remindersResult.value : [];
        const apiEvents = [...diaryEvents, ...reminderEvents];
        if (apiEvents.length) setEventsList(apiEvents);
      }

      if (
        petResult.status === "rejected" &&
        recordsResult.status === "rejected" &&
        diariesResult.status === "rejected" &&
        remindersResult.status === "rejected"
      ) {
        setPetLoadError("Không thể tải hồ sơ mới nhất, đang hiển thị dữ liệu dự phòng.");
      }
    });

    return () => {
      active = false;
    };
  }, [currentPetId]);

  useEffect(() => {
    if (selectedDateObj && showDayModal) {
      const d = selectedDateObj.getDate();
      const m = selectedDateObj.getMonth();
      const y = selectedDateObj.getFullYear();
      const eventsInDay = eventsList.filter(ev => isEventInDate(ev, d, m, y));
      setDayEventsData(eventsInDay);
      
      if (activeEventDetail) {
        const updatedActiveEvent = eventsInDay.find(ev => ev.id === activeEventDetail.id);
        if (updatedActiveEvent) setActiveEventDetail(updatedActiveEvent);
      } else if (eventsInDay.length > 0) {
        setActiveEventDetail(eventsInDay[0]);
      }
    }
  }, [eventsList, selectedDateObj, showDayModal, month, year]);

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

  const calendarDays = [];
  for (let i = 0; i < startOffset; i++) {
    calendarDays.push({ date: null });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dayEvents = eventsList.filter(ev => isEventInDate(ev, i, month, year));
    calendarDays.push({ 
      date: i, 
      isCurrent: i === selectedDay, 
      events: dayEvents.length > 0 ? dayEvents : null
    });
  }

  const handleDateChange = (e) => {
    if (e.target.value) {
      setCalendarDate(new Date(e.target.value));
    }
  };

  const handlePrevMonth = () => setCalendarDate(new Date(year, month - 1, selectedDay));
  const handleNextMonth = () => setCalendarDate(new Date(year, month + 1, selectedDay));
  const handleGoToToday = () => setCalendarDate(new Date()); 

  const handleOpenGeneralNoteModal = () => {
    setNoteDate("");
    setNoteTime("");
    setNoteContent("");
    setSelectedIcon("paw");
    setSelectedColor("blue");
    setExistingFiles([]);
    setMarkedDeletions([]);
    setShowGeneralNoteModal(true);
  };

  const handleSaveGeneralNote = async (e) => {
    e.preventDefault();
    if (!noteDate || !noteContent || !selectedIcon || !selectedColor) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const targetDay = new Date(noteDate).getDate();
    const formattedTime = noteTime ? formatTimeToSACH(noteTime) : "--:--"; 
    const newEvent = {
      id: Date.now(), 
      day: targetDay,
      title: noteContent,
      time: formattedTime,
      type: selectedColor, 
      icon: selectedIcon,
      files: existingFiles 
    };
    try {
      const savedEvent = await createReminder({
        petId: currentPetId,
        remindDate: noteDate,
        title: noteContent,
        notes: noteContent,
        time: formattedTime,
        icon: selectedIcon,
        type: selectedColor,
        reminderType: selectedIcon,
      });
      setEventsList((current) => [...current, savedEvent]);
    } catch (error) {
      setEventsList((current) => [...current, newEvent]);
    }
    setShowGeneralNoteModal(false);
  };

  const handleOpenDayModal = (day) => {
    if(!day) return;
    const clickedDate = new Date(year, month, day);
    setSelectedDateObj(clickedDate);
    const eventsInDay = eventsList.filter(ev => isEventInDate(ev, day, month, year));
    setDayEventsData(eventsInDay);
    setActiveEventDetail(eventsInDay.length > 0 ? eventsInDay[0] : null);
    
    setDayModalMode('view');
    setShowDayModal(true);
  };

  const handleStartCreateNoteInDay = () => {
    setEditingNoteId(null);
    setNoteTime("");
    setNoteContent("");
    setSelectedIcon("paw");
    setSelectedColor("blue");
    setExistingFiles([]); 
    setMarkedDeletions([]); 
    setDayModalMode('create');
    setActiveEventDetail(null); 
  };

  const handleStartEditingNote = () => {
    if (!activeEventDetail) return;
    setEditingNoteId(activeEventDetail.id);
    setNoteTime(convertTimeToInputFormat(activeEventDetail.time));
    setNoteContent(activeEventDetail.title);
    setSelectedIcon(activeEventDetail.icon || 'paw');
    setSelectedColor(activeEventDetail.type || 'blue');
    setExistingFiles(activeEventDetail.files || []); 
    setMarkedDeletions([]); 
    setDayModalMode('edit');
  };

  const handleSaveDayNote = async (e) => {
    e.preventDefault();
    if (!noteContent || !selectedIcon || !selectedColor) {
      alert("Vui lòng điền nội dung, chọn biểu tượng và màu sắc!");
      return;
    }

    const targetDay = selectedDateObj.getDate();
    const formattedTime = noteTime ? formatTimeToSACH(noteTime) : "--:--"; 

    if (dayModalMode === 'edit' && editingNoteId) {
      setEventsList(prev => prev.map(ev => {
        if (ev.id === editingNoteId) {
          const finalFiles = existingFiles.filter(file => !markedDeletions.includes(file.id));
          return {
            ...ev,
            title: noteContent,
            time: formattedTime,
            type: selectedColor,
            icon: selectedIcon,
            files: finalFiles 
          };
        }
        return ev;
      }));
    } else if (dayModalMode === 'create') {
      const newEvent = {
        id: Date.now(), 
        day: targetDay,
        title: noteContent,
        time: formattedTime,
        type: selectedColor, 
        icon: selectedIcon,
        files: existingFiles 
      };
      try {
        const savedEvent = await createReminder({
          petId: currentPetId,
          remindDate: selectedDateObj.toISOString().slice(0, 10),
          title: noteContent,
          notes: noteContent,
          time: formattedTime,
          icon: selectedIcon,
          type: selectedColor,
          reminderType: selectedIcon,
        });
        setEventsList((current) => [...current, savedEvent]);
      } catch (error) {
        setEventsList((current) => [...current, newEvent]);
      }
    }
    setDayModalMode('view'); 
  };

  const handleDeleteNoteTrigger = (id) => {
    setNoteToDeleteId(id);
    setShowDeleteNoteConfirm(true);
  };

  const handleConfirmDeleteNote = async () => {
    const targetEvent = eventsList.find((event) => event.id === noteToDeleteId);
    if (targetEvent?.sourceType === "reminder") {
      try {
        await deleteReminder(noteToDeleteId);
      } catch (error) {
        // API lỗi thì vẫn xóa khỏi fallback local để UI không bị kẹt.
      }
    }

    setEventsList(prev => prev.filter(ev => ev.id !== noteToDeleteId));
    setShowDeleteNoteConfirm(false);
    setNoteToDeleteId(null);
    if (activeEventDetail && activeEventDetail.id === noteToDeleteId) {
      setActiveEventDetail(null);
    }
  };

  // Mở modal để tạo mới bệnh án
  const handleOpenCreateMedical = () => {
    setNewMedicalName(""); setNewMedicalDoctor(""); setNewMedicalDate(""); setNewMedicalNotes("");
    setMedicalModalMode('create');
    setEditingMedicalId(null);
    setShowAddMedicalModal(true);
  };

  // Mở modal để chỉnh sửa bệnh án
  const handleOpenEditMedical = (record) => {
    let formattedDateForInput = "";
    if (record.date && record.date !== "Chưa khám") {
      const parts = record.date.split("/");
      if (parts.length === 3) formattedDateForInput = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    setNewMedicalName(record.condition || record.name?.replace(".pdf", "") || "");
    setNewMedicalDoctor(record.doctor || "");
    setNewMedicalDate(formattedDateForInput);
    setNewMedicalNotes(record.notes || "");
    
    setMedicalModalMode('edit');
    setEditingMedicalId(record.id);
    setShowHistoryModal(false); 
    setShowAddMedicalModal(true);
  };

  const handleSaveMedicalRecord = async (e) => {
    e.preventDefault();
    if (!newMedicalName || !newMedicalDate) {
      alert("Vui lòng nhập tên bệnh án và ngày khám!");
      return;
    }
    
    const [y, m, d] = newMedicalDate.split("-");
    const formattedDate = `${d}/${m}/${y}`;

    let newList;
    if (medicalModalMode === 'edit' && editingMedicalId) {
      newList = medicalHistoryList.map(r => {
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
    } else {
      const newRecord = {
        id: Date.now(),
        date: formattedDate,
        condition: newMedicalName,
        doctor: newMedicalDoctor || "Chưa rõ",
        notes: newMedicalNotes || "Không có ghi chú y tế.",
        fileUrl: `${newMedicalName.replace(/\s+/g, '-')}.pdf`
      };
      newList = [newRecord, ...medicalHistoryList];
    }

    try {
      if (medicalModalMode === 'edit' && editingMedicalId) {
        const savedRecord = await updateMedicalRecord(editingMedicalId, {
          condition: newMedicalName,
          visitDate: newMedicalDate,
          notes: newMedicalNotes,
        });
        newList = medicalHistoryList.map((record) =>
          record.id === editingMedicalId ? { ...record, ...savedRecord } : record,
        );
      } else {
        const savedRecord = await createMedicalRecord({
          petId: currentPetId,
          condition: newMedicalName,
          visitDate: newMedicalDate,
          notes: newMedicalNotes,
        });
        newList = [savedRecord, ...medicalHistoryList];
      }
    } catch (error) {
      // Giữ fallback local để người dùng vẫn thao tác được khi API chưa bật.
    }
    
    setMedicalHistoryList(newList);
    setShowAddMedicalModal(false);
    syncFallbackMedicalRecords(currentPetId, newList);
    
    setNewMedicalName(""); setNewMedicalDoctor(""); setNewMedicalDate(""); setNewMedicalNotes("");
  };

  const handleConfirmDeleteMedicalRecord = async () => {
    const newList = medicalHistoryList.filter(r => r.id !== recordToDelete);
    try {
      await deleteMedicalRecord(recordToDelete);
    } catch (error) {
      // API lỗi thì vẫn xóa khỏi fallback local để UI không bị kẹt.
    }
    setMedicalHistoryList(newList);
    setShowDeleteRecordModal(false); 
    setRecordToDelete(null);
    syncFallbackMedicalRecords(currentPetId, newList);
  };

  const handleDownloadFile = (fileName) => {
    alert(`Đang tải xuống tệp: ${fileName}...`);
  };

  const handleMarkFileDeletion = (fileId) => {
    if (!markedDeletions.includes(fileId)) setMarkedDeletions(prev => [...prev, fileId]);
  };
  const handleUnmarkFileDeletion = (fileId) => {
    setMarkedDeletions(prev => prev.filter(id => id !== fileId));
  };
  const calculateCurrentActiveFilesCount = () => existingFiles.length - markedDeletions.length;

  const renderEventBadge = (event, index) => {
    const styles = {
      green: "bg-green-100 text-green-700 border-green-200",
      yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      red: "bg-red-100 text-red-700 border-red-200",
    };
    
    return (
      <div key={index} className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border mt-1 truncate ${styles[event.type] || styles.blue}`}>
        {renderIconSvg(event.icon || 'paw', "w-3 h-3 flex-shrink-0")}
        <span className="truncate">{event.title}</span>
      </div>
    );
  };

  const defaultDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

  return (
    <div className="bg-transparent flex flex-col min-h-full font-sans">
      <div className="mx-auto max-w-[1300px] w-full pt-3 pb-4 flex-1 flex flex-col">
        
        <div className="flex items-center gap-3 mb-5 flex-shrink-0">
          <Link 
            to="/thu-cung-cua-toi"
            className="text-slate-500 hover:text-slate-900 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Hồ sơ chi tiết</h1>
        </div>

        {petLoadError && (
          <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            {petLoadError}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[380px_1fr] items-start flex-1">
          
          <div className="flex flex-col h-full space-y-3">
            
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col items-center text-center flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-2 shadow-sm bg-slate-50 border-4 border-white ring-1 ring-slate-100 flex-shrink-0">
                {currentPetImage ? (
                  <img src={currentPetImage} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🐾</div>
                )}
              </div>
              <h1 className="text-xl font-bold text-slate-900">{pet.name}</h1>
              <p className="text-xs text-slate-500">{pet.breed || "Chưa phân loại"}</p>
              
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 flex-shrink-0">
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold shadow-sm ${
                  pet.gender === "♀" || pet.gender === "Cái" 
                    ? "bg-pink-100 text-pink-600" 
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {pet.gender === "♀" || pet.gender === "Cái" 
                    ? <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><circle cx="12" cy="10" r="6"/><path d="M12 16v6M9 19h6"/></svg>
                    : <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><circle cx="10" cy="14" r="6"/><path d="M14.24 9.76L21 3M15 3h6v6"/></svg>
                  }
                  Giống {pet.gender === "♀" || pet.gender === "Cái" ? "cái" : "đực"}
                </div>
                
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e0e7ff] text-[#4338ca] text-[11px] font-bold shadow-sm">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {displayAge}
                </div>
                
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fef0c7] text-[#b45309] text-[11px] font-bold shadow-sm">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 12h12l3-12H3z"/></svg>
                  {pet.weight || "4.5 kg"}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col flex-shrink-0">
              <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
                <div className="p-3">
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center mb-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mb-0.5 uppercase tracking-wide">Sức khỏe chung</p>
                  <p className="text-xs font-bold text-slate-900">
                    {pet.healthStatus === 'Khỏe mạnh' ? 'Bình thường' : (pet.healthStatus || "Bình thường")}
                  </p>
                </div>
                <div className="p-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-50 flex items-center justify-center mb-1">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mb-0.5 uppercase tracking-wide">Tiêm phòng tiếp</p>
                  <p className="text-xs font-bold text-slate-900">15/11/2023</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50/50 border-t border-slate-100">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Lưu ý y tế</p>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {pet.medicalNotes || "Chưa có lưu ý y tế nào."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden flex-1">
              <div className="p-4 pb-2 flex items-center justify-between border-b border-slate-100 bg-white flex-shrink-0">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Lịch sử bệnh án
                </h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowHistoryModal(true)} 
                    className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-50 transition flex-shrink-0"
                  >
                    Xem tất cả
                  </button>
                  <button 
                    onClick={handleOpenCreateMedical}
                    className="bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 w-6 h-6 flex items-center justify-center rounded-md font-bold transition flex-shrink-0 shadow-sm"
                    title="Thêm bệnh án mới"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-4 pt-3">
                <div className="relative border-l-2 border-slate-100 ml-2 space-y-6">
                  {medicalHistoryList.slice(0, 3).map((item, index) => (
                    <div key={item.id} className="relative pl-5">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm flex-shrink-0 ${index === 0 ? 'bg-slate-500' : 'bg-slate-300'}`} />
                      
                      <p className="text-[10px] font-bold text-slate-500 mb-0.5 tracking-wide">{item.date}</p>
                      
                      <p className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        {item.condition}
                        <span className="text-slate-300 font-normal">|</span>
                        <button type="button" onClick={() => handleDownloadFile(item.fileUrl)} className="text-slate-400 font-normal text-[10px] hover:text-blue-600 transition">
                          Tải file chi tiết
                        </button>
                      </p>
                      
                      <p className="text-[10px] text-slate-600 flex items-center gap-1.5 mb-2 font-medium">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        BS. {item.doctor}
                      </p>
                      
                      <div className="bg-[#fef9c3] rounded-lg p-2.5 text-xs text-slate-800 leading-relaxed shadow-sm border border-yellow-100">
                        {item.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col h-full">
            
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-1.5 relative">
                Tháng {month + 1}, {year}
                <div className="relative w-6 h-6 text-slate-800 hover:text-blue-600 transition flex items-center justify-center cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <input 
                    type="date" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleDateChange}
                    value={defaultDateString}
                  />
                </div>
              </h2>

              <div className="flex items-center gap-1.5">
                <button onClick={handlePrevMonth} className="p-0.5 hover:bg-slate-100 rounded border border-transparent transition">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button onClick={handleGoToToday} className="px-2.5 py-1 bg-[#e0e7ff] text-[#4338ca] text-[10px] font-bold rounded-full flex-shrink-0 hover:bg-blue-100 transition">
                  Hôm nay
                </button>
                <button onClick={handleNextMonth} className="p-0.5 hover:bg-slate-100 rounded border border-transparent transition">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden bg-slate-50/30 flex flex-col">
              <div className="grid grid-cols-7 border-b border-slate-100 bg-white flex-shrink-0">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                  <div key={day} className="text-center py-2 text-[10px] font-bold text-slate-400 border-r border-slate-100 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 bg-white flex-1">
                {calendarDays.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleOpenDayModal(item.date)} 
                    className={`min-h-[50px] sm:min-h-[60px] border-b border-r border-slate-100 p-1 transition-colors hover:bg-slate-50 flex flex-col cursor-pointer ${
                      item.isCurrent ? "bg-blue-50 ring-2 ring-blue-400 ring-inset rounded-lg shadow-sm z-10" : ""
                    } ${(index + 1) % 7 === 0 ? "border-r-0" : ""}`}
                  >
                    {item.date && (
                      <p className={`text-[11px] font-medium pl-0.5 ${item.isCurrent ? "text-blue-700 font-bold" : "text-slate-500"} flex-shrink-0`}>
                        {item.date}
                      </p>
                    )}
                    <div className="space-y-0.5 overflow-hidden flex-1 pointer-events-none">
                      {item.events && item.events.map((ev, i) => renderEventBadge(ev, i))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3 flex-shrink-0">
              <Link to={`/thu-cung-cua-toi/${pet.id}/chinh-sua`} className="flex-shrink-0">
                <button className="flex items-center gap-1.5 bg-[#bfdbfe] hover:bg-[#93c5fd] text-[#1e3a8a] px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  Chỉnh sửa hồ sơ
                </button>
              </Link>
              <button 
                onClick={handleOpenGeneralNoteModal} 
                className="flex items-center gap-1.5 bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                Thêm ghi chú lịch
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MODAL THÊM GHI CHÚ VÀO LỊCH CHUNG ================= */}
      {showGeneralNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[480px] p-7 relative">
            <button 
              onClick={() => setShowGeneralNoteModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Thêm ghi chú lịch</h2>
            
            <form onSubmit={handleSaveGeneralNote} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Thời gian</label>
                <input 
                  type="date" 
                  value={noteDate}
                  onChange={(e) => setNoteDate(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-2">Chọn biểu tượng</label>
                <div className="flex gap-2.5">
                  {["paw", "medical", "scissors", "food", "vaccine", "shower"].map((iconId) => (
                    <button
                      key={iconId}
                      type="button"
                      onClick={() => setSelectedIcon(iconId)}
                      className={`w-12 h-12 flex items-center justify-center rounded-2xl transition border-2 ${
                        selectedIcon === iconId 
                          ? "bg-[#f1f5f9] border-[#475569] text-[#334155]" 
                          : "bg-[#f1f5f9] border-transparent text-[#64748b] hover:bg-slate-200"
                      }`}
                    >
                      {renderIconSvg(iconId, "w-6 h-6")}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-2">Màu sắc</label>
                  <div className="flex gap-4 pt-1 px-1">
                    {[{ key: "blue", class: "bg-[#60a5fa]" }, { key: "green", class: "bg-[#4ade80]" }, { key: "yellow", class: "bg-[#fcd34d]" }, { key: "red", class: "bg-[#f87171]" }].map((color) => (
                      <div
                        key={color.key}
                        onClick={() => setSelectedColor(color.key)}
                        className={`w-7 h-7 rounded-full ${color.class} cursor-pointer flex-shrink-0 transition-all ${
                          selectedColor === color.key ? "ring-2 ring-slate-700 ring-offset-2 scale-105" : "hover:scale-110 shadow-sm border-2 border-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Giờ khám (Tuỳ chọn)</label>
                  <div className="relative">
                    <input 
                      type="time" 
                      value={noteTime}
                      onChange={(e) => setNoteTime(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-700"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Nội dung ghi chú</label>
                <textarea 
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Nhập chi tiết về chăm sóc..." 
                  rows="3" 
                  className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none resize-none placeholder-slate-400 text-slate-700"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5 flex items-center justify-between">
                  Tệp đính kèm <span className="font-normal text-slate-400">(0/3 file)</span>
                </label>
                <div className="w-full relative cursor-pointer border-2 border-[#e2e8f0] border-dashed rounded-xl bg-[#f8fafc] hover:border-blue-400 hover:bg-blue-50 transition p-4 flex flex-col items-center justify-center text-center group">
                  <div className="w-8 h-8 bg-slate-100 group-hover:bg-white rounded-full flex items-center justify-center mb-2 shadow-sm transition group-hover:scale-110">
                    <img src={uploadIcon} alt="Upload" className="w-4 h-4 object-contain opacity-70" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Nhấn để tải lên hoặc kéo thả</p>
                  <input type="file" multiple max="3" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6 relative z-20">
                <button type="button" onClick={() => setShowGeneralNoteModal(false)} className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2 transition">Hủy bỏ</button>
                <button type="submit" className="bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 px-6 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                  Lưu ghi chú
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL XEM CHI TIẾT NGÀY & FORM CHỈNH SỬA GHI CHÚ LỊCH ================= */}
      {showDayModal && selectedDateObj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[700px] flex overflow-hidden min-h-[450px]">
            
            <div className="w-[280px] p-6 relative flex flex-col border-r border-slate-100 overflow-hidden bg-[#E5F6FD]/30">
              
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ 
                  backgroundImage: `url(${patternBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.03 
                }} 
              />
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-sm font-bold text-slate-800">
                  Ghi chú ngày {String(selectedDateObj.getDate()).padStart(2, '0')}/{String(selectedDateObj.getMonth() + 1).padStart(2, '0')}
                </h3>
                <button 
                  onClick={handleStartCreateNoteInDay}
                  className="w-6 h-6 rounded-full bg-[#fcd34d] text-slate-900 flex items-center justify-center font-bold text-lg hover:scale-105 transition shadow-sm"
                  title="Thêm ghi chú vào ngày này"
                >
                  +
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 relative z-10" style={{ scrollbarWidth: 'none' }}>
                {dayEventsData.length > 0 ? (
                  dayEventsData.map((ev, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setActiveEventDetail(ev);
                        setDayModalMode('view');
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                        activeEventDetail?.id === ev.id && dayModalMode !== 'create'
                          ? "bg-white border-white shadow-md scale-100" 
                          : "bg-white/60 border-transparent hover:bg-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${getColorClass(ev.type)}`}>
                          {renderIconSvg(ev.icon || 'paw', "w-4 h-4")}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{ev.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {ev.time || "--:--"}
                          </p>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-80 pb-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-slate-300">
                      {renderIconSvg('paw', "w-6 h-6")}
                    </div>
                    <p className="text-xs font-bold text-slate-700">Chưa có ghi chú nào!</p>
                    <p className="text-[10px] text-slate-500 mt-1">Bấm dấu + màu vàng để thêm mới</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 bg-white p-6 flex flex-col relative">
              <button 
                onClick={() => setShowDayModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition z-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>

              {/* CHẾ ĐỘ XEM CHI TIẾT */}
              {dayModalMode === 'view' && (
                activeEventDetail ? (
                  <>
                    <h2 className="text-sm font-bold text-slate-800 mb-6 pr-8">
                      Chi tiết ghi chú: {activeEventDetail.title}
                    </h2>

                    <div className="flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                      <div className="flex items-start gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                          {renderIconSvg(activeEventDetail.icon || 'paw', "w-5 h-5")}
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Thời gian</p>
                          <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {activeEventDetail.time || "--:--"}
                          </p>
                        </div>
                      </div>

                      {activeEventDetail.files && activeEventDetail.files.length > 0 && (
                        <div className="mb-5">
                          <p className="text-[11px] font-bold text-slate-600 mb-2">Tệp đính kèm</p>
                          <div className="space-y-2">
                            {activeEventDetail.files.map((file, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-[#f8fafc]">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-500 border border-slate-100">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800">{file.name}</p>
                                    <p className="text-[10px] text-slate-500">{file.size}</p>
                                  </div>
                                </div>
                                <button type="button" onClick={() => handleDownloadFile(file.name)} className="text-slate-400 hover:text-blue-600 transition p-1" title="Tải xuống tệp">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeEventDetail.invoice && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-600 mb-2">Hóa đơn (Dr.Pet's House)</p>
                          <div className="flex items-center justify-between p-3 rounded-xl border border-red-100 bg-red-50/50">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm5 0h-2V8h2v8z" /></svg>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800">{activeEventDetail.invoice.name}</p>
                                <p className="text-[10px] text-slate-500">{activeEventDetail.invoice.size}</p>
                              </div>
                            </div>
                            <button type="button" onClick={() => handleDownloadFile(activeEventDetail.invoice.name)} className="text-slate-400 hover:text-slate-700 transition p-1" title="Tải hóa đơn">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {(!activeEventDetail.files || activeEventDetail.files.length === 0) && !activeEventDetail.invoice && (
                         <p className="text-sm text-slate-500 italic border-l-2 border-slate-200 pl-3">Không có thông tin đính kèm.</p>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end gap-4 relative z-20">
                      <button onClick={() => handleDeleteNoteTrigger(activeEventDetail.id)} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1.5 transition">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Xóa ghi chú
                      </button>
                      <button 
                        onClick={handleStartEditingNote} 
                        className="bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 px-5 py-2 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        Chỉnh sửa
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                    <svg className="w-16 h-16 mb-4 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.0803 15.7199C18.4903 12.1899 15.1003 9.31995 11.5203 9.31995C7.63028 9.31995 4.21028 12.4699 3.88028 16.3499C3.75028 17.8499 4.23028 19.2699 5.22028 20.3399C6.20028 21.4099 7.58028 21.9999 9.08028 21.9999H13.7603C15.4503 21.9999 16.9303 21.3399 17.9403 20.1499C18.9503 18.9599 19.3503 17.3799 19.0803 15.7199Z"/>
                    </svg>
                    <p className="text-sm font-medium">Bé chưa có lịch trình nào vào ngày này.</p>
                  </div>
                )
              )}

              {/* CHẾ ĐỘ FORM: EDIT & CREATE ĐƯỢC KHÔI PHỤC FULL GIAO DIỆN */}
              {(dayModalMode === 'edit' || dayModalMode === 'create') && (
                <form onSubmit={handleSaveDayNote} className="flex-1 flex flex-col h-full overflow-hidden">
                  <h2 className="text-sm font-bold text-slate-800 mb-6 pr-8">
                    {dayModalMode === 'edit' ? `Chỉnh sửa ghi chú: ${activeEventDetail?.title || ''}` : "Thêm ghi chú mới"}
                  </h2>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-5" style={{ scrollbarWidth: 'thin' }}>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-2">Chọn biểu tượng</label>
                      <div className="flex gap-2.5">
                        {["paw", "medical", "scissors", "food", "vaccine", "shower"].map((iconId) => (
                          <button
                            key={iconId}
                            type="button"
                            onClick={() => setSelectedIcon(iconId)}
                            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition border-2 ${
                              selectedIcon === iconId 
                                ? "bg-[#f1f5f9] border-[#475569] text-[#334155]" 
                                : "bg-[#f1f5f9] border-transparent text-[#64748b] hover:bg-slate-200"
                            }`}
                          >
                            {renderIconSvg(iconId, "w-6 h-6")}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-2">Màu sắc</label>
                        <div className="flex gap-4 pt-1 px-1 pb-1">
                          {[
                            { key: "blue", class: "bg-[#60a5fa]" },
                            { key: "green", class: "bg-[#4ade80]" },
                            { key: "yellow", class: "bg-[#fcd34d]" },
                            { key: "red", class: "bg-[#f87171]" }
                          ].map((color) => (
                            <div
                              key={color.key}
                              onClick={() => setSelectedColor(color.key)}
                              className={`w-7 h-7 rounded-full ${color.class} cursor-pointer flex-shrink-0 transition-all ${
                                selectedColor === color.key ? "ring-2 ring-slate-700 ring-offset-2 scale-105" : "hover:scale-110 shadow-sm border-2 border-white"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Giờ khám (Tuỳ chọn)</label>
                        <div className="relative">
                          <input 
                            type="time" 
                            value={noteTime}
                            onChange={(e) => setNoteTime(e.target.value)}
                            className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-700"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Nội dung ghi chú</label>
                      <textarea 
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="Nhập chi tiết về chăm sóc..." 
                        rows="3" 
                        className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none resize-none placeholder-slate-400 text-slate-700"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1.5 flex items-center justify-between">
                        Tệp đính kèm <span className="font-normal text-slate-400">({calculateCurrentActiveFilesCount()}/{MAX_FILES} file)</span>
                      </label>

                      {calculateCurrentActiveFilesCount() === 0 ? (
                        <div className="w-full relative cursor-pointer border-2 border-[#e2e8f0] border-dashed rounded-xl bg-[#f8fafc] hover:border-blue-400 hover:bg-blue-50 transition p-4 flex flex-col items-center justify-center text-center group">
                          <div className="w-8 h-8 bg-slate-100 group-hover:bg-white rounded-full flex items-center justify-center mb-2 shadow-sm transition group-hover:scale-110">
                            <img src={uploadIcon} alt="Upload" className="w-4 h-4 object-contain opacity-70" />
                          </div>
                          <p className="text-xs font-bold text-slate-800">Nhấn để tải lên hoặc kéo thả</p>
                          <p className="text-[10px] text-slate-500 mt-1">PDF, JPG hoặc PNG (Tối đa 10MB)</p>
                          <input type="file" multiple max={MAX_FILES} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {existingFiles.map((file) => {
                            const isMarkedDeleted = markedDeletions.includes(file.id);
                            return (
                              <div 
                                key={file.id} 
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  isMarkedDeleted ? "border-red-100 bg-red-50/50 opacity-60" : "border-slate-100 bg-[#f8fafc]"
                                }`}
                              >
                                <div className="flex items-center gap-3 pr-2 flex-1">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isMarkedDeleted ? "bg-red-100 border-red-200 text-red-600": "bg-white border-slate-100 text-slate-500 shadow-sm"}`}>
                                    {file.name.endsWith('.pdf') 
                                      ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                      : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    }
                                  </div>
                                  <div className="flex-1 truncate">
                                    <p className={`text-xs font-bold truncate ${isMarkedDeleted ? 'text-red-700 line-through' : 'text-slate-800'}`} title={file.name}>{file.name}</p>
                                    <p className="text-[10px] text-slate-500">{file.size}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 relative z-20">
                                  {isMarkedDeleted ? (
                                    <button type="button" onClick={() => handleUnmarkFileDeletion(file.id)} className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition">Khôi phục</button>
                                  ) : (
                                    <>
                                      <button type="button" onClick={() => handleDownloadFile(file.name)} className="text-slate-400 hover:text-blue-600 transition p-1" title="Tải xuống tệp">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                      </button>
                                      <button type="button" onClick={() => handleMarkFileDeletion(file.id)} className="text-slate-400 hover:text-red-500 transition p-1" title="Xóa tệp khỏi ghi chú">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end gap-4 relative z-20">
                    <button 
                      type="button" 
                      onClick={() => {
                        if (dayModalMode === 'edit') setDayModalMode('view');
                        else setShowDayModal(false);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2 transition"
                    >
                      Hủy bỏ
                    </button>
                    <button 
                      type="submit" 
                      className="bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-900 px-6 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                      {dayModalMode === 'edit' ? "Lưu ghi chú" : "Lưu ghi chú"}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL THÊM/SỬA BỆNH ÁN TỪ NÚT (+) ================= */}
      {showAddMedicalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {medicalModalMode === 'edit' ? "Chỉnh sửa bệnh án" : "Thêm bệnh án mới"}
              </h3>
              <button onClick={() => setShowAddMedicalModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSaveMedicalRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên bệnh án <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newMedicalName}
                  onChange={(e) => setNewMedicalName(e.target.value)}
                  placeholder="VD: Khám tổng quát tháng 10" 
                  className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm outline-none transition placeholder-slate-400" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bác sĩ điều trị</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <input 
                      type="text" 
                      value={newMedicalDoctor}
                      onChange={(e) => setNewMedicalDoctor(e.target.value)}
                      placeholder="Tên bác sĩ" 
                      className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition placeholder-slate-400" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ngày khám <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={newMedicalDate}
                      onChange={(e) => setNewMedicalDate(e.target.value)}
                      className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm outline-none transition text-slate-700" 
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ghi chú (Triệu chứng / Chẩn đoán ban đầu)</label>
                <textarea 
                  rows="3" 
                  value={newMedicalNotes}
                  onChange={(e) => setNewMedicalNotes(e.target.value)}
                  placeholder="Nhập chi tiết các triệu chứng quan sát được hoặc kết luận sơ bộ của bác sĩ..." 
                  className="w-full bg-[#F1F5F9] border border-transparent focus:border-blue-500 rounded-lg px-4 py-3 text-sm outline-none transition placeholder-slate-400 resize-none"
                ></textarea>
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
                <button type="button" onClick={() => setShowAddMedicalModal(false)} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
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

      {/* ================= MODAL XEM TẤT CẢ LỊCH SỬ BỆNH ÁN ================= */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[600px] flex flex-col overflow-hidden max-h-[85vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#E5F6FD]/30 relative">
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ backgroundImage: `url(${patternBg})`, backgroundSize: 'cover', opacity: 0.03 }} 
              />
              <h2 className="text-lg font-bold text-slate-900 relative z-10">Lịch sử bệnh án - {pet.name}</h2>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-600 transition relative z-10 bg-white rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50" style={{ scrollbarWidth: 'thin' }}>
              {medicalHistoryList.length > 0 ? (
                <div className="relative border-l-2 border-slate-200 ml-2 space-y-8">
                  {medicalHistoryList.map((item, index) => (
                    <div key={item.id} className="relative pl-6">
                      <div className="absolute -left-[10px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm flex-shrink-0 bg-blue-500" />
                      
                      <p className="text-[10px] font-bold text-slate-500 mb-1 tracking-wide">{item.date}</p>
                      
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-bold text-slate-900">{item.condition}</p>
                          <div className="flex items-center gap-1.5">
                            <button type="button" onClick={() => handleOpenEditMedical(item)} className="p-1.5 text-slate-400 hover:text-yellow-600 transition bg-slate-50 border border-slate-100 rounded-md" title="Chỉnh sửa bệnh án">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button type="button" onClick={() => handleDownloadFile(item.fileUrl || item.name)} className="p-1.5 text-slate-400 hover:text-blue-600 transition bg-slate-50 border border-slate-100 rounded-md" title="Tải file đính kèm">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                            <button type="button" onClick={() => { setRecordToDelete(item.id); setShowDeleteRecordModal(true); }} className="text-slate-400 hover:text-red-600 transition p-1.5 bg-slate-50 border border-slate-100 rounded-md" title="Xóa bệnh án">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-3 font-medium">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                          BS. {item.doctor}
                        </p>
                        
                        <div className="bg-[#fef9c3] rounded-lg p-3 text-xs text-slate-800 leading-relaxed border border-yellow-100">
                          {item.notes}
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

      {/* MODAL XÁC NHẬN XÓA 1 BỆNH ÁN BÊN TRONG LỊCH SỬ TỔNG QUÁT */}
      {showDeleteRecordModal && (
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
            <p className="text-sm text-slate-600 mb-6 pl-13">Bạn có chắc chắn muốn xóa bệnh án này khỏi hệ thống? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowDeleteRecordModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Giữ lại</button>
              <button type="button" onClick={handleConfirmDeleteMedicalRecord} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition">Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA GHI CHÚ LỊCH TRÌNH */}
      {showDeleteNoteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3 text-red-600">
              <h3 className="text-lg font-bold text-slate-900">Xóa ghi chú lịch?</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Hành động này sẽ xóa ghi chú này ra khỏi lịch biểu chăm sóc thú cưng của bạn.</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowDeleteNoteConfirm(false)} className="px-4 py-2 text-sm bg-slate-100 rounded-lg">Giữ lại</button>
              <button type="button" onClick={handleConfirmDeleteNote} className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetDetailPage;
