from PIL import Image
import os

# 源图片文件夹路径
source_folder = "images"
# 压缩后的图片文件夹路径
output_folder = "output"
# 压缩比例（0.5表示压缩到原图的50%大小）
compression_ratio = 0.7

# 创建压缩后的文件夹（如果不存在）
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# 获取源文件夹中的所有.jpg文件
image_files = [f for f in os.listdir(source_folder) if f.endswith(".jpg")]

for image_file in image_files:
    # 打开源图片
    with Image.open(os.path.join(source_folder, image_file)) as img:
        # 计算压缩后的尺寸
        width, height = img.size
        new_width = int(width * compression_ratio)
        new_height = int(height * compression_ratio)
        # 压缩图片
        compressed_img = img.resize((new_width, new_height), Image.ANTIALIAS)
        # 保存压缩后的图片
        compressed_img.save(os.path.join(output_folder, image_file), "JPEG")

print("图片压缩完成")
