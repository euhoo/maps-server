export default (citiesList) => {
  const cleanList = citiesList.data.response.items
    .map(item => item.title);
  const cleanUniqueCitiesList = Array.from(new Set(cleanList));

  return cleanUniqueCitiesList;
};
