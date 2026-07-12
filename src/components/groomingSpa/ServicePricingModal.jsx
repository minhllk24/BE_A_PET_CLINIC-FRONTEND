import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, X } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import {
  GROOMING_PRICE_COLUMNS,
  SERVICE_PRICE_FILTERS,
  SERVICE_PRICE_TABLES,
} from '../../data/groomingData'

const columnToneClasses = {
  primary: 'border-[#0D47A1] text-[#0D47A1]',
  secondary: 'border-[#FDD835] text-[#FBC02D]',
  info: 'border-[#0288D1] text-[#0288D1]',
}

const iconByName = {
  bath: LucideIcons.Bath || LucideIcons.Droplets || LucideIcons.Sparkles,
  sprout: LucideIcons.Sprout || LucideIcons.Flower2 || LucideIcons.Sparkles,
  scissors: LucideIcons.Scissors,
  sparkles: LucideIcons.Sparkles,
  bug: LucideIcons.Bug || LucideIcons.CircleDot,
  palette: LucideIcons.Palette,
  tooth: LucideIcons.Smile,
  paw: LucideIcons.PawPrint || LucideIcons.CircleDot,
  stethoscope: LucideIcons.Stethoscope,
  flask: LucideIcons.FlaskConical || LucideIcons.TestTube2,
  heartPulse: LucideIcons.HeartPulse || LucideIcons.Activity,
  syringe: LucideIcons.Syringe,
  scalpel: LucideIcons.PenLine,
  siren: LucideIcons.Siren || LucideIcons.Cross,
}

function PricePill({ value, tone }) {
  const isContact = value === 'Liên hệ'

  return (
    <div
      className={`flex h-[40px] w-[80px] shrink-0 items-center justify-center rounded-[16px] border bg-white ${columnToneClasses[tone]}`}
    >
      <span
        className={`font-['Baloo_Tamma_2'] text-[16px] font-bold leading-4 ${
          isContact ? 'text-[#0288D1]' : 'text-black'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function PriceCellGroup({ children }) {
  return <div className="flex shrink-0 items-center gap-2">{children}</div>
}

function ServiceIcon({ name, color }) {
  const Icon = iconByName[name] || LucideIcons.Sparkles

  return <Icon size={30} strokeWidth={2.4} color={color} />
}

function ServicePricingModal({ open, onClose, defaultFilter = 'all' }) {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setSelectedFilter(defaultFilter)
      setIsDropdownOpen(false)
    }
  }, [defaultFilter, open])

  const selectedLabel = SERVICE_PRICE_FILTERS.find(
    (filter) => filter.value === selectedFilter,
  )?.label

  const rows = useMemo(() => {
    if (selectedFilter === 'all') {
      return [
        ...SERVICE_PRICE_TABLES.medical,
        ...SERVICE_PRICE_TABLES.grooming,
        ...SERVICE_PRICE_TABLES.combo,
      ]
    }

    return SERVICE_PRICE_TABLES[selectedFilter] || []
  }, [selectedFilter])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/35 px-6 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="grooming-pricing-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsDropdownOpen(false)
          onClose()
        }
      }}
    >
      <div className="relative flex max-h-[calc(100vh-64px)] w-[1280px] flex-col items-center overflow-hidden rounded-[24px] bg-white py-10 shadow-[0px_20px_25px_-5px_rgba(255,237,213,0.5),0px_8px_10px_-6px_rgba(255,237,213,0.5)]">
        <button
          type="button"
          className="focus-ring-brand absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-[#FFF9C4] text-[#0D47A1] transition-colors hover:bg-[#FDD835]"
          aria-label="Đóng bảng giá"
          onClick={() => {
            setIsDropdownOpen(false)
            onClose()
          }}
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <header className="flex w-full shrink-0 flex-col items-center">
          <h2
            id="grooming-pricing-title"
            className="m-0 w-full text-center font-['Baloo_Tamma'] text-[64px] font-normal leading-[1.1] text-[#0D47A1]"
          >
            Bảng giá dịch vụ <span className="text-[#FBC02D]">Dr.Pet’s House</span>
          </h2>
        </header>

        <div className="mt-6 flex h-[52px] w-[1130px] shrink-0 items-center gap-[23px] pl-[15px]">
          <div className="relative z-20 h-[40px] w-[232px] shrink-0">
            <button
              type="button"
              className="flex h-[40px] w-[232px] items-center justify-between rounded-[16px] border border-[rgba(0,0,0,0.87)] bg-[#FFF176] px-[17px] py-[9px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen((current) => !current)}
            >
              <span className="font-['Roboto'] text-[16px] font-normal leading-6 text-[rgba(0,0,0,0.87)]">
                {selectedLabel}
              </span>
              <ChevronDown
                size={18}
                strokeWidth={2}
                color="rgba(0,0,0,0.87)"
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isDropdownOpen ? (
              <div
                className="absolute left-0 top-[46px] w-[232px] overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.18)] bg-white py-1 shadow-[0_10px_24px_rgba(13,71,161,0.16)]"
                role="listbox"
              >
                {SERVICE_PRICE_FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    className={`flex h-[40px] w-full items-center px-[17px] text-left font-['Roboto'] text-[16px] font-normal leading-6 transition-colors ${
                      selectedFilter === filter.value
                        ? 'bg-[#FFF176] text-[rgba(0,0,0,0.87)]'
                        : 'bg-white text-[rgba(0,0,0,0.87)] hover:bg-[#FFFDE7]'
                    }`}
                    role="option"
                    aria-selected={selectedFilter === filter.value}
                    onClick={() => {
                      setSelectedFilter(filter.value)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <PriceCellGroup>
            {GROOMING_PRICE_COLUMNS.slice(0, 3).map((column) => (
              <div
                key={column.label}
                className={`flex h-[40px] w-[80px] items-center justify-center rounded-[16px] border p-px ${columnToneClasses[column.tone]}`}
              >
                <span className="whitespace-nowrap font-['Baloo_Tamma_2'] text-[14px] font-bold leading-5">
                  {column.label}
                </span>
              </div>
            ))}
          </PriceCellGroup>

          <PriceCellGroup>
            {GROOMING_PRICE_COLUMNS.slice(3, 6).map((column) => (
              <div
                key={column.label}
                className={`flex h-[40px] w-[80px] items-center justify-center rounded-[16px] border p-px ${columnToneClasses[column.tone]}`}
              >
                <span className="whitespace-nowrap font-['Baloo_Tamma_2'] text-[14px] font-bold leading-5">
                  {column.label}
                </span>
              </div>
            ))}
          </PriceCellGroup>

          <PriceCellGroup>
            {GROOMING_PRICE_COLUMNS.slice(6).map((column) => (
              <div
                key={column.label}
                className={`flex h-[40px] w-[80px] items-center justify-center rounded-[16px] border p-px ${columnToneClasses[column.tone]}`}
              >
                <span className="whitespace-nowrap font-['Baloo_Tamma_2'] text-[14px] font-bold leading-5">
                  {column.label}
                </span>
              </div>
            ))}
          </PriceCellGroup>
        </div>

        <div className="mt-2 w-[1130px] min-h-0 flex-1 overflow-y-auto pr-[23px]">
          <div className="flex w-[1107px] flex-col items-start gap-[15px]">
            {rows.map((row) => (
              <div key={row.title} className="flex w-[1107px] shrink-0 flex-col items-start px-4">
                <div
                  className="flex w-[1091px] items-start gap-[18px] rounded-[16px] p-4 backdrop-blur-[2px]"
                  style={{ backgroundColor: row.background }}
                >
                  <div className="flex h-[40px] w-[220px] shrink-0 items-center gap-4 rounded-[16px]">
                    <div className="flex size-[30px] shrink-0 items-center justify-center">
                      <ServiceIcon name={row.icon} color={row.iconColor} />
                    </div>
                    <div className="flex min-w-0 flex-1 items-center">
                      <span className="font-['Baloo_Tamma_2'] text-[16px] font-bold leading-6 text-[#1B1C1D]">
                        {row.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-[23px] pr-px">
                    <PriceCellGroup>
                      {row.prices.slice(0, 3).map((price, index) => (
                        <PricePill
                          key={`${row.title}-${price}-${index}`}
                          value={price}
                          tone={GROOMING_PRICE_COLUMNS[index].tone}
                        />
                      ))}
                    </PriceCellGroup>
                    <PriceCellGroup>
                      {row.prices.slice(3, 6).map((price, index) => (
                        <PricePill
                          key={`${row.title}-${price}-${index + 3}`}
                          value={price}
                          tone={GROOMING_PRICE_COLUMNS[index + 3].tone}
                        />
                      ))}
                    </PriceCellGroup>
                    <PriceCellGroup>
                      {row.prices.slice(6).map((price, index) => (
                        <PricePill
                          key={`${row.title}-${price}-${index + 6}`}
                          value={price}
                          tone={GROOMING_PRICE_COLUMNS[index + 6].tone}
                        />
                      ))}
                    </PriceCellGroup>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ServicePricingModal
