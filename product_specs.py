import csv
import io
import logging

productSpecifications = {
  "Peeled-Garlic_Cheetah": "Peeled Garlic",
  "Cilantro_Cheetah": "Cilantro",
  "Red-Onion_Cheetah": "Red Onion",
  "Ginger_Cheetah": "Ginger",
  "Zucchini_Cheetah": "Zucchini",
  "Potato_Cheetah": "Potato",
  "Roma-Tomato_Cheetah": "Tomato",
  "Tomato_Cheetah": "Tomato",
  "American-Eggplant_Cheetah": "Eggplant",
  "Carrot_Cheetah": "Carrot",
  "Orange_Cheetah": "Orange",
  "Lemon_Cheetah": "Lemon",
  "Firm-Tofu_Cheetah": "Firm Tofu",
  "Broccoli_Cheetah": "Broccoli",
  "Cabbage_Cheetah": "Cabbage",
  "Cauliflower_Cheetah": "Cauliflower",
  "Lettuce_Cheetah": "Lettuce",
  "Spinach_Cheetah": "Spinach",
  "Celery_Cheetah": "Celery",
  "Mint_Cheetah": "Mint",
  "Green-Bell-Pepper_Cheetah": "Green Bell Pepper",
  "Red-Bell-Pepper_Cheetah": "Red Bell Pepper",
  "Seranno_Cheetah": "Seranno Pepper",
  "Chicken-Leg_Cheetah": "Chicken Leg",
  "Chicken-Thigh_Cheetah": "Chicken Thigh",
  "Chicken-Breast_Cheetah": "Chicken Breast",
  "Lamb-Leg_Cheetah": "Lamb Leg",
  "Cut-Goat_Cheetah": "Goat",
  "Swai-Fish-Fillets_Cheetah": "Swai Fish",
  "Tilapia-Fish-Fillet_Cheetah": "Tilapia Fish",
  "Peas-and-Carrots_Cheetah": "Peas and Carrots",
  "Frozen-Peas_Cheetah": "Peas",
  "Fresh-Okra_Cheetah": "Okra",
  "Mixed-Vegetables_Cheetah": "Mixed Vegetables",
  "Sriracha-Hot-Sauce_Cheetah": "Sriracha Hot Sauce",
  "Sambai-Oelek-Chili-Paste_Cheetah": "Sambai Oelek Chili Paste",
  "Lemon-Juice_Cheetah": "Lemon Juice",
  "Salt_Cheetah": "Salt",
  "Sugar_Cheetah": "Sugar",
  "All-purpose-Flour_Cheetah": "All Purpose Flour",
  "Tomato-Sauce_Cheetah": "Tomato Sauce",
  "Tomato-puree_Cheetah": "Tomato Puree",
  "Soybean-Oil_Cheetah": "Soybean Oil",
  "Fry-Oil_Cheetah": "Fry Oil",
  "Whole-Peeled-Tomato_Cheetah": "Whole Peeled Tomato",
  "Peeled-Garlic_Chef's-Store": "Peeled Garlic",
  "Cilantro_Chef's-Store": "Cilantro",
  "Red-Onion_Chef's-Store": "Red Onion",
  "Ginger_Chef's-Store": "Ginger",
  "Zucchini_Chef's-Store": "Zucchini",
  "Potato_Chef's-Store": "Potato",
  "Roma-Tomato_Chef's-Store": "Roma Tomato",
  "Tomato_Chef's-Store": "Tomato",
  "American-Eggplant_Chef's-Store": "Eggplant",
  "Carrot_Chef's-Store": "Carrot",
  "Orange_Chef's-Store": "Orange",
  "Lemon_Chef's-Store": "Lemon",
  "Green-Chili-Peppers_Chef's-Store": "Green Chili",
  "Firm-Tofu_Chef's-Store": "Firm Tofu",
  "Broccoli_Chef's-Store": "Broccoli",
  "Cabbage_Chef's-Store": "Cabbage",
  "Cauliflower_Chef's-Store": "Cauliflower",
  "Lettuce_Chef's-Store": "Lettuce",
  "Spinach_Chef's-Store": "Spinach",
  "Celery_Chef's-Store": "Celery",
  "Mint_Chef's-Store": "Mint",
  "Green-Bell-Pepper_Chef's-Store": "Green Bell Pepper",
  "Red-Bell-Pepper_Chef's-Store": "Red Bell Pepper",
  "Jalapeno_Chef's-Store": "Jalapeno",
  "Seranno_Chef's-Store": "Seranno Pepper",
  "Chicken-Leg_Chef's-Store": "Chicken Leg",
  "Chicken-Thigh_Chef's-Store": "Chicken Thigh",
  "Chicken-Breast_Chef's-Store": "Chicken Breast",
  "Lamb-Leg_Chef's-Store": "Lamb Leg",
  "Cut-Goat_Chef's-Store": "Goat",
  "Swai-Fish-Fillets_Chef's-Store": "Swai Fish",
  "Tilapia-Fish-Fillet_Chef's-Store": "Tilapia Fish",
  "Peas-and-Carrots_Chef's-Store": "Peas and Carrots",
  "Frozen-Peas_Chef's-Store": "Peas and Carrots",
  "Fresh-Okra_Chef's-Store": "Okra",
  "Mixed-Vegetables_Chef's-Store": "Mixed Vegetables",
  "Sriracha-Hot-Sauce_Chef's-Store": "Sriracha Hot Sauce",
  "Sambai-Oelek-Chili-Paste_Chef's-Store": "Sambai Oelek Chili Paste",
  "Lemon-Juice_Chef's-Store": "Lemon Juice",
  "Salt_Chef's-Store": "Salt",
  "Sugar_Chef's-Store": "Sugar",
  "All-purpose-Flour_Chef's-Store": "All Purpose Flour",
  "Tomato-Sauce_Chef's-Store": "Tomato Sauce",
  "Tomato-puree_Chef's-Store": "Tomato Puree",
  "Soybean-Oil_Chef's-Store": "Soybean Oil",
  "Fry-Oil_Chef's-Store": "Fry Oil",
  "Whole-Peeled-Tomato_Chef's-Store": "Whole Peeled Tomato",
  "Yellow-Onion_Costco": "Yellow Onion",
  "Peeled-Garlic_Costco": "Peeled Garlic",
  "Cilantro_Costco": "Cilantro",
  "Red-Onion_Costco": "Red Onion",
  "Ginger_Costco": "Ginger",
  "Zucchini_Costco": "Zucchini",
  "Potato_Costco": "Potato",
  "Roma-Tomato_Costco": "Roma Tomato",
  "Tomato_Costco": "Tomato",
  "American-Eggplant_Costco": "Eggplant",
  "Carrot_Costco": "Carrot",
  "Orange_Costco": "Orange",
  "Lemon_Costco": "Lemon",
  "Firm-Tofu_Costco": "Firm Tofu",
  "Broccoli_Costco": "Broccoli",
  "Cabbage_Costco": "Cabbage",
  "Cauliflower_Costco": "Cauliflower",
  "Lettuce_Costco": "Lettuce",
  "Spinach_Costco": "Spinach",
  "Celery_Costco": "Celery",
  "Green-Bell-Pepper_Costco": "Green Bell Pepper",
  "Red-Bell-Pepper_Costco": "Red Bell Pepper",
  "Jalapeno_Costco": "Jalapeno",
  "Seranno_Costco": "Seranno Pepper",
  "Chicken-Leg_Costco": "Chicken Leg",
  "Chicken-Thigh_Costco": "Chicken Thigh",
  "Chicken-Breast_Costco": "Chicken Breast",
  "Lamb-Leg_Costco": "Lamb Leg",
  "Cut-Goat_Costco": "Goat",
  "Tilapia-Fish-Fillet_Costco": "Tilapia Fish",
  "Peas-and-Carrots_Costco": "Peas and Carrots",
  "Frozen-Peas_Costco": "Peas",
  "Fresh-Okra_Costco": "Okra",
  "Mixed-Vegetables_Costco": "Mixed Vegetables",
  "Sriracha-Hot-Sauce_Costco": "Sriracha Hot Sauce",
  "Lemon-Juice_Costco": "Lemon Juice",
  "Salt_Costco": "Salt",
  "Sugar_Costco": "Sugar",
  "All-purpose-Flour_Costco": "All Purpose Flour",
  "Tomato-Sauce_Costco": "Tomato Sauce",
  "Tomato-puree_Costco": "Tomato Puree",
  "Soybean-Oil_Costco": "Soybean Oil",
  "Fry-Oil_Costco": "Fry Oil",
  "Yellow-Onion_Restaurant-Depot": "Yellow Onion",
  "Peeled-Garlic_Restaurant-Depot": "Peeled Garlic",
  "Cilantro_Restaurant-Depot": "Cilantro",
  "Red-Onion_Restaurant-Depot": "Red Onion",
  "Ginger_Restaurant-Depot": "Ginger",
  "Zucchini_Restaurant-Depot": "Zucchini",
  "Potato_Restaurant-Depot": "Potato",
  "Tomato_Restaurant-Depot": "Tomato",
  "Carrot_Restaurant-Depot": "Carrot",
  "Lemon_Restaurant-Depot": "Lemon",
  "Broccoli_Restaurant-Depot": "Broccoli",
  "Cabbage_Restaurant-Depot": "Cabbage",
  "Lettuce_Restaurant-Depot": "Lettuce",
  "Spinach_Restaurant-Depot": "Spinach",
  "Celery_Restaurant-Depot": "Celery",
  "Jalapeno_Restaurant-Depot": "Jalapeno",
  "Seranno_Restaurant-Depot": "Seranno",
  "Chicken-Leg_Restaurant-Depot": "Chicken Leg",
  "Chicken-Thigh_Restaurant-Depot": "Chicken Thigh",
  "Chicken-Breast_Restaurant-Depot": "Chicken Breast",
  "Lamb-Leg_Restaurant-Depot": "Lamb Leg",
  "Cut-Goat_Restaurant-Depot": "Cut Goat",
  "Tilapia-Fish-Fillet_Restaurant-Depot": "Tilapia Fish",
  "Peas-and-Carrots_Restaurant-Depot": "Peas and Carrots",
  "Frozen-Peas_Restaurant-Depot": "Peas",
  "Fresh-Okra_Restaurant-Depot": "Okra",
  "Mixed-Vegetables_Restaurant-Depot": "Mixed Vegetables",
  "Sriracha-Hot-Sauce_Restaurant-Depot": "Sriracha Hot Sauce",
  "Sambai-Oelek-Chili-Paste_Restaurant-Depot": "Sambai Oelek Chili Paste",
  "Lemon-Juice_Restaurant-Depot": "Lemon Juice",
  "Salt_Restaurant-Depot": "Salt",
  "Sugar_Restaurant-Depot": "Sugar",
  "All-purpose-Flour_Restaurant-Depot": "All Purpose Flour",
  "Tomato-Sauce_Restaurant-Depot": "Tomato Sauce",
  "Tomato-puree_Restaurant-Depot": "Tomato Puree",
  "Soybean-Oil_Restaurant-Depot": "Soybean Oil",
  "Fry-Oil_Restaurant-Depot": "Fry Oil",
  "Whole-Peeled-Tomato_Restaurant-Depot": "Whole Peeled Tomato",
  "Yellow-onion_SJ-Distributor": "Yellow Onion",
  "peeled-garlic_SJ-Distributor": "Peeled Garlic",
  "cilantro_SJ-Distributor": "Cilantro",
  "Red-onion_SJ-Distributor": "Red Onion",
  "Zucchini_SJ-Distributor": "Zucchini",
  "potato_SJ-Distributor": "Potato",
  "Roma-Tomato_SJ-Distributor": "Roma Tomato",
  "Tomato_SJ-Distributor": "Tomato",
  "American-eggplant_SJ-Distributor": "Eggplant",
  "carrot_SJ-Distributor": "Carrot",
  "orange_SJ-Distributor": "Orange",
  "Thai-Chili-Green_SJ-Distributor": "Green Chili",
  "Firm-tofu_SJ-Distributor": "Firm Tofu",
  "broccoli_SJ-Distributor": "Broccoli",
  "cabbage_SJ-Distributor": "Cabbage",
  "cauliflower_SJ-Distributor": "Cauliflower",
  "lettuce_SJ-Distributor": "Lettuce",
  "spinach_SJ-Distributor": "Spinach",
  "celery_SJ-Distributor": "Celery",
  "mint_SJ-Distributor": "Mint",
  "Green-bell-pepper_SJ-Distributor": "Green Bell Pepper",
  "Red-bell-pepper_SJ-Distributor": "Red Bell Pepper",
  "Jalapeno_SJ-Distributor": "Jalapeno",
  "Serrrano_SJ-Distributor": "Seranno Pepper",
  "Fresh-Halal-Chicken-Leg-Quarter_SJ-Distributor": "Chicken Leg",
  "Fresh-Halal-Chicken-Thigh_SJ-Distributor": "Chicken Thigh",
  "Fresh-Halal-Chicken-Breast_SJ-Distributor": "Chicken Breast",
  "Frozen-Halal-Bone/less-Lamb-Leg_SJ-Distributor": "Lamb Leg",
  "Frozen-Halal-Cut-goat-<1-2>_SJ-Distributor": "Cut Goat",
  "Swai-fish-fillet-8/10_SJ-Distributor": "Swai Fish",
  "Swai-fish-fillet-12/14_SJ-Distributor": "Swai Fish",
  "Tilapia-fillet-5/7_SJ-Distributor": "Tilapia Fish",
  "Tilapia-fillet-7/9_SJ-Distributor": "Tilapia Fish",
  "Peas&Carrot_SJ-Distributor": "Peas and Carrots",
  "Frozen-cut-okra_SJ-Distributor": "Okra",
  "Frozen-chopped-spinach_SJ-Distributor": "Frozen Spinach",
  "Sirracha-Hot-Chili-Sauce_SJ-Distributor": "Sriracha Hot Sauce",
  "Lemon-Juice_SJ-Distributor": "Lemon Juice",
  "Salt_SJ-Distributor": "Salt",
  "Sugar_SJ-Distributor": "Sugar",
  "All-purpose-Flour_SJ-Distributor": "All Purpose Flour",
  "Coconut-milk_SJ-Distributor": "Coconut Milk",
  "Tomato-Sauce_SJ-Distributor": "Tomato Sauce",
  "Tomato-Puree_SJ-Distributor": "Tomato Puree",
  "Whole-Peeled-tomato_SJ-Distributor": "Whole Peeled Tomato",
  "Soybean-oil_SJ-Distributor": "Soybean Oil",
  "Fry-oil_SJ-Distributor": "Fry Oil",
  "Peeled-Garlic_Sysco": "Peeled Garlic",
  "Cilantro_Sysco": "Cilantro",
  "Red-Onion_Sysco": "Red Onion",
  "Ginger_Sysco": "Ginger",
  "Zucchini_Sysco": "Zucchini",
  "Potato_Sysco": "Potato",
  "Roma-Tomato_Sysco": "Roma Tomato",
  "Tomato_Sysco": "Tomato",
  "American-Eggplant_Sysco": "Eggplant",
  "Carrot_Sysco": "Carrot",
  "Orange_Sysco": "Orange",
  "Lemon_Sysco": "Lemon",
  "Green-Chili-Peppers_Sysco": "Green Chili",
  "Firm-Tofu_Sysco": "Firm Tofu",
  "Broccoli_Sysco": "Broccoli",
  "Cabbage_Sysco": "Cabbage",
  "Cauliflower_Sysco": "Cauliflower",
  "Lettuce_Sysco": "Lettuce",
  "Spinach_Sysco": "Spinach",
  "Celery_Sysco": "Celery",
  "Mint_Sysco": "Mint",
  "Green-Bell-Pepper_Sysco": "Green Bell Pepper",
  "Red-Bell-Pepper_Sysco": "Red Bell Pepper",
  "Jalapeno_Sysco": "Jalapeno",
  "Seranno_Sysco": "Seranno Pepper",
  "Chicken-Leg_Sysco": "Chicken Leg",
  "Chicken-Thigh_Sysco": "Chicken Thigh",
  "Chicken-Breast_Sysco": "Chicken Breast",
  "Lamb-Leg_Sysco": "Lamb Leg",
  "Cut-Goat_Sysco": "Cut Goat",
  "Swai-Fish-Fillets_Sysco": "Swai Fish",
  "Tilapia-Fish-Fillet_Sysco": "Tilapia Fish",
  "Peas-and-Carrots_Sysco": "Peas and Carrots",
  "Frozen-Peas_Sysco": "Frozen Peas",
  "Mixed-Vegetables_Sysco": "Mixed Vegetables",
  "Sriracha-Hot-Sauce_Sysco": "Sriracha Hot Sauce",
  "Sambai-Oelek-Chili-Paste_Sysco": "Sambai Oelek Chili Paste",
  "Lemon-Juice_Sysco": "Lemon Juice",
  "Salt_Sysco": "Salt",
  "Sugar_Sysco": "Sugar",
  "All-purpose-Flour_Sysco": "All Purpose Flour",
  "Tomato-Sauce_Sysco": "Tomato Sauce",
  "Tomato-puree_Sysco": "Tomato Puree",
  "Soybean-Oil_Sysco": "Soybean Oil",
  "Fry-Oil_Sysco": "Fry Oil",
  "Whole-Peeled-Tomato_Sysco": "Whole Peeled Tomato"
}



def enrich_csv_columns():
    file_path = 'agg.csv'  # Path to your input CSV file
    output_path = 'aggregateComplete.csv'  # Path to save the updated CSV file

    try:
        # Read CSV content from the local file
        print("Starting to enrich CSV...")
        with open(file_path, 'r', encoding='utf-8') as infile:
            csv_reader = csv.reader(infile)
            headers = next(csv_reader)
            enriched_rows = [headers]

            for row in csv_reader:
                product_id = (row[1].replace(" ", "-") + "_" + row[5].replace(" ", "-"))  # Assuming product ID is in the 7th column (index 6)
                product_specification = productSpecifications.get(product_id, "")  # Get the product specification from the dictionary
                row[8] = product_specification                
                print(product_specification)
                enriched_rows.append(row)

        # Write the enriched rows to a new CSV file
        with open(output_path, 'w', newline='', encoding='utf-8') as outfile:
            csv_writer = csv.writer(outfile)
            csv_writer.writerows(enriched_rows)

        print(f"Enriched CSV saved to {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

enrich_csv_columns()