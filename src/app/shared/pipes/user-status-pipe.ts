import {Pipe, PipeTransform} from "@angular/core";
import {UserStatus} from "../../users/_models/user";

@Pipe ({
  name: 'userStatusPipe'
})
export class UserStatusPipe implements PipeTransform {
  transform(val: any) : string {
    return UserStatusPretty[val];
  }
}

export const UserStatusPretty = {
  [UserStatus.VERIFICATION_PENDING]: "Verification pending",
  [UserStatus.ACTIVE]: "Active"
};
