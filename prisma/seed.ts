import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { faker } from "@faker-js/faker";
import { cryptographyUtils } from "../src/utils/";

const main = async () => {
  const users = [
    {
      id: "1",
      name: "Lucax",
      email: "lucax@gmail.com",
      password: cryptographyUtils.hashWithSalt("lucaxlucax"),
      phone: "(61) 99999-9999",
      addressId: "1",
    },
    {
      name: "Lucas",
      email: "lucas@gmail.com",
      password: cryptographyUtils.hashWithSalt("lucaslucas"),
      phone: "(61) 98888-8888",
      addressId: "1",
    },
  ];

  const addresses = [
    {
      id: "1",
      cep: "72547378",
      street: "Quadra 417 Conjunto 8",
      state: "DF",
      city: "Brasília",
      district: "Santa Maria",
    },
  ];

  const types = [
    {
      name: "Dog",
    },
    {
      name: "Cat",
    },
  ];

  const breeds = [
    {
      name: "Pug",
      petTypeId: 1,
    },
    {
      name: "Mestiço",
      petTypeId: 2,
    },
  ];
  const pets = [
    {
      name: faker.name.firstName(),
      petTypeId: 1,
      age: Number(faker.random.numeric()),
      sex: "Male" as const,
      weight: Number(faker.random.numeric()),
      vaccinated: true,
      about: faker.lorem.lines(),
      breedId: 1,
      ownerId: "1",
    },
    {
      name: faker.name.firstName(),
      petTypeId: 2,
      age: Number(faker.random.numeric()),
      sex: "Female" as const,
      weight: Number(faker.random.numeric()),
      vaccinated: true,
      about: faker.lorem.lines(),
      breedId: 2,
      ownerId: "1",
    },
    {
      name: faker.name.firstName(),
      petTypeId: 1,
      age: Number(faker.random.numeric()),
      sex: "Male" as const,
      weight: Number(faker.random.numeric()),
      vaccinated: false,
      about: faker.lorem.lines(),
      breedId: 1,
      ownerId: "1",
    },
    {
      name: faker.name.firstName(),
      petTypeId: 2,
      age: Number(faker.random.numeric()),
      sex: "Female" as const,
      weight: Number(faker.random.numeric()),
      vaccinated: false,
      about: faker.lorem.lines(),
      breedId: 2,
      ownerId: "1",
    },
    {
      name: faker.name.firstName(),
      petTypeId: 1,
      age: Number(faker.random.numeric()),
      sex: "Male" as const,
      weight: Number(faker.random.numeric()),
      vaccinated: true,
      about: faker.lorem.lines(),
      breedId: 1,
      ownerId: "1",
    },
  ];
  const notInterestedPets = [
    {
      userId: "1",
      petId: 5,
    },
  ];
  const pictures = [
    {
      url: "https://www.petz.com.br/blog/wp-content/uploads/2020/11/pode-dar-plasil-para-cachorro.jpg",
    },
    {
      url: "https://www.organnact.com.br/wp-content/uploads/2021/09/doencas-mais-comuns-em-gatos-no-inverno.jpg",
    },
    {
      url: "https://static.natgeo.pt/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp?w=768",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUnHC4LDnWLtbEjINI7oL2u29y50y7vb8jnPdgrEBqbxVHLImCJEj3ks_bxHCQgMipHw&usqp=CAU",
    },
    {
      url: "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
    },
    {
      url: "https://www.petlove.com.br/images/breeds/192469/profile/original/pug-p.jpg?1532539387",
    },
    {
      url: "https://t2.ea.ltmcdn.com/pt/posts/5/2/3/o_que_e_um_gato_vira_lata_21325_0_600.jpg",
    },
  ];
  const petPics = [
    {
      petId: 1,
      pictureId: 1,
    },
    {
      petId: 2,
      pictureId: 2,
    },
    {
      petId: 2,
      pictureId: 3,
    },
    {
      petId: 2,
      pictureId: 4,
    },
    {
      petId: 2,
      pictureId: 5,
    },
    {
      petId: 3,
      pictureId: 6,
    },
    {
      petId: 4,
      pictureId: 7,
    },
  ];
  await prisma.address.createMany({ data: addresses });
  await prisma.user.createMany({ data: users });
  await prisma.petType.createMany({ data: types });
  await prisma.breed.createMany({ data: breeds });
  await prisma.pet.createMany({ data: pets });
  await prisma.picture.createMany({ data: pictures });
  await prisma.petPictures.createMany({ data: petPics });
  await prisma.notInterestedPet.createMany({ data: notInterestedPets });
};
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
