import {Pipe, PipeTransform} from '@angular/core';
import {UserRole} from "../user";

@Pipe ({
    name: 'userRolePipe'
})
export class UserRolePipe implements PipeTransform {

    transform(val: any) : string {
        return UserRoleEnumToTextMapping[val];
    }
}
export const UserRoleEnumToTextMapping = {
  [UserRole.ROLE_ADMIN]: "Administrator",
  [UserRole.ROLE_ORGANIZER]: "Trip Organiser",
  [UserRole.ROLE_USER]: "User"
}
