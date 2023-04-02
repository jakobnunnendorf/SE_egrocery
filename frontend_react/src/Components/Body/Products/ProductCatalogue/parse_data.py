import csv
import json

# Read the CSV file
with open('/Users/jakobnunnendorf/Github/SE_egrocery/frontend_react/src/Components/Body/Products/ProductCatalogue/input.csv', 'r', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    # Parse each row into a JS object
    js_objects = []
    for row in reader:
        js_object = {
            'name': row['name'],
            'sku': row['sku'],
            'price': row['price'],
            'availability': row['availability'],
            'currency': row['currency'],
            'brand': row['brand'],
            'breadcrumbs': row['breadcrumbs'],
            'description': row['description'],
            'images': row['images'],
            'url': row['url'],
            'quantity': row['quantity'],
            'category': row['category'],
        }
        js_objects.append(js_object)

# Write the JS objects to a JSON file
with open('grocery_data_cleaned.json', 'w', encoding='utf-8') as jsonfile:
    json.dump(js_objects, jsonfile, ensure_ascii=False, indent=4)
