import pandas as pd

def update_csv_column(file_path, output_path):
    # Read the CSV file
    df = pd.read_csv(file_path)

    # Iterate through the DataFrame starting from the second row (index 1)
    for index in range(0, len(df)):
        # Assuming the third column is at index 2
        original_value = df.iloc[index, 2]

        # If the value is a list-like string, convert it
        if isinstance(original_value, str) and original_value.startswith("[") and original_value.endswith("]"):
            # Strip brackets and whitespace, then turn it into a formatted string
            value_inside = original_value.strip("[]").strip().strip('"').strip("'")
            new_value = "${}".format(value_inside)
            # Update the DataFrame
            df.iloc[index, 2] = new_value

    # Save the updated DataFrame to a new CSV file
    df.to_csv(output_path, index=False)

# Example usage
file_path = 'aggregate (10) (1).csv'      # Path to your input CSV file
output_path = 'agg.csv'    # Path to save the updated CSV file
update_csv_column(file_path, output_path)
