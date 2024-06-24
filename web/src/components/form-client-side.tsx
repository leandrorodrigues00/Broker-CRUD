"use client";

import { useState } from "react";

import { ListRealEstateAgents } from "@/components/list-real-estate-agents";
import { RealEstateAgentRegistrationForm } from "@/components/real-estate-agent-registration-form";

export interface FormClientSideProps {}

export function FormClientSide(props: FormClientSideProps) {
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleSuccess = () => {
    setUpdateTrigger(!updateTrigger);
  };
  return (
    <>
      <RealEstateAgentRegistrationForm onSuccess={handleSuccess} />

      <h1 className="mb-10 mt-20 text-3xl font-medium text-zinc-900">
        Lista de Corretores
      </h1>

      <ListRealEstateAgents updateTrigger={updateTrigger} />
    </>
  );
}
