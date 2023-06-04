import { catchAsync } from "../utils/catchAsync.js";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const generateImage = catchAsync(async (req, res, next) => {
  const { prompt } = req.body;
  console.log(prompt);
  const aiResponse = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  console.log("asd");
  const image = aiResponse.data.data[0].b64_json;

  res.status(200).json({
    status: "success",
    photo: image,
  });
});
