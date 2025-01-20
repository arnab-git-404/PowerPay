import json
from typing import Dict, Union, Any
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "HelloFromSayan"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class BranchHandler:
    def __init__(self, branch_file: str = "data/branch.json"):
        self.branch_file = branch_file

    def branch_data(self, branch_code: str) -> Union[Dict[str, Any], bool]:
        branch = self.load_branch()
        if branch_code in branch:
            return branch[branch_code]
        return False

    def get_branche_codes(self) -> Dict[str, Dict[str, Any]]:
        branch = self.load_branch()
        return list(branch.keys())

    # Utility functions
    def load_branch(self) -> Dict[str, Any]:
        try:
            with open(self.branch_file, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            return {}
        except json.JSONDecodeError:
            return {}

    def dump_branch(self, branch: Dict[str, Any]) -> None:
        with open(self.branch_file, "w") as file:
            json.dump(branch, file, indent=4)

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
