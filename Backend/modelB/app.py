import torch
import gradio as gr
from PIL import Image
import spaces
import tqdm
from diffusers import StableCascadeDecoderPipeline, StableCascadePriorPipeline

device = "cuda:4"
num_images_per_prompt = 1

prior = StableCascadePriorPipeline.from_pretrained("stabilityai/stable-cascade-prior", torch_dtype=torch.bfloat16).to(device)
decoder = StableCascadeDecoderPipeline.from_pretrained("stabilityai/stable-cascade",  torch_dtype=torch.float16).to(device)

deafult_negative = "poorly Rendered face, poorly drawn face, poor facial details, poorly drawn hands, poorly rendered hands, low resolution, blurry image, oversaturated, bad anatomy, signature, watermark, username, error, missing limbs, error, out of frame, extra fingers, mutated hands, poorly drawn hands, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username"

prompt_add = "(dark shot:1.17), epic realistic, faded, ((neutral colors)), art, (hdr:1.5), (muted colors:1.2), hyperdetailed, (artstation:1.5), cinematic, warm lights, dramatic light, (intricate details:1.1), complex background, (rutkowski:0.8), (teal and orange:0.4)"

css = """
footer {
    visibility: hidden
}

#generate_button {
    color: white;
    border-color: #007bff;
    background: #2563eb;

}

#save_button {
    color: white;
    border-color: #028b40;
    background: #01b97c;
    width: 200px;
}

#settings_header {
    background: rgb(245, 105, 105);

}
"""

@spaces.GPU
def gen(prompt, negative, width, height, use_add, progress=gr.Progress()):
    if use_add:
        text = f"{prompt}, {prompt_add}"
    else:
        text = f"{prompt}"
    prior_output = prior(
        prompt=text,
        height=height,
        width=width,
        negative_prompt=negative,
        guidance_scale=4.0,
        num_images_per_prompt=num_images_per_prompt,
        num_inference_steps=25
    )
    decoder_output = decoder(
        image_embeddings=prior_output.image_embeddings.half(),
        prompt=text,
        negative_prompt=negative,
        guidance_scale=0.0,
        output_type="pil",
        num_inference_steps=10
    ).images
    return decoder_output

with gr.Blocks(css=css) as demo:
    gr.Markdown("# StyleSync")
    with gr.Row():
        prompt = gr.Textbox(show_label=False, placeholder="Enter your prompt", max_lines=3, lines=1, interactive=True, scale=20)
        button = gr.Button(value="Generate", scale=1)
    with gr.Accordion("Advanced options", open=False):
        with gr.Row():
            negative = gr.Textbox(show_label=False, value=deafult_negative, placeholder="Enter a negative", max_lines=4, lines=3, interactive=True)
        with gr.Row():
            width = gr.Slider(label="Width", minimum=1024, maximum=2048, step=8, value=1024, interactive=True)
            height = gr.Slider(label="Height", minimum=1024, maximum=2048, step=8, value=1024, interactive=True)
        with gr.Row():
            use_add = gr.Checkbox(label="Use prompt addition", value=True, interactive=True)
    with gr.Row():
        gallery = gr.Gallery(show_label=False, rows=1, columns=1, allow_preview=True, preview=True)

    button.click(gen, inputs=[prompt, negative, width, height, use_add], outputs=gallery)

demo.queue().launch(show_api=False)
