import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Check, CheckCircle, ChevronDown, Phone, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  ADOPTION_COMMITMENT_NOTE,
  ADOPTION_STEPS,
  ADOPTION_SUCCESS,
  COMMITMENT_QUESTIONS,
  CONTACT_FIELDS,
  LIVING_CONDITION_QUESTIONS,
} from "../../data/adoptionFormData";
import { DEFAULT_USER_ADDRESSES, PROFILE_STORAGE_KEYS } from "../../data/userProfileData";
import { getUserAddresses } from "../../services/userService";

const buttonShadow =
  "shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.2)]";

const inputClass =
  "h-[52px] w-full rounded-[8px] border-2 border-[#D9E3F6] bg-white px-[26px] text-[16px] leading-6 text-[rgba(0,0,0,0.87)] outline-none transition focus:border-[#90CAF9] focus:ring-2 focus:ring-[#90CAF9]/30";

const invalidInputClass = "border-[#c62828] ring-1 ring-[#c62828] focus:border-[#c62828] focus:ring-[#c62828]";

const FIELD_ERROR_MESSAGE = "Vui lòng điền thông tin";
const NEW_ADDRESS_VALUE = "__new_address__";

const initialFormValues = {
  fullName: "",
  phone: "",
  gender: "",
  birthYear: "",
  address: "",
  housingType: "",
  familyConsent: "",
  currentPets: "",
  aloneTime: "",
  adoptionReason: "",
  futurePlan: "",
};

function loadUserAddresses() {
  try {
    const storedAddresses = localStorage.getItem(PROFILE_STORAGE_KEYS.addresses);
    return storedAddresses ? JSON.parse(storedAddresses) : DEFAULT_USER_ADDRESSES;
  } catch {
    return DEFAULT_USER_ADDRESSES;
  }
}

function getBirthYear(birthDate) {
  if (!birthDate) return "";
  const year = String(birthDate).match(/\d{4}/)?.[0];
  return year ?? "";
}

function getPrefilledValues({ isAuthenticated, userProfile, addresses }) {
  if (!isAuthenticated) return initialFormValues;

  const defaultAddress =
    addresses.find((address) => address.isDefault) ?? addresses[0];

  return {
    ...initialFormValues,
    fullName: userProfile?.fullName ?? "",
    phone: userProfile?.phone ?? "",
    gender: userProfile?.gender ?? "",
    birthYear: getBirthYear(userProfile?.birthDate),
    address: defaultAddress?.address ?? "",
  };
}

function getStepRequiredFields(stepId) {
  if (stepId === "contact") return CONTACT_FIELDS.filter((field) => field.required).map((field) => field.name);
  if (stepId === "living") return LIVING_CONDITION_QUESTIONS.filter((question) => question.required).map((question) => question.name);
  return COMMITMENT_QUESTIONS.filter((question) => question.required).map((question) => question.name);
}

function getMissingFields(values, stepId) {
  return getStepRequiredFields(stepId).filter((field) => !String(values[field] ?? "").trim());
}

function ModalButton({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-[#FDD835] text-[rgba(0,0,0,0.87)] hover:bg-[#FBC02D]",
    light: "bg-[#FFF9C4] text-black hover:bg-[#FFF59D]",
    danger: "bg-[#D32F2F] text-white hover:bg-[#C62828]",
    outline: "border border-[#FDD835] bg-white text-black hover:bg-[#FFFDE7]",
  };

  return (
    <button
      type="button"
      className={`inline-flex h-[42px] items-center justify-center rounded-[4px] px-[22px] py-2 text-[15px] font-medium uppercase leading-[26px] tracking-[0.46px] transition ${buttonShadow} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function RequiredMark() {
  return <span className="text-[#C62828]"> *</span>;
}

function StepProgress({ stepIndex }) {
  return (
    <div className="relative flex h-[88px] shrink-0 items-center justify-between overflow-hidden bg-[#E5F6FD] px-10 py-6">
      <div
        className="absolute left-0 top-0 h-[3px] bg-[#FDD835]"
        style={{ width: `${((stepIndex + 1) / ADOPTION_STEPS.length) * 100}%` }}
      />
      {ADOPTION_STEPS.map((step, index) => {
        const completed = index < stepIndex;
        const active = index === stepIndex;

        return (
          <div key={step.id} className="relative z-10 flex items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-[16px] font-bold leading-6 ${
                completed ? "bg-[#0058BE]" : active ? "bg-[#FDD835]" : "bg-[#D9E3F6]"
              }`}
            >
              {completed ? (
                <Check className="h-[14px] w-[14px] text-white" strokeWidth={3} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="whitespace-nowrap text-[14px] font-semibold leading-5 tracking-[0.28px] text-[rgba(0,0,0,0.87)]">
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function FieldLabel({ field }) {
  return (
    <label htmlFor={`adoption-${field.name}`} className="px-1 text-[14px] font-semibold leading-5 tracking-[0.28px] text-[rgba(0,0,0,0.87)]">
      {field.label}
      {field.required && <RequiredMark />}
    </label>
  );
}

function FieldError({ show }) {
  if (!show) return null;
  return <span className="-mt-2 block text-xs font-normal text-[#c62828]">{FIELD_ERROR_MESSAGE}</span>;
}

function ContactField({ field, value, onChange, error = false, addresses = [], addressMode, onAddressModeChange }) {
  const invalid = Boolean(error);
  const sharedProps = {
    id: `adoption-${field.name}`,
    name: field.name,
    value,
    onChange: (event) => onChange(field.name, event.target.value),
    "aria-invalid": invalid || undefined,
    "data-adoption-error": invalid ? "true" : undefined,
  };

  if (field.name === "address" && addresses.length > 1) {
    const selectInvalid = invalid && addressMode !== NEW_ADDRESS_VALUE;
    const inputInvalid = invalid && addressMode === NEW_ADDRESS_VALUE;

    return (
      <div className={`flex flex-col gap-4 ${field.fullWidth ? "col-span-2" : ""}`}>
        <FieldLabel field={field} />
        <div className="relative">
          <select
            id="adoption-address-select"
            value={addressMode}
            onChange={(event) => {
              const nextValue = event.target.value;
              onAddressModeChange(nextValue);
              if (nextValue === NEW_ADDRESS_VALUE) {
                onChange(field.name, "");
                return;
              }
              const selectedAddress = addresses.find((address) => address.id === nextValue);
              onChange(field.name, selectedAddress?.address ?? "");
            }}
            className={`${inputClass} ${selectInvalid ? invalidInputClass : ""} appearance-none pr-12`}
            aria-invalid={selectInvalid || undefined}
            data-adoption-error={selectInvalid ? "true" : undefined}
          >
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.address}
              </option>
            ))}
            <option value={NEW_ADDRESS_VALUE}>Nhập địa chỉ mới</option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-[26px] top-1/2 h-6 w-6 -translate-y-1/2 text-[rgba(0,0,0,0.87)]"
            strokeWidth={1.8}
          />
        </div>
        {addressMode === NEW_ADDRESS_VALUE && (
          <input
            {...sharedProps}
            type="text"
            placeholder={field.placeholder}
            className={`${inputClass} ${inputInvalid ? invalidInputClass : ""}`}
            aria-invalid={inputInvalid || undefined}
            data-adoption-error={inputInvalid ? "true" : undefined}
          />
        )}
        <FieldError show={invalid} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${field.fullWidth ? "col-span-2" : ""}`}>
      <FieldLabel field={field} />
      {field.type === "select" ? (
        <div className="relative">
          <select {...sharedProps} className={`${inputClass} ${invalid ? invalidInputClass : ""} appearance-none pr-12`}>
            <option value="">{field.placeholder}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-[26px] top-1/2 h-6 w-6 -translate-y-1/2 text-[rgba(0,0,0,0.87)]"
            strokeWidth={1.8}
          />
        </div>
      ) : (
        <input
          {...sharedProps}
          type={field.type}
          placeholder={field.placeholder}
          className={`${inputClass} ${invalid ? invalidInputClass : ""}`}
        />
      )}
      <FieldError show={invalid} />
    </div>
  );
}

function RadioPill({ question, option, checked, onChange, framed, invalid }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-[18px] rounded-[8px] bg-white text-[16px] leading-6 text-[rgba(0,0,0,0.87)] ${
        framed ? "min-h-[52px] border-2 border-[#D9E3F6] px-[26px] py-[14px]" : ""
      } ${invalid && framed ? "border-[#c62828] ring-1 ring-[#c62828]" : ""}`}
    >
      <input
        type="radio"
        name={question.name}
        value={option}
        checked={checked}
        onChange={(event) => onChange(question.name, event.target.value)}
        aria-invalid={invalid || undefined}
        data-adoption-error={invalid ? "true" : undefined}
        className="h-5 w-5 shrink-0 accent-[#0058BE]"
      />
      <span>{option}</span>
    </label>
  );
}

function RadioQuestion({ question, value, onChange, error = false }) {
  const framed = !question.compact;
  const invalid = Boolean(error);

  return (
    <fieldset className="flex w-full flex-col gap-4">
      <legend className="text-[18px] font-medium leading-7 text-[rgba(0,0,0,0.87)]">
        {question.label}
        {question.required && <RequiredMark />}
      </legend>
      <div
        className={
          question.compact
            ? "flex w-full items-start justify-between gap-4"
            : question.columns === 2
              ? "grid w-full grid-cols-2 gap-4"
              : "flex w-full flex-col gap-4"
        }
      >
        {question.options.map((option) => (
          <RadioPill
            key={option}
            question={question}
            option={option}
            checked={value === option}
            onChange={onChange}
            framed={framed}
            invalid={invalid}
          />
        ))}
      </div>
      <FieldError show={invalid} />
    </fieldset>
  );
}

function TextareaQuestion({ question, value, onChange, error = false }) {
  const invalid = Boolean(error);

  return (
    <div className="flex w-full flex-col gap-4 pb-[6px]">
      <label htmlFor={`adoption-${question.name}`} className="text-[18px] font-medium leading-7 text-[rgba(0,0,0,0.87)]">
        {question.label}
        {question.required && <RequiredMark />}
      </label>
      <textarea
        id={`adoption-${question.name}`}
        name={question.name}
        value={value}
        onChange={(event) => onChange(question.name, event.target.value)}
        placeholder={question.placeholder}
        aria-invalid={invalid || undefined}
        data-adoption-error={invalid ? "true" : undefined}
        className={`min-h-[108px] w-full resize-none rounded-[8px] border-2 border-[#D9E3F6] bg-white px-[26px] pb-[18px] pt-[18px] text-[16px] leading-6 text-[rgba(0,0,0,0.87)] outline-none placeholder:text-[rgba(113,119,133,0.87)] focus:border-[#90CAF9] focus:ring-2 focus:ring-[#90CAF9]/30 ${invalid ? invalidInputClass : ""}`}
      />
      <FieldError show={invalid} />
    </div>
  );
}

function ContactStep({ values, onChange, errors, addresses, addressMode, onAddressModeChange }) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {CONTACT_FIELDS.map((field) => (
        <ContactField
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={onChange}
          error={errors.includes(field.name)}
          addresses={addresses}
          addressMode={addressMode}
          onAddressModeChange={onAddressModeChange}
        />
      ))}
    </div>
  );
}

function LivingStep({ values, onChange, errors }) {
  return (
    <div className="flex w-full flex-col gap-6">
      {LIVING_CONDITION_QUESTIONS.map((question) => (
        <RadioQuestion
          key={question.name}
          question={question}
          value={values[question.name]}
          onChange={onChange}
          error={errors.includes(question.name)}
        />
      ))}
    </div>
  );
}

function CommitmentStep({ values, onChange, errors }) {
  return (
    <div className="flex w-full flex-col gap-6">
      {COMMITMENT_QUESTIONS.map((question) =>
        question.type === "textarea" ? (
          <TextareaQuestion
            key={question.name}
            question={question}
            value={values[question.name]}
            onChange={onChange}
            error={errors.includes(question.name)}
          />
        ) : (
          <RadioQuestion
            key={question.name}
            question={question}
            value={values[question.name]}
            onChange={onChange}
            error={errors.includes(question.name)}
          />
        ),
      )}
      <div className="flex w-full items-center gap-4 rounded-[4px] border border-[rgba(186,26,26,0.2)] bg-[rgba(255,218,214,0.3)] px-[25px] py-[11px]">
        <AlertTriangle aria-hidden="true" className="h-[26px] w-[18px] shrink-0 text-[#BA1A1A]" strokeWidth={2} />
        <p className="text-justify text-[13px] font-semibold leading-5 tracking-[0.28px] text-[#93000A]">
          {ADOPTION_COMMITMENT_NOTE}
        </p>
      </div>
    </div>
  );
}

function SuccessView({ onClose }) {
  const navigate = useNavigate();
  return (
    <div className="relative w-[884px] max-w-[calc(100vw-48px)] overflow-hidden rounded-[8px] border border-[#D9E3F6] bg-white p-px shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:rounded-[32px]">
      <div className="flex min-h-[461px] flex-col items-center justify-center bg-[radial-gradient(circle_at_0_0,#D9E3F6_0_1%,transparent_1.2%)] px-8 py-14 text-center sm:px-16">
        <img src="/src/assets/images/checkout/success-icon.svg" alt="" class="size-[69px] shrink-0"></img>
        <div className="mt-8 flex flex-col items-center gap-2">
          <h2 className="text-[32px] font-bold leading-[1.167] text-[#3D3D3D] sm:text-[48px]">
            {ADOPTION_SUCCESS.title}
          </h2>
          <p className="max-w-[635px] whitespace-pre-line text-[16px] leading-6 tracking-[0.15px] text-[rgba(0,0,0,0.87)]">
            {ADOPTION_SUCCESS.description}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <ModalButton
            onClick={() => {
              onClose();
              navigate("/");
            }}
            className="font-bold"
          >
            Trở về trang chủ
          </ModalButton>
          <ModalButton variant="outline" onClick={onClose} className="shadow-none">
            Xem tiếp các bé khác
          </ModalButton>
        </div>
        <div className="mt-8 flex w-full max-w-[635px] items-center justify-center border-t border-[#D9E3F6] pt-[17px]">
          <Phone aria-hidden="true" className="mr-2 h-[10.5px] w-[10.5px] text-[#0D47A1]" strokeWidth={2} />
          <span className="text-[16px] leading-6 text-[rgba(0,0,0,0.87)]">Nếu có thắc mắc, liên hệ hotline:</span>
          <strong className="pl-1 text-[16px] leading-6 text-[#0D47A1]">{ADOPTION_SUCCESS.hotline}</strong>
        </div>
      </div>
    </div>
  );
}

export default function AdoptionApplicationModal({ open, pet, onClose, onSubmitApplication }) {
  const { isAuthenticated, userProfile } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState(initialFormValues);
  const [addresses, setAddresses] = useState([]);
  const [addressMode, setAddressMode] = useState(NEW_ADDRESS_VALUE);
  const [validationAttemptedByStep, setValidationAttemptedByStep] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const userId = userProfile?.userId;

  useEffect(() => {
    if (!open) return;
    let active = true;
    const nextAddresses = isAuthenticated ? loadUserAddresses() : [];
    const defaultAddress =
      nextAddresses.find((address) => address.isDefault) ?? nextAddresses[0];

    setStepIndex(0);
    setAddresses(nextAddresses);
    setAddressMode(nextAddresses.length > 1 && defaultAddress?.id ? defaultAddress.id : NEW_ADDRESS_VALUE);
    setValues(getPrefilledValues({ isAuthenticated, userProfile, addresses: nextAddresses }));
    setValidationAttemptedByStep({});
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError("");
    document.body.style.overflow = "hidden";

    if (isAuthenticated && userId) {
      getUserAddresses(userId)
        .then((apiAddresses) => {
          if (!active || !apiAddresses.length) return;
          const apiDefaultAddress =
            apiAddresses.find((address) => address.isDefault) ?? apiAddresses[0];

          setAddresses(apiAddresses);
          setAddressMode(apiAddresses.length > 1 && apiDefaultAddress?.id ? apiDefaultAddress.id : NEW_ADDRESS_VALUE);
          setValues(getPrefilledValues({ isAuthenticated, userProfile, addresses: apiAddresses }));
          localStorage.setItem(PROFILE_STORAGE_KEYS.addresses, JSON.stringify(apiAddresses));
        })
        .catch(() => {
          // Local addresses are already loaded as a fallback.
        });
    }

    return () => {
      active = false;
      document.body.style.overflow = "";
    };
  }, [open, isAuthenticated, userProfile, userId]);

  const currentStep = ADOPTION_STEPS[stepIndex];
  const isLastStep = stepIndex === ADOPTION_STEPS.length - 1;

  const formTitle = useMemo(() => {
    if (!pet?.name) return currentStep.title;
    return currentStep.title;
  }, [currentStep.title, pet?.name]);

  if (!open) return null;

  const handleChange = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleNext = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const missingFields = getMissingFields(values, currentStep.id);
    if (missingFields.length > 0) {
      setValidationAttemptedByStep((current) => ({ ...current, [currentStep.id]: true }));
      window.setTimeout(() => {
        formElement.querySelector('[data-adoption-error="true"]')?.focus();
      }, 0);
      return;
    }

    if (isLastStep) {
      setSubmitError("");
      setIsSubmitting(true);
      try {
        if (onSubmitApplication) {
          await onSubmitApplication(values);
        }
        setSubmitted(true);
      } catch (error) {
        setSubmitError(error?.message || "Không thể gửi đơn nhận nuôi.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setValidationAttemptedByStep((current) => ({ ...current, [currentStep.id]: false }));
    setStepIndex((index) => index + 1);
  };

  const renderStep = () => {
    const stepErrors = validationAttemptedByStep[currentStep.id]
      ? getMissingFields(values, currentStep.id)
      : [];

    if (currentStep.id === "contact") {
      return (
        <ContactStep
          values={values}
          onChange={handleChange}
          errors={stepErrors}
          addresses={addresses}
          addressMode={addressMode}
          onAddressModeChange={setAddressMode}
        />
      );
    }
    if (currentStep.id === "living") {
      return <LivingStep values={values} onChange={handleChange} errors={stepErrors} />;
    }
    return <CommitmentStep values={values} onChange={handleChange} errors={stepErrors} />;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(6,16,90,0.2)] p-6 font-['Roboto'] backdrop-blur-[2px]">
      {submitted ? (
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-[-18px] top-[-40px] z-[102] flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F6FD]"
            aria-label="Đóng modal nhận nuôi"
          >
            <X className="h-3.5 w-3.5 text-[#717785]" strokeWidth={2.5} />
          </button>
          <SuccessView onClose={onClose} />
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-[-18px] top-[-19px] z-[102] flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F6FD]"
            aria-label="Đóng modal nhận nuôi"
          >
            <X className="h-3.5 w-3.5 text-[#717785]" strokeWidth={2.5} />
          </button>
          <form
            noValidate
            onSubmit={handleNext}
            className="flex max-h-[calc(100vh-48px)] w-[696px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-[32px] border border-[#D9E3F6] bg-white p-px shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
          >
            <StepProgress stepIndex={stepIndex} />
            <div className="flex min-h-0 flex-1 flex-col bg-[radial-gradient(circle_at_0_0,#D9E3F6_0_1%,transparent_1.2%)]">
              <div className="min-h-0 flex-1 overflow-y-auto px-16 pb-8 pt-[50px]">
                <div className="flex flex-col items-center gap-10">
                  <h2 className="text-center text-[28px] font-semibold leading-8 text-[rgba(0,0,0,0.87)]">
                    {formTitle}
                  </h2>
                  {submitError && (
                    <p className="-mt-6 rounded-[8px] bg-[#FFDAD6] px-4 py-3 text-center text-[14px] font-semibold text-[#93000A]">
                      {submitError}
                    </p>
                  )}
                  <div className="w-full max-w-[568px]">{renderStep()}</div>
                </div>
              </div>
              <div className="shrink-0 bg-transparent px-16 pb-16 pt-0">
                <div className="mx-auto flex max-w-[568px] items-center justify-between">
                  <ModalButton
                    variant={stepIndex === 0 ? "danger" : "light"}
                    onClick={stepIndex === 0 ? onClose : () => setStepIndex((index) => index - 1)}
                  >
                    {stepIndex === 0 ? "Hủy" : "Quay lại"}
                  </ModalButton>
                  <ModalButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang gửi..." : isLastStep ? "Gửi đơn" : "Tiếp tục"}
                  </ModalButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
