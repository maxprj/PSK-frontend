import { Pipe, PipeTransform } from '@angular/core';
import { UserRoleEnumToTextMapping } from './UserRoleEnumToTextMapping';

@Pipe ({
    name: 'userRolePipe'
})
export class UserRolePipe implements PipeTransform {
    public UserRoleEnumToTextMapping = UserRoleEnumToTextMapping;
    
    transform(val: any) : string {
        return UserRoleEnumToTextMapping[val];
    }
}