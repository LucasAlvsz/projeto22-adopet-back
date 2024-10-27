import { NotFoundError } from "@/errors";
import { addressRepository } from "@/repositories";
import { CEPResponse } from "@/types/addressType";

const create = async (CEP: string) => {
  const { cep, state, city, neighborhood, street } = await validateCEP(CEP);
  const { id: addressId } = await addressRepository.create({
    cep,
    state,
    city,
    street,
    district: neighborhood,
  });

  return { addressId };
};

const validateCEP = async (CEP: string): Promise<CEPResponse> => {
  CEP = CEP.replace(/\D/g, "");
  const response = await fetch(`${process.env.BRASIL_API_URL}/cep/v2/${CEP}`);
  if (response.status === 404) throw new NotFoundError("CEP not found");

  return response.json();
};

export default { create, validateCEP };
