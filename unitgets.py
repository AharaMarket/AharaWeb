import csv
import re

def extract_numbers(text):
    return re.findall(r'\d+\.?\d*', text)

def create_specification_dict(csv_file):
    spec_dict = {}
    dollar_per_lb_dict = {}

    unit_conversion = {}
    
    # Open the CSV file
    with open(csv_file, mode='r', newline='', encoding='utf-8') as file:
        csv_reader = csv.reader(file, delimiter=';')

        next(csv_reader)
        next(csv_reader)
        
        # Loop through each row in the CSV file
        for row in csv_reader:
            # Extract the product specification and unit from the row
            product_specification = row[8]
            unit = row[3]

            cost = row[2]

            unit_numbers =  float(extract_numbers(unit)[0])
            if len(extract_numbers(unit)) > 1:
                unit_numbers += .001 * float(extract_numbers(unit)[1])

            cost_numbers =  float(extract_numbers(cost)[0]) 
            if len(extract_numbers(cost)) > 1:
                cost_numbers += .001 * float(extract_numbers(cost)[1])

            unique_unit = re.findall(r'\b(?!\w*lb)\b[a-zA-Z]+\b', unit)
            if unique_unit: 
                if product_specification in unit_conversion:
                    unit_conversion[product_specification].append(unit)
                else:
                    unit_conversion[product_specification] = [unit]


                if product_specification in spec_dict:
                    spec_dict[product_specification].append(unit_conversion[product_specification])
                else:
                    spec_dict[product_specification] = [unit_conversion[product_specification]]

                if product_specification in dollar_per_lb_dict:
                    dollar_per_lb_dict[product_specification].append(cost_numbers/unit_numbers)
                else:
                    dollar_per_lb_dict[product_specification] = [cost_numbers/unit_numbers]
             
            # Add the specification and unit to the dictionary
            if product_specification in spec_dict:
                spec_dict[product_specification].append(unit)
            else:
                spec_dict[product_specification] = [unit]

            if product_specification in dollar_per_lb_dict:
                dollar_per_lb_dict[product_specification].append(cost_numbers/unit_numbers)
            else:
                dollar_per_lb_dict[product_specification] = [cost_numbers/unit_numbers]
            
            # print(unit_conversion)

            
    
    return unit_conversion

# Example usage
csv_file_path = 'aggregateComplete.csv'  # Replace with the path to your CSV file
# spec_dict = create_specification_dict(csv_file_path)

unit_convo_dict = create_specification_dict(csv_file_path)

# Print the result
# print(spec_dict)
print(unit_convo_dict)
