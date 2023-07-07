import sys
import json
from python_lnk import parse

def parse_lnk(lnk_file):
    # parse lnk file
    lnk = parse(lnk_file)

    # get target path
    target_path = lnk.base_path + lnk.relative_path

    # return target path
    return target_path

def main():
    # Get lnk file path from command line argument
    lnk_file = sys.argv[1]

    # Parse lnk file
    target_path = parse_lnk(lnk_file)

    # Convert the target path to json
    target_path_json = json.dumps(target_path)

    # Print the json to stdout
    print(target_path_json)

# Call main function
if __name__ == "__main__":
    main()
