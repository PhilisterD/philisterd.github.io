import json
import os

def read_json(filename):
    with open(filename, "r") as f:
        data = json.load(f)
    return data

def generate_html(data):
    html = """<!DOCTYPE html>
<html lang="en">
<head>
    <title>电影列表</title>
</head>
<body>
    <ul>
"""
    for movie in data:
        html += """
        <li>
            <a href="movie.html?id={}" target="_blank">
                <img src="{}" alt="{}" />
                <p>{}</p>
            </a>
        </li>
        """.format(movie["id"], movie["image"], movie["title"], movie["summary"])
    html += """
    </ul>
</body>
</html>
"""
    return html

def write_html(html, filename):
    with open(filename, "w") as f:
        f.write(html)

if __name__ == "__main__":
    data = read_json("movies.json")
    html = generate_html(data)
    write_html(html, "index.html")

