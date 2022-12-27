async function API(URL) {
  let DATA = await fetch(URL);
  let List = await DATA.json();
  return List;
}
export default API;
