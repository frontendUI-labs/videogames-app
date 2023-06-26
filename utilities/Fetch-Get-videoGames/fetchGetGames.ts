export async function getVideoGames(): Promise<any> {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=2b650dbbb0f64479b2f2bf63a1d29c13"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}
