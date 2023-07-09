"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useEffect } from "react";
import useCreateModal from "@/app/hooks/useCreateModal";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";

import { BiRename } from "react-icons/bi";
import { AiFillCalendar } from "react-icons/ai";
import { ImEnter, ImExit } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendarCheckFill } from "react-icons/bs";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import ResumeCard from "../card/ResumeCard";
import ServiceInput from "../inputs/ServiceInput";
import InputNomoratur from "../inputs/InputNomoratur";
import MultipleSelect from "../inputs/MultipleSelect";
import useOpenToast from "@/app/hooks/useOpenToast";

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
  const openToast = useOpenToast();
  const createModal = useCreateModal();
  const pathname = usePathname();

  const [msg, setMsg] = useState("");

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
      location: "",
      started: null,
      ended: null,
      eSamsat: 0,
      canceled: 0,
      listCanceled: [],
    },
  });

  const service = watch("service");
  const eSamsat = watch("eSamsat");
  const canceled = watch("canceled");
  const listCanceled = watch("listCanceled");
  const maximalCounter = getValues("ended") - getValues("started") + 1;

  const validateNomoratur = useCallback(
    (value: string) => {
      if (getValues("started") >= Number(value)) {
        return "Nomoratur harus lebih besar dari " + getValues("started");
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

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isLoading) {
      return;
    }

    if (service === "") {
      setMsg("Jenis layanan tidak boleh kosong!");
      return undefined;
    }

    if (step !== STEPS.RESUME) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/report", data)
      .then(() => {
        reset();
        setStep(STEPS.SERVICE);
        createModal.onClose();
        openToast.setTitle("Laporan Disimpan");
        openToast.setSubTitle("Data laporan anda telah tersimpan!");
        openToast.onOpen();
        openToast.onChange();
        if (pathname === "/dashboard") window.location.assign(`/dashboard`);
      })
      .catch(() => {
        setMsg("Tidak dapat menyimpan data!");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    <div className="flex flex-col gap-4 h-full tall:h-fit tall:overflow-visible">
      <Heading
        title="Jenis Layanan"
        subtitle="Tentukan jenis layanan anda hari ini!"
      />
      <p className="text-xs text-rose-400">{msg}</p>
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
            id="started"
            label="Nomor Awal"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <InputNomoratur
            id="ended"
            label="Nomor Akhir"
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
            value={eSamsat}
            onChange={(value) => setCostumValue("eSamsat", value)}
          />
          <hr />
          <Counter
            title="Batal"
            subtitle="Nomoratur Batal"
            maximalCounter={maximalCounter}
            value={canceled}
            onChange={(value) => setCostumValue("canceled", value)}
          />
          <MultipleSelect
            canceled={canceled}
            value={listCanceled}
            started={getValues("started")}
            ended={getValues("ended")}
            onChange={(value) => setCostumValue("listCanceled", value)}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.RESUME) {
    bodyContent = (
      <div className="flex flex-col gap-4 h-full tall:h-fit tall:overflow-visible">
        <Heading
          title="Resume Hari ini!"
          subtitle="Keseluruhan input anda pada hari ini!"
        />
        <ResumeCard
          started={getValues("started")}
          ended={getValues("ended")}
          eSamsat={eSamsat}
          canceled={canceled}
          listCanceled={listCanceled}
          place={getValues("place")}
          location={getValues("location")}
          service={service}
        />
        <p className="text-xs text-rose-400"></p>
      </div>
    );
  }

  return (
    <Modal
      onClose={createModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      isOpen={createModal.isOpen}
      title="Buat laporan harian!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.SERVICE ? undefined : onBack}
      step={step}
      isForm
      body={bodyContent}
    />
  );
};

export default CreateModal;
