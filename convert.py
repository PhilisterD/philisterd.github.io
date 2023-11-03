from PIL import Image
import os

# 源图片文件夹路径
source_folder = "Movie_files"
# 压缩后的图片文件夹路径
output_folder = "output"
# 压缩比例（0.5表示压缩到原图的50%大小）
compression_ratio = 0.3

# 创建压缩后的文件夹（如果不存在）
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# 获取源文件夹中的所有.jpg文件
image_files = [f for f in os.listdir(source_folder) if f.endswith(".jpg")]

for image_file in image_files:
    print(image_file)
    im = Image.open(source_folder+'/'+image_file)
    im = im.convert('RGB')
    im.save(output_folder+'/'+image_file, quality=70) 
print("图片压缩完成")



