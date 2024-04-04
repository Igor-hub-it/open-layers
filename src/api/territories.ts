import { Territory } from "@/models/Territory";

export const getDangerousTerritories = (): Promise<Territory> => {
  return new Promise((resolve) => {
    resolve({
      name: "Название территории",
      coordinate: [55.7558, 37.6176], // координаты Москвы, например
      burnedPolygon: [
        [55.75, 37.6],
        [55.8, 37.6],
        [55.8, 37.7],
        [55.75, 37.7],
        [55.75, 37.6],
      ], // Пример координат полигона (произвольные значения)
      burnedArea: 1000, // Пример площади в квадратных километрах
      hazardCategory: 4, // Пример категории ущерба
    };)
  }) 
};

// export const territory = {
//   name: "Название территории",
//   coordinate: [55.7558, 37.6176], // координаты Москвы, например
//   burnedPolygon: [
//     [55.75, 37.6],
//     [55.8, 37.6],
//     [55.8, 37.7],
//     [55.75, 37.7],
//     [55.75, 37.6],
//   ], // Пример координат полигона (произвольные значения)
//   burnedArea: 1000, // Пример площади в квадратных километрах
//   hazardCategory: 4, // Пример категории ущерба
// };