from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import torch
from diffusers import StableCascadeDecoderPipeline, StableCascadePriorPipeline
import io
import os
from fastapi.responses import FileResponse

from fastapi import FastAPI, Request, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.responses import HTMLResponse
from starlette.routing import Mount


app = FastAPI()

# Enable CORS from all sources
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

device = "cuda"
num_images_per_prompt = 1

# prior = StableCascadePriorPipeline.from_pretrained("stabilityai/stable-cascade-prior", torch_dtype=torch.bfloat16).to(device)
# decoder = StableCascadeDecoderPipeline.from_pretrained("stabilityai/stable-cascade", torch_dtype=torch.float16).to(device)

# prompt_add = "(dark shot:1.17), epic realistic, faded, ((neutral colors)), art, (hdr:1.5), (muted colors:1.2), hyperdetailed, (artstation:1.5), cinematic, warm lights, dramatic light, (intricate details:1.1), complex background, (rutkowski:0.8), (teal and orange:0.4)"

class ImageGenerationRequest(BaseModel):
    prompt: str
    negative: str
    width: int
    height: int
    use_add: bool

@app.post("/generate-image/")
async def generate_image(request: ImageGenerationRequest):
    
    prior = StableCascadePriorPipeline.from_pretrained("stabilityai/stable-cascade-prior", torch_dtype=torch.bfloat16).to(device)
    decoder = StableCascadeDecoderPipeline.from_pretrained("stabilityai/stable-cascade", torch_dtype=torch.float16).to(device)

    prompt_add = "(dark shot:1.17), epic realistic, faded, ((neutral colors)), art, (hdr:1.5), (muted colors:1.2), hyperdetailed, (artstation:1.5), cinematic, warm lights, dramatic light, (intricate details:1.1), complex background, (rutkowski:0.8), (teal and orange:0.4)"

    
    if request.use_add:
        text = f"{request.prompt}, {prompt_add}"
    else:
        text = request.prompt
    try:
        prior_output = prior(
            prompt=text,
            height=request.height,
            width=request.width,
            negative_prompt=request.negative,
            guidance_scale=4.0,
            num_images_per_prompt=num_images_per_prompt,
            num_inference_steps=25
        )
        decoder_output = decoder(
            image_embeddings=prior_output.image_embeddings.half(),
            prompt=text,
            negative_prompt=request.negative,
            guidance_scale=0.0,
            output_type="pil",
            num_inference_steps=10
        ).images
        
        # Convert PIL image to bytes and create a StreamingResponse
        img_io = io.BytesIO()
        decoder_output[0].save(img_io, 'JPEG', quality=70)
        img_io.seek(0)
        
        if not os.path.exists('static_files'):
            os.makedirs('static_files')
        image_path = os.path.join('static_files', 'generated_image.jpg')
        with open(image_path, 'wb') as f:
            f.write(img_io.getvalue())
        
        # with open('generated_image.jpg', 'wb') as f:
        #     f.write(img_io.getvalue())
        # return FileResponse("static_files/generated_image.jpg")
        # return StreamingResponse(io.BytesIO(img_io.getvalue()), media_type="image/jpeg")
        
        return {"status": "successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/get-image/")
async def get_image(request: Request):
    # Note: 'static_files' is the name used in app.mount, and 'generated_image.jpg' is the file path within that directory.
    try:
        app.mount("/static_files", StaticFiles(directory="static_files"), name="static_files")
        static_file_url = request.url_for("static_files", path="generated_image.jpg")
        return {"static_file_url": static_file_url._url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    