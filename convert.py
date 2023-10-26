from PIL import Image
import os

# 设置文件夹路径
data_folder = "images"

# 获取data文件夹下的所有文件
file_list = os.listdir(data_folder)

# 循环处理每个文件
for file_name in file_list:
    if file_name.endswith(".jpg"):
        # 构建jpg文件的完整路径
        jpg_path = os.path.join(data_folder, file_name)

        # 构建png文件的完整路径
        png_path = os.path.join(data_folder, os.path.splitext(file_name)[0] + ".png")

        # 打开jpg文件
        img = Image.open(jpg_path)

        # 保存为png文件
        img.save(png_path, "PNG", quality=60)

print("转换完成")
