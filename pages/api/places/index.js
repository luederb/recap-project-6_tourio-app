import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find();
      return response.status(200).json(places);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
