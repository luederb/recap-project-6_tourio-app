import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // GET request:
  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }
  // Patch request:
  if (request.method === "PATCH") {
    const place = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json({ status: `Place ${id} updated!` });
  }
}
