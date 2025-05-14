import { getVenues } from "../../api/venues/getVenues.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderVenueList } from "../../ui/venues/renderVenueList.js";

export async function displayVenueList() {
  const container = document.querySelector("#venue-container");
  console.log("displayVenuesList");
  try {
    const venues = await getVenues();
    console.log("venues from displayVenuesList", venues);
    renderVenueList(container, venues);
  } catch (error) {
    console.log(error);
    displayMessage(container, "error", error.message);
  }
}
