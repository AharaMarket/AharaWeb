import csv

def create_specification_dict(csv_file):
    spec_dict = {}
    
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
            
            # Add the specification and unit to the dictionary
            if product_specification in spec_dict:
                spec_dict[product_specification].append(unit)
            else:
                spec_dict[product_specification] = [unit]
    
    return spec_dict

# Example usage
csv_file_path = 'aggregate.csv'  # Replace with the path to your CSV file
spec_dict = create_specification_dict(csv_file_path)

# Print the result
print(spec_dict)
