"use client";

import useCreateModal from "@/app/hooks/useCreateModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import Heading from "../Heading";
import { AiFillCalendar, AiOutlineTrademarkCircle } from "react-icons/ai";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { ImEnter, ImExit } from "react-icons/im";
import { BsCalendarCheckFill } from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import ServiceInput from "../inputs/ServiceInput";
import Input from "../inputs/Input";
import { IoLocationOutline } from "react-icons/io5";

enum STEPS {
  SERVICE = 0,
  LOCATION = 1,
  NOMORATUR = 2,
  CANCELED = 3,
}

export const layanan = [
  {
    label: "Tahunan",
    icon: AiFillCalendar,
  },
  {
    label: "5 Tahunan",
    icon: BsCalendarCheckFill,
  },
  {
    label: "Bea Balik Nama (BBN1)",
    icon: BiRename,
  },
  {
    label: "Mutasi Masuk / BBBN / Ubah Bentuk",
    icon: ImEnter,
  },
  {
    label: "Mutasi Keluar",
    icon: ImExit,
  },
];

const CreateModal = () => {
  const createModal = useCreateModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.SERVICE);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      service: "",
      lokasi: "",
      nomoraturAwal: 1,
      nomoraturAkhir: 1,
      eSamsat: 1,
      jumlahBatal: 1,
      nomoraturBatal: [],
    },
  });

  const service = watch("service");
  const lokasi = watch("lokasi");
  const nomoraturAwal = watch("nomoraturAwal");
  const nomoraturAkhir = watch("nomoraturAkhir");
  const eSamsat = watch("eSamsat");
  const jumlahBatal = watch("jumlahBatal");
  const nomoraturBatal = watch("nomoraturBatal");

  const setCostumValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.CANCELED) {
      return onNext();
    }

    setIsLoading(true);
  };

  // Make Action Label Next or Create
  const actionLabel = useMemo(() => {
    if (step === STEPS.CANCELED) {
      return "Buat Laporan";
    }
    return "Selanjutnya";
  }, [step]);

  // Make Secondary Action Label using Undefined or Back
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.SERVICE) {
      return undefined;
    }
    return "Kembali";
  }, [step]);

  // Make Body Content Service
  let bodyContent = (
    <div className="flex flex-col gap-4 overflow-visible max-h-[60vh]">
      <Heading
        title="Jenis Layanan"
        subtitle="Tentukan jenis layanan anda hari ini!"
      />
      <div className="grid grid-cols-1 gap-3 pb-4">
        {layanan.map((item) => (
          <div key={item.label} className="col-span-1">
            <ServiceInput
              onClick={(service) => setCostumValue("service", service)}
              selected={service === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Lokasi anda" subtitle="Dimana layanan anda berada?" />
        <div className="flex flex-col gap-4">
          <Input
            id="place"
            label="Tempat Layanan"
            disabled={isLoading}
            register={register}
            errors={errors}
            icon={HiOutlineBuildingLibrary}
            required
            placeholder="Samsat Keliling"
          />
          <Input
            id="location"
            label="Lokasi"
            disabled={isLoading}
            register={register}
            errors={errors}
            icon={IoLocationOutline}
            required
            placeholder="Jalan Dago"
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.NOMORATUR) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Lokasi anda" subtitle="Dimana layanan anda berada?" />
        <div className="flex flex-col gap-4">
          <Input
            id="place"
            label="Tempat Layanan"
            disabled={isLoading}
            register={register}
            errors={errors}
            icon={HiOutlineBuildingLibrary}
            required
            placeholder="Samsat Keliling"
          />
          <Input
            id="location"
            label="Lokasi"
            disabled={isLoading}
            register={register}
            errors={errors}
            icon={IoLocationOutline}
            required
            placeholder="Jalan Dago"
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      onClose={createModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={createModal.isOpen}
      title="Buat laporan harian!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.SERVICE ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default CreateModal;
