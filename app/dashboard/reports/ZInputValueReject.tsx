"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import InputAuto from "@/app/components/inputs/InputAuto";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const ReportsClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [field, setField] = useState("");
  const [options, setOptions] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const place = watch("place");

  const setCostumValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  // setField("place");
  // setInput("a");

  const setSearchOptions = useCallback(
    (input: string, field: string) => {
      axios
        .get("/api/field", {
          params: {
            input,
            field,
          },
        })
        .then((response) => {
          console.log(response);
          // setOptionsField(response.data);
          setOptions(response.data);
          // return response;
        })
        .catch((error) => {
          console.log("error teu ngarti");
        })
        .finally(() => {
          return options;
        });
    },
    [options]
  );

  // const setSearchOptions = (input: string, field: string) => {
  //   setInput(input);
  //   setField(input);

  //   return options;
  // };

  // return setSearchOptions()
  // console.log("coba :", setSearchOptions("aa", "place"));
  // }, []);

  return (
    <Container>
      <div className="flex flex-col text-darker pt-20">
        <Heading title="Beranda" subtitle="Seluruh data hari ini!" />

        <InputAuto
          label="Tempat"
          value={place}
          onChange={(value) => setCostumValue("place", value)}
          onSearch={(inputSearch) => setSearchOptions(inputSearch, "place")}
        />
      </div>
    </Container>
  );
};

export default ReportsClient;
