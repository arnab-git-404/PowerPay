import json
from typing import Dict, Union, Any


class BranchHandler:
    def __init__(self, branch_file: str = "data/branch.json"):
        self.branch_file = branch_file

    def branch_data(self, branch_code: str) -> Union[Dict[str, Any], bool]:
        try:
            with open(self.branch_file, "r") as file:
                branch = json.load(file)
            if branch_code in branch:
                return branch[branch_code]
            return False
        except FileNotFoundError:
            return False
        except json.JSONDecodeError:
            return False
