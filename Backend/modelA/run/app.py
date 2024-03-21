# from fastapi import FastAPI, File, UploadFile, Form
# from fastapi.responses import FileResponse
# import uvicorn
# from typing import Optional
# from PIL import Image
# import io
# import os
# from utils_ootd import get_mask_location  # assuming this is a utility function you have
# from preprocess.openpose.run_openpose import OpenPose
# from preprocess.humanparsing.run_parsing import Parsing
# from ootd.inference_ootd_hd import OOTDiffusionHD
# from ootd.inference_ootd_dc import OOTDiffusionDC
# import torch

# # Initialize FastAPI app
# app = FastAPI()

# # Assuming the models are initialized as in your original script
# openpose_model_hd = OpenPose(0)
# parsing_model_hd = Parsing(0)
# ootd_model_hd = OOTDiffusionHD(0)

# openpose_model_dc = OpenPose(1)
# parsing_model_dc = Parsing(1)
# ootd_model_dc = OOTDiffusionDC(1)

# category_dict = ['upperbody', 'lowerbody', 'dress']
# category_dict_utils = ['upper_body', 'lower_body', 'dresses']

# # Default values
# n_samples_default = 1
# n_steps_default = 20
# image_scale_default = 2
# seed_default = -1

# @app.post("/process_hd/")
# async def process_hd_endpoint(vton_img: UploadFile = File(...), garm_img: UploadFile = File(...), 
#                               n_samples: Optional[int] = Form(n_samples_default), 
#                               n_steps: Optional[int] = Form(n_steps_default), 
#                               image_scale: Optional[float] = Form(image_scale_default), 
#                               seed: Optional[int] = Form(seed_default)):
#     return await process_hd(vton_img, garm_img, n_samples, n_steps, image_scale, seed)

# @app.post("/process_dc/")
# async def process_dc_endpoint(vton_img: UploadFile = File(...), garm_img: UploadFile = File(...), 
#                               category: str = Form(...), 
#                               n_samples: Optional[int] = Form(n_samples_default), 
#                               n_steps: Optional[int] = Form(n_steps_default), 
#                               image_scale: Optional[float] = Form(image_scale_default), 
#                               seed: Optional[int] = Form(seed_default)):
#     return await process_dc(vton_img, garm_img, category, n_samples, n_steps, image_scale, seed)

# async def process_hd(vton_img, garm_img, n_samples, n_steps, image_scale, seed):
#     # Process images similar to the original function, but adapted for FastAPI's async file handling
#     # Return the processed image(s)
#     pass

# async def process_dc(vton_img, garm_img, category, n_samples, n_steps, image_scale, seed):
#     # Process images similar to the original function, but adapted for FastAPI's async file handling
#     # Convert the category string to the required integer if needed
#     # Return the processed image(s)
#     pass

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from starlette.responses import Response
from starlette.routing import Mount
import torch
from diffusers import StableCascadeDecoderPipeline, StableCascadePriorPipeline
import io
import os
import cv2
from typing import Optional
from PIL import Image

# Assuming utility and processing functions are defined or imported correctly
# from utils_ootd import get_mask_location
# from preprocess.openpose.run_openpose import OpenPose
# from preprocess.humanparsing.run_parsing import Parsing
# from ootd.inference_ootd_hd import OOTDiffusionHD
# from ootd.inference_ootd_dc import OOTDiffusionDC

app = FastAPI()

# Enable CORS from all sources
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

# Global variables and model initializations
device = "cuda"
num_images_per_prompt = 1
# Add additional models initializations here

class ImageGenerationRequest(BaseModel):
    prompt: str
    negative: str
    width: int
    height: int
    use_add: bool

# Existing and new endpoints below
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

@app.post("/process_hd/")
async def process_hd_endpoint(vton_img: UploadFile = File(...), garm_img: UploadFile = File(...), 
                              n_samples: Optional[int] = Form(1), 
                              n_steps: Optional[int] = Form(20), 
                              image_scale: Optional[float] = Form(2.0), 
                              seed: Optional[int] = Form(-1)):
    # Newly integrated processing logic for HD
    pass

@app.post("/process_dc/")
async def process_dc_endpoint(vton_img: UploadFile = File(...), garm_img: UploadFile = File(...), 
                              category: str = Form(...), 
                              n_samples: Optional[int] = Form(1), 
                              n_steps: Optional[int] = Form(20), 
                              image_scale: Optional[float] = Form(2.0), 
                              seed: Optional[int] = Form(-1)):
    # Newly integrated processing logic for DC
    pass

# Add any additional integrated endpoints or logic here

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
