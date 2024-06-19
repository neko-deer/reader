import os
import json
import re

def natural_sort_key(s):
    # Helper function to sort strings in natural order
    return [int(text) if text.isdigit() else text.lower() for text in re.split('(\d+)', s)]

def generate_json(base_dir):
    titles = {}

    # Iterate over each title directory
    for title in os.listdir(base_dir):
        title_path = os.path.join(base_dir, title)
        if os.path.isdir(title_path):
            chapters = {}

            # Iterate over each chapter directory within the title
            for chapter in os.listdir(title_path):
                chapter_path = os.path.join(title_path, chapter)
                if os.path.isdir(chapter_path):
                    pages = []

                    # Iterate over each image file within the chapter
                    for page in os.listdir(chapter_path):
                        if page.endswith(('.jpg', '.jpeg', '.webp', '.png', '.gif')):
                            pages.append(page)

                    # Sort the pages in natural order
                    pages.sort(key=natural_sort_key)
                    chapters[chapter] = pages

            # Sort the chapters in natural order
            sorted_chapters = dict(sorted(chapters.items(), key=lambda x: natural_sort_key(x[0])))
            titles[title] = {'chapters': sorted_chapters}

    return {'titles': titles}

# Specify the base directory containing the titles
base_dir = 'D:/Manga_Manhwa/read/'

# Generate the JSON structure
json_data = generate_json(base_dir)

# Specify the output directory for the JSON file
output_file = 'titles.json'

# Save the JSON structure to a file
with open(output_file, 'w') as json_file:
    json.dump(json_data, json_file, indent=4)

print(f"JSON file created successfully at {output_file}!")
