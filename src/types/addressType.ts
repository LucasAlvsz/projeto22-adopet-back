type Address = {
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
};

/*
{
  "cep": "89010025",
  "state": "SC",
  "city": "Blumenau",
  "neighborhood": "Centro",
  "street": "Rua Doutor Luiz de Freitas Melro",
  "service": "viacep",
  "location": {
    "type": "Point",
    "coordinates": {
      "longitude": "-49.0629788",
      "latitude": "-26.9244749"
    }
  }
}
*/

type CEPResponse = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
};

export { Address, CEPResponse };
