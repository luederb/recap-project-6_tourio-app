import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // GET request:
  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ status: "Not Found" });
      }
      response.status(200).json(place);
    } catch (error) {
      response.status(500).json({ status: "Internal Server Error" });
    }
  }

  // PATCH request:
  if (request.method === "PATCH") {
    try {
      const place = await Place.findByIdAndUpdate(id, {
        $set: request.body,
      });
      if (!place) {
        return response.status(404).json({ status: "Not Found" });
      }

      response.status(200).json({ status: `Place ${id} updated!` });
    } catch (error) {
      response.status(500).json({ status: "Internal Server Error" });
    }
  }

  // DELETE request:
  if (request.method === "DELETE") {
    try {
      await Place.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `Place ${id} successfully deleted.` });
    } catch (error) {
      response.status(500).json({ status: "Internal Server Error" });
    }
  } else return response.status(405).json({ message: "Method not allowed" });
}
