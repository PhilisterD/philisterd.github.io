from PIL import Image
import os

# 指定包含JPG文件的文件夹
input_folder = "images"

# 创建一个目标文件夹，用于保存转换后的WEBP文件
output_folder = "output"
os.makedirs(output_folder, exist_ok=True)

# 列出输入文件夹中的所有JPG文件
jpg_files = [f for f in os.listdir(input_folder) if f.lower().endswith('.jpg')]

# 遍历JPG文件并将其转换为WEBP格式
for jpg_file in jpg_files:
    jpg_path = os.path.join(input_folder, jpg_file)
    webp_file = os.path.splitext(jpg_file)[0] + '.webp'  # 新的WEBP文件名
    webp_path = os.path.join(output_folder, webp_file)

    # 打开JPG文件并保存为WEBP
    img = Image.open(jpg_path)
    img.save(webp_path, 'webp')

print("转换完成。")
