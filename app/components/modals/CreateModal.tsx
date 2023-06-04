"use client";

import useCreateModal from "@/app/hooks/useCreateModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import Heading from "../Heading";
import { AiFillCalendar } from "react-icons/ai";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { ImEnter, ImExit } from "react-icons/im";
import { BsCalendarCheckFill } from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import ServiceInput from "../inputs/ServiceInput";
import Input from "../inputs/Input";
import { IoLocationOutline } from "react-icons/io5";
import InputNomoratur from "../inputs/InputNomoratur";
import Counter from "../inputs/Counter";
import MultipleSelect from "../inputs/MultipleSelect";
import ResumeCard from "../card/ResumeCard";

enum STEPS {
  SERVICE = 0,
  LOCATION = 1,
  NOMORATUR = 2,
  CANCELED = 3,
  RESUME = 4,
}

export const services = [
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

  // const [step, setStep] = useState(STEPS.RESUME);
  const [step, setStep] = useState(STEPS.SERVICE);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      service: "",
      place: "",
      address: "",
      nomoraturAwal: 1,
      nomoraturAkhir: 1,
      eSamsat: 0,
      jumlahBatal: 0,
      listBatal: [],
    },
  });

  const service = watch("service");
  const eSamsat = watch("eSamsat");
  const jumlahBatal = watch("jumlahBatal");
  const listBatal = watch("listBatal");
  const maximalCounter = getValues("akhir") - getValues("awal") + 1;

  const validateNomoratur = useCallback(
    (value: string) => {
      if (getValues("awal") >= Number(value)) {
        return "Nomoratur harus lebih besar dari " + getValues("awal");
      }
      if (Number(value) <= 0) {
        return "Nomoratur tidak boleh kosong atau negative";
      }
      return true;
    },
    [getValues]
  );

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
    if (service === "") {
      return undefined;
    }

    if (step !== STEPS.RESUME) {
      return onNext();
    }

    setIsLoading(true);
  };

  // Make Action Label Next or Create
  const actionLabel = useMemo(() => {
    if (step === STEPS.RESUME) {
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
    <div className="flex flex-col gap-4 overflow-y-scroll h-[60vh] tall:h-fit tall:overflow-visible">
      <Heading
        title="Jenis Layanan"
        subtitle="Tentukan jenis layanan anda hari ini!"
      />
      <div className="grid grid-cols-1 gap-3 pb-4">
        {services.map((item) => (
          <div key={item.label} className="col-span-1">
            <ServiceInput
              onClick={(service) => setCostumValue("service", service)}
              selected={service === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
        <p className="text-xs text-rose-400">
          {!service ? "Pilih jenis layanan hari ini!" : ""}
        </p>
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
            id="address"
            label="Alamat"
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
        <Heading
          title="Info Nomoratur"
          subtitle="Masukan nomoratur dan penggunaan E-Samsat!"
        />
        <div className="flex flex-col gap-4">
          <InputNomoratur
            id="awal"
            label="No Awal"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <InputNomoratur
            id="akhir"
            label="No Akhir"
            awal={getValues("awal")}
            validate={validateNomoratur}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.CANCELED) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Jumlah eSamsat dan yang batal"
          subtitle="Silahkan mengisi Pengguna E-samsat dan Batal hari ini!"
        />
        <div className="flex flex-col gap-4">
          <Counter
            title="E-Samsat"
            subtitle="Jumlah Penggunaan E-Samsat"
            maximalCounter={maximalCounter}
            akhir={getValues("akhir")}
            value={eSamsat}
            onChange={(value) => setCostumValue("eSamsat", value)}
          />
          <hr />
          <Counter
            title="Batal"
            subtitle="Nomoratur Batal"
            maximalCounter={maximalCounter}
            value={jumlahBatal}
            onChange={(value) => setCostumValue("jumlahBatal", value)}
          />
          <MultipleSelect
            jumlahBatal={jumlahBatal}
            value={listBatal}
            awal={getValues("awal")}
            akhir={getValues("akhir")}
            onChange={(value) => setCostumValue("listBatal", value)}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.RESUME) {
    bodyContent = (
      <div className="flex flex-col gap-4 overflow-y-scroll h-[60vh] tall:h-fit tall:overflow-visible">
        <Heading
          title="Resume Hari ini!"
          subtitle="Keseluruhan input anda pada hari ini!"
        />
        <ResumeCard
          awal={getValues("awal")}
          akhir={getValues("akhir")}
          eSamsat={eSamsat}
          jumlahBatal={jumlahBatal}
          listBatal={listBatal}
          place={getValues("place")}
          address={getValues("address")}
          service={service}
        />
      </div>
    );
  }

  return (
    <Modal
      onClose={createModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      // isOpen={true}
      isOpen={createModal.isOpen}
      title="Buat laporan harian!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.SERVICE ? undefined : onBack}
      step={step}
      body={bodyContent}
    />
  );
};

export default CreateModal;
